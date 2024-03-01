import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <div className="space-y-4 w-full max-w-sm">
        <div className="space-y-2">
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to the community</CardTitle>
                <CardDescription>
                  You can now track your food and compete with the community.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-8">
                <Image
                  alt="Profile picture"
                  className="rounded-full"
                  height="120"
                  src="./placeholder.svg"
                  style={{
                    aspectRatio: "120/120",
                    objectFit: "cover",
                  }}
                  width="120"
                />
              </CardContent>
              <CardFooter>
                <Link className="flex justify-center" href="/overview">
                  <Button className="w-full" variant="outline">
                    Okay LFG
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
