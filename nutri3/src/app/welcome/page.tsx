import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <div className="space-y-4 w-full max-w-sm">
        <div className="space-y-2">
          <div className="space-y-2">
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="text-3xl font-bold">
                  Join the Community
                </CardTitle>
                <CardDescription>
                  Click the Button below to join the community. You will recieve
                  a gift as confirmation.
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-6">
                <Link href="/welcome/success/1">
                  <Button className="w-full">Join Community</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
