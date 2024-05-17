"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {BarcodeScanner} from "@/components/barcodescanner";

const NewRecord = () => {
  
  const [cameraOpen, setCameraOpen] = useState(false);
  // create a on page load function
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <div className="space-y-4 w-full max-w-sm bg-gradient-to-b from-red-500 to-white">
        <div className="space-y-2 bg-gradient-to-b from-red-500 to-white">
          <div className="space-y-2 bg-gradient-to-b from-red-500 to-white">
            <Card>
              <CardHeader className="p-6 bg-gradient-to-b from-red-500 to-white">
                <CardTitle className="text-3xl font-bold">
                  Add new product
                </CardTitle>
                <CardDescription>
                  Scan Bar code of your Food to add new Record
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-6">
                  <Button className="w-full" onClick={() => {
                    console.log("Open Camera");
                    console.log(cameraOpen)
                    setCameraOpen(!cameraOpen)}
                    }></Button>
              </CardFooter>
              <BarcodeScanner active={false}/>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewRecord;