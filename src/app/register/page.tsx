'use server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterForm from "./register-form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import StarryBackground from "../components/StarryBackgroud";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default async function Auth() {
    const session = await auth()
    if(session){
      return redirect('/dashboard')
    }
    return (
      <div className="min-h-screen text-white">
        <StarryBackground />
        <Header />
      <div className="flex items-center justify-center mt-24">
      <Card className="w-[1500px] h-auto m-3">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-3xl">Comece aqui</CardTitle>
          <CardDescription className="text-base">Teste Gratis por 7 Dias!</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      </div>
      <div className="mt-5">
        <Footer></Footer>
      </div>
    </div>
    );
  }
  