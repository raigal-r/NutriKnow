import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import axios from "axios";
import Link from "next/link";
import ChatSection from "../components/llama/chat-section";

interface BarcodeScannerProps {
  active: boolean;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ active }) => {
  const [result, setResult] = useState("");
  const [nutriments, setNutriments] = useState("");

  const [isActive, setIsActive] = useState<boolean>(active);
  const [isData, setIsData] = useState<boolean>(false);

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

  const getProductFromBarcode = async (barcode: String) => {

    try {
    console.log(barcode);
    const res = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
    setIsData(!!res);
    console.log(res)
    const nutriments = res?.data.product.nutriments
    setNutriments(nutriments)
    console.log("data:", res?.data.product.nutriments) //tabla nutricional
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
      {!isActive && (
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
