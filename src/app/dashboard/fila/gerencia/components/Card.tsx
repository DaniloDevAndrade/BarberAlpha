'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense, useCallback, useEffect, useState} from "react"
import { Cog, User, UserRoundCheck, UserRoundPlus, Vibrate } from "lucide-react"
import UserTable from "./Table"
import ButtonRow from "./Buttons/ButtonRow"
import { rowTimeJoin } from "../api/RowTime"
import { DialogAddUser } from "./Buttons/ButtonAddUser/ButtonAddUser"
import { getUsersRow } from "../api/requestUsers"
import ButtonReflash from "./Buttons/ButtonReflashUsers"
import { Users } from "@prisma/client"
import { DialogFinallyUser } from "./Buttons/ButtonFinally/ButtonFinally"
import ButtonServiceStarted from "./Buttons/ButtonServiceStarted"
import Loading from "@/app/components/Loading"

type DashboardClientProps = {
  emailBusiness: string;
  name?: string
}

export default function CardTable({emailBusiness}: DashboardClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Users[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async () => {
    const response = await getUsersRow(emailBusiness);
    setUsers(response.users ?? []);
    setTotalUsers((response.users ?? []).length);
    setIsLoading(false);
  }, [emailBusiness])

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  if (isLoading) {
    return (<Loading />);
  }

  return (
    <div className="w-screen xl:w-auto">
    <div className="flex m-3 flex-col gap-4 xl:grid xl:grid-cols-6">
        <Card>
                <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle className="text-cards text-xl xl:text-sm 2xl:text-lg">Tamanho da Fila</CardTitle><User />
                </div>
                </CardHeader>
                <CardContent className="justify-self-center">
                    <p className="text-2xl font-bold">{totalUsers}</p>
                </CardContent>
        </Card>
        <Card className="">
                <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle className="text-cards text-xl xl:text-sm 2xl:text-lg">Configurações</CardTitle>
                    <Cog />
                </div>
                </CardHeader>
                <CardContent className="justify-self-center">
                    <div className="flex items-center">
                        <ButtonRow emailBusiness={emailBusiness}></ButtonRow>
                    </div>
                </CardContent>
        </Card>
        <Card className="">
                <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle className="text-cards text-xl xl:text-sm 2xl:text-lg">Adicionar Cliente</CardTitle>
                    <UserRoundPlus />
                </div>
                </CardHeader>
                <CardContent className="justify-self-center">
                    <div className="flex items-center">
                    <DialogAddUser emailBusiness={emailBusiness}/>
                    </div>
                </CardContent>
        </Card>
        <Card className="">
                <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle className="text-cards text-xl xl:text-sm 2xl:text-lg">Iniciar Atendimento</CardTitle>
                    <Vibrate />
                </div>
                </CardHeader>
                <CardContent className="justify-self-center">
                    <div className="flex items-center">
                    <ButtonServiceStarted onRefresh={fetchUsers} emailBusiness={emailBusiness}/>
                    </div>
                </CardContent>
        </Card>
        <Card className="lg:col-span-2">
                <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle className="text-xl">Cliente em Atendimento</CardTitle>
                    <UserRoundCheck />
                </div>
                </CardHeader>
                <CardContent className="">
                    <div className="flex flex-col">
                      {users.length > 0 && users[0].rowStatus === 'InServiced' ? (
                        <>
                          <h1>Nome: {users[0].name}</h1>
                          <h1>Cliente desde: {new Date(users[0].createdAt).toLocaleDateString()}</h1>
                          <h1>Tempo de fila: {rowTimeJoin(users[0])}</h1>
                          <DialogFinallyUser emailBusiness={emailBusiness}/>
                        </>
                    ) : (
                        <h1>Não atendendo.</h1>
                    )}
                    </div>
                </CardContent>
        </Card>
    </div>
    <div className="m-3">
    <Card>
        <CardHeader>
          <CardTitle className="">Usuarios na fila 
          <ButtonReflash onRefresh={fetchUsers}/></CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <UserTable onRefresh={fetchUsers} emailBusiness={emailBusiness} initialUsers={users} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

