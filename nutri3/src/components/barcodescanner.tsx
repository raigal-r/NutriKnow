'use client';
import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import axios from "axios";
import Link from "next/link";
import { ChatSection } from "../components/llama/chat-section";
import { FoodEntry, User } from '../types/dbSchema';
import { POST } from '../app/api/newScore/route';
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http } from 'viem';
import { useRegisterRootIp } from '@story-protocol/react';
import { stringToHex } from 'viem';


import {
    ChatMessage,
    Document,
    MongoDBAtlasVectorSearch,
    VectorStoreIndex,
    storageContextFromDefaults,
} from "llamaindex";

import { useSigner } from "../utils/wagmi-utils";
import { useAccount } from 'wagmi';

interface BarcodeScannerProps {
    active: boolean;
}

interface HealthGradeResponse {
    grade: number;
    healthExplanation: string;
}

async function RegisterIpAsset() {
    const {
        writeContractAsync,
        isPending: isPendingInWallet,
        data: txHash,
    } = useRegisterRootIp();

    // Update these
    const tokenId = BigInt(1); // Your NFT token ID as BigInt
    // const tokenId = BigInt(23); // Example
    const nftContract = '0xdAab4f7a97068fD165f8E63ff3E29A57b91409ef'; // Update if using your own NFT

    const policyId = BigInt(0); // Policy ID from RegisterPILPolicy.tsx, if want to attach policy in same transaction
    const ipName = 'IP Man'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com'; // External URL for your IP, if applicable



    await writeContractAsync({
        functionName: 'registerRootIp',
        args: [policyId, nftContract, tokenId],
    });



    const text =
        tokenId === undefined
            ? '2. Update the tokenId value in RegisterIpAsset.tsx'
            : '2. Register your NFT as an IP Asset. A successful transaction will result in a `ipId` value, emitted as an event, that represents your IPA ID.';

    return console.log(txHash);
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ active }) => {
    const [result, setResult] = useState("");
    const [nutriments, setNutriments] = useState("");

    const [isActive, setIsActive] = useState<boolean>(active);
    const [isData, setIsData] = useState<boolean>(false);

    //Attestation
    const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
    const schemaUID = "0xa6cbb5a90a981d62cbef421f5c43b1d553525eef41405a355594fd5728de9e1a";
    const eas = new EAS(easContractAddress);

    // Signer must be an ethers-like signer.
    const signer = useSigner();
    const account = useAccount();
    const usrAddress = account?.address;



    function attestWithEAS(signer: any, eas: any, schemaUID: string, score: string, healthExplanation: string) {
        console.log('attestWithEAS');
        (async () => {
            await eas.connect(signer);
            const schemaEncoder = new SchemaEncoder("string score,string healthExplanation");
            const encodedData = schemaEncoder.encodeData([
                { name: "score", value: score.toString(), type: "string" },
                { name: "healthExplanation", value: healthExplanation.toString(), type: "string" }
            ]);
            const tx = await eas.attest({
                schema: schemaUID,
                data: {
                    recipient: "0x0000000000000000000000000000000000000000",
                    expirationTime: 0,
                    revocable: true,
                    data: encodedData,
                },
            });
            console.log('tx', tx)
            const newAttestationUID = await tx.wait();
            console.log("New attestation UID:", newAttestationUID);
        })();
    }

    const toggleActive = () => setIsActive(!isActive);

    const { ref } = useZxing({
        paused: !isActive,
        onDecodeResult(result) {
            setResult(result.getText());
            toggleActive();
            getProductFromBarcode(result.getText());
        },
    });
    useEffect(() => {
        // Rerender the component whenever isActive changes value
    }, [isActive]);
    const resetScan = () => {
        setResult("");
    }

    async function createFoodEntry(nutriments: Object, user: Object) {
        // Mimic an asynchronous operation, for example, saving to a database
        console.log('createFood')
        console.log('nutriments', JSON.stringify(nutriments))
        console.log('user', JSON.stringify(user))
        const response = await fetch('../api/newScore/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nutriments, user }),
        });
        console.log('response', response)
        const parsed = await response.json();
        console.log(parsed);
        const grade = parsed.grade;
        const healthExplanation = parsed.healthExplanation;
        console.log("rawResponse", JSON.stringify(parsed));


        attestWithEAS(signer, eas, schemaUID, grade, healthExplanation);
        RegisterIpAsset();
        return parsed;
    }

    const getProductFromBarcode = async (barcode: string) => {

        try {
            console.log(barcode);
            const res = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
            setIsData(!!res);
            console.log(res)
            const nutriments = res?.data.product.nutriments
            setNutriments(nutriments)
            console.log("data:", res?.data.product.nutriments) //tabla nutricional
            const user = {
                id: '11',
                ageBorn: '1990',
                height: '175',
                weight: '80',
                nutriSkils: `Explain like I'm five`
            }
            const parsed = await createFoodEntry(res?.data.product.nutriments, user);
            console.log('parsed:', JSON.stringify(parsed))

            return res

        } catch (error) {
            console.error('Error fetching product information:', error);

            // In case of an error, set isData to false
            setIsData(false);

            return null; // or handle the error accordingly
        }

    }

    return (
        <div>
            {isActive && (
                <div
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginTop: "10px",
                    }}
                >
                    <>
                        <video ref={ref} />
                    </>
                    <button onClick={toggleActive}>Toggle Window</button>
                    <button onClick={resetScan}>Reset Scan</button>
                    <p>
                        <span>Last result:</span>
                        <span>{result}</span>
                    </p>
                </div>

            )}
            {!isActive && !isData && (
                <>
                    <button onClick={toggleActive}>Toggle Window</button>
                    <button onClick={resetScan}>Reset Scan</button>
                    <p>
                        <span>Last result:</span>
                        <span>{result}</span>
                    </p>
                </>
            )}
            {!isActive && isData && (
                <>
                    <ChatSection result={nutriments} />
                    <p>
                        Text
                    </p>
                    <button onClick={toggleActive}>Toggle Window</button>
                    <button onClick={resetScan}>Reset Scan</button>
                    <p>
                        <span>Last result:</span>
                        <span>{result}</span>
                    </p>
                </>
            )}
        </div>
    );
};
