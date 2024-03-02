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

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ active }) => {
  const [result, setResult] = useState("");
  const [nutriments, setNutriments] = useState("");

  const [isActive, setIsActive] = useState<boolean>(active);
  const [isData, setIsData] = useState<boolean>(false);

  //Attestation
  const easContractAddress = "0x4200000000000000000000000000000000000021";
  const schemaUID = "0xc9490184bff7a3a2af1605bf744ce7e0f9d56c402637b32bba91f44c80251ffd";
  const eas = new EAS(easContractAddress);

  // Signer must be an ethers-like signer.
  const signer = useSigner();
  const account = useAccount();
  const usrAddress = account?.address;
  await eas.connect(signer);


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
    const parsed: FoodEntry = await response.json();


    console.log("rawResponse", JSON.stringify(parsed));
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
          <button onClick={toggleActive}>Toggle Window</button>
        <button onClick={resetScan}>Reset Scan</button>
      <p>
        <span>Last result:</span>
          <span>{result}</span>     
      </p>
        </div>
        
      )}
      {!isActive && !isData &&(
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
          <ChatSection result = {nutriments}/>
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
