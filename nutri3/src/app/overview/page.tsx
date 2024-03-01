
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {  Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Overview() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
              <h1 className="text-2xl font-semibold">Recent Actions</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your most recent actions are displayed below. Click on an action
                to view more details.
              </p>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Link href="/overview/new">
              <Button variant="outline">Add new Food Record</Button>
              </Link>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>Food Name</TableHead>
                      <TableHead>Score reached</TableHead>
                      <TableHead>Amount (gram)</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">1</TableCell>
                      <TableCell className="font-semibold">
                        Pizza
                      </TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell>350g</TableCell>
                      <TableCell>2024-02-25</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">1</TableCell>
                      <TableCell className="font-semibold">
                        Burger
                      </TableCell>
                      <TableCell>69%</TableCell>
                      <TableCell>420g</TableCell>
                      <TableCell>2024-02-24</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">1</TableCell>
                      <TableCell className="font-semibold">
                        Brot
                      </TableCell>
                      <TableCell>89%</TableCell>
                      <TableCell>400g</TableCell>
                      <TableCell>2024-02-23</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
