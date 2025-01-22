import { Suspense } from "react";
import { QueueRegistrationForm } from "./components/FormJoin";
import StarryBackground from "../components/StarryBackgroud";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Row() {
  return (
    <>
    
    <div className="min-h-screen flex items-center justify-center">
      <StarryBackground />
      <Header></Header>
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
        <Card>
        <CardHeader className="flex flex-col items-center mb-7">
          <CardTitle className="text-lg sm:text-2xl">Entrar em uma Fila</CardTitle>
          <CardDescription className="text-base">Entre em sua conta!</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <QueueRegistrationForm />
          </Suspense>
        </CardContent>
        </Card>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

