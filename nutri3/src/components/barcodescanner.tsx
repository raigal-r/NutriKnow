import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import axios from "axios";

interface BarcodeScannerProps {
  active: boolean;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ active }) => {
  const [result, setResult] = useState("");
  const [isActive, setIsActive] = useState<boolean>(active);
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
    console.log(barcode);
    const res = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
    console.log(res)
    return res
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
        </div>
      )}
      <button onClick={toggleActive}>Toggle Window</button>
      <button onClick={resetScan}>Reset Scan</button>
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </div>
  );
};
