import { NextResponse } from "next/server";
import { createChatEngine } from "../chat/engine";
// Assumed environme
import {
    ChatMessage,
    Document,
    MongoDBAtlasVectorSearch,
    VectorStoreIndex,
    storageContextFromDefaults,
} from "llamaindex";
import { OpenAI, serviceContextFromDefaults } from "llamaindex";
import { Db, MongoClient } from "mongodb";
// Assuming we've defined or imported types for the Hackathon Application
import type { User, FoodEntry } from  '../../../types/dbSchema'

const url = "mongodb+srv://At0x:r8MzJR2r4A1xlMOA@cluster1.upfglfg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
await client.connect();
// Database Name

async function llamaindex(payload: string, id: string) {
    const vectorStore = new MongoDBAtlasVectorSearch({
        mongodbClient: client,
        dbName: "aiUniverse",
        collectionName: "nutriIndex", // this is where your embeddings will be stored
        indexName: "nutri_index", // this is the name of the index you will need to create
    });

    // now create an index from all the Documents and store them in Atlas
    const storageContext = await storageContextFromDefaults({ vectorStore });

    const essay = payload;

    // Create Document object with essay
    const document = new Document({ text: essay, id_: id });
    console.log({ document });
    // Split text and create embeddings. Store them in a VectorStoreIndex
    const result = await VectorStoreIndex.fromDocuments([document], { storageContext });
    const embeddingResults = await result.getNodeEmbeddingResults([document]);
    console.log({ result, embeddingResults });
    const db = client.db("aiUniverse"); // Connect to the database
    const hackIndex = db.collection("nutriIndex");

    const embedding = await hackIndex.findOne({ "metadata.doc_id": id });

    console.log({ embeddingId: embedding?.id });
    console.log(`Successfully created embeddings in the MongoDB collection`);
    return { embeddingId: embedding?.id as string, result: embeddingResults };
}

async function runLlamaAndStore(
    db: Db,
    foodApp: any,
    enhancedProposal: FoodEntry,
    usedEmbeddingIds: string[],
    promptMessages: any,
    promptResponse: any,
) {
    const foodCode = foodApp.foodCode || foodApp.id;
    const { embeddingId } = await llamaindex(JSON.stringify(foodApp), foodCode); 
}

// Revised function suited for hackathon application data
async function generateFoodScore(foodApp: FoodEntry) {
    console.log("test from be")
    const messages: ChatMessage[] = [
        {
            role: "system",
            //content updated
            content: `You are an AI consultant specializing in nutritionism. Given a nutrients list, person's age, person's height and person's weight, give a grade from 1 to 5 about how healthy is the food product. Give me your response as an integer number and give me a health explanation about how healthy or unhealthy is the food product. Give me your response under 500 characters. Explained for someone who is not knowledge about the topic. Reply in JSON format using the FoodEntry type.`,
        },
        {
            role: "assistant",
            content: `
            type FoodEntry = {
                nutriments: string;
                user: User;
            };
            `,
        },
        {
            role: "user",
            content: `Help the user underestand if this data, adjust your answer depending on the user's skills level.
            nutriments: ${JSON.stringify(foodApp.nutriments)}
            userProfile: ${JSON.stringify(foodApp.user)}`,
        },
    ];

    const llm = new OpenAI({
        model: (process.env.MODEL as any) ?? "gpt-4-0125-preview",
        maxTokens: 512,
        additionalChatOptions: { response_format: { type: "json_object" } },
    });

    const serviceContext = serviceContextFromDefaults({
        llm,
        chunkSize: 512,
        chunkOverlap: 20,
    });

    const chatEngine = await createChatEngine(llm);
    if (!chatEngine) {
        throw new Error("datasource is required in the request body");
    }

    // Convert message content from Vercel/AI format to LlamaIndex/OpenAI format

    const response = await chatEngine.chat({
        message: "Evaluate the product nutrients and provide scores and remarks.",
        chatHistory: messages,
    });

    console.log({
        response,
        serviceContext,
        raw: response.response,
        sourceNodes: JSON.stringify(response.sourceNodes),
    });

    const usedEmbeddingIds = response.sourceNodes?.map(node => node.id_) || [];
    
    const parsedResponse = JSON.parse(response.response);

    const rawOutput: FoodEntry = JSON.parse(response.response);
    return { enhancedProposal: rawOutput, messages, response: parsedResponse, usedEmbeddingIds };
}

// Example usage for POST handler or another part of your application
export async function POST(request: Request) {
    try {
        console.log('request', request)
        const foodApp = await request.json(); // Assuming the request body is properly formatted
        console.log(foodApp);
        const { enhancedProposal, usedEmbeddingIds, messages, response } = await generateFoodScore(
            foodApp,
        );


        // Proceed with storing the enhanced proposal in MongoDB or returning it in the response
        //
        const db = client.db("aiUniverse"); // Connect to the database
        const nutriCodex = db.collection("nutriUniverse"); //
        // assumed input
        // run this function asynchronously, do not block for it to finish
        runLlamaAndStore(db, foodApp, enhancedProposal, usedEmbeddingIds,messages, response);
       
        await nutriCodex.updateOne(
            {
                _id: foodApp._id,
                address: foodApp.address,
                hack: foodApp.hack,
            },
            {
                $addToSet: {
                    eval: enhancedProposal,
                },
            },
            { upsert: true }, // this creates new document if none match the filter
        );

        // Implementation depends on application requirements.
        //
        return NextResponse.json(enhancedProposal, { status: 200 });
        // Implementation depends on application requirements.
        //
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message || "An error occurred processing the request" }, { status: 500 });
        // Handle error
        //
    }
}