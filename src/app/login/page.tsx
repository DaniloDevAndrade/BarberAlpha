'use server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "./login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StarryBackground from "../components/StarryBackgroud";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default async function Auth() {
    const session = await auth()
    if(session){
      return redirect('/dashboard')
    }
    return (
      <>
      <div className="min-h-screen text-white">
        <StarryBackground />
        <Header />
      <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[1000px] h-auto">
        <CardHeader className="flex flex-col items-center mb-7">
          <CardTitle className="text-3xl">Entrar</CardTitle>
          <CardDescription className="text-lg">Entre em sua conta!</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
        </CardContent>
      </Card>
    </div>
    <Footer></Footer>
    </div>
    </>
    );
  }
  