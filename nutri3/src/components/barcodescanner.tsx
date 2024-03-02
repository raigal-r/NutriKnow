import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import axios from "axios";
import Link from "next/link";
import {ChatSection} from "../components/llama/chat-section";
import {FoodEntry, User} from  '../types/dbSchema';
import {POST} from '../app/api/newScore/route';
import  { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";
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

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ active }) => {
  const [result, setResult] = useState("");
  const [nutriments, setNutriments] = useState("");

  const [score, setScore] = useState("");
  const [healthExplanation, setHealthExplanation] = useState("");

  const [isActive, setIsActive] = useState<boolean>(active);
  const [isData, setIsData] = useState<boolean>(false);

  //Attestation
  const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
  const schemaUID = "0xc7d77c7d0df3b45b2167003ad301e9ad6933429ec0e343a26a983a9684e0f53e";
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
    console.log('user',JSON.stringify(user))
    const response = await fetch('../api/newScore/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nutriments, user}),
    });
    console.log('response', response)
    const parsed = await response.json();
    console.log(parsed);
    const grade = parsed.grade;
    setScore(grade);
    const healthExplanation = parsed.healthExplanation;
    setHealthExplanation(healthExplanation);
    console.log("rawResponse", JSON.stringify(parsed));

    
    attestWithEAS(signer, eas, schemaUID, grade, healthExplanation );
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
    const user =  {
      id: '11',
      ageBorn: '1990',
      height: '175',
      weight: '80',
      nutriSkils: `Explain like I'm five`
    }
    const parsed = await createFoodEntry(res?.data.product.nutriments, user);
    console.log('parsed:',JSON.stringify(parsed))

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
          <button 
            className="my-4 middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={toggleActive}>
              Open Camera          
            </button>
        {/* <button onClick={resetScan}>Reset Scan</button> */}
      {/* <p>
        <span>Last result:</span>
          <span>{result}</span>     
      </p> */}
      </div>
        
      )}
      {!isActive && !isData &&(
      <>
        <button 
        className="my-4 middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        onClick={toggleActive}>
          Open Camera          
        </button>
        {/* <button onClick={resetScan}>Reset Scan</button> */}
        {/* <p>
          <span>Last result:</span>
          <span>{result}</span>     
        </p> */}
      </>
      )}
      {!isActive && isData && (
        <>
          <p>
            Product characteristics
          </p>
          <p>
            Score: {score}

          </p>
          <p>
          Description: {healthExplanation}

          </p>
          <ChatSection result = {nutriments}/>
          <button 
            className="my-4 middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={toggleActive}>
              Open Camera          
            </button>
          {/* <button onClick={resetScan}>Reset Scan</button> */}
          {/* <p>
            <span>Last result:</span>
            <span>{result}</span>     
          </p> */}
        </>    
      )}
    </div>
  );
};
