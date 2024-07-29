"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { useRouter } from "next/navigation";



const AddQuoteModal = () => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="lg:w-[700px] bg-transparent border-0 text-transparent ">
        <Card className="bg-light-gray-800 dark:bg-dark-gray-800 border border-light-gray-700 dark:border-dark-gray-700 lg:w-[550px]">
          <CardHeader className="text-2xl">
            <CardTitle className="text-4xl">Add A Quote</CardTitle>
            <CardDescription className="text-xl">
              Add a quote to our list of quotes with one click.
            </CardDescription>
          </CardHeader>
          <CardContent>
           here i want add component wich will go to signinroute 
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuoteModal;