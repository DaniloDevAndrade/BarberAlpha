'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense, useCallback, useEffect, useState} from "react"
import { Cog, User, UserRoundCheck, UserRoundPlus, Vibrate } from "lucide-react"
import UserTable from "./Table"
import ButtonRow from "./Buttons/ButtonRow"
import { rowTimeJoin } from "../api/RowTime"
import ButtonNextUser from "./Buttons/ButtonNextUser"
import { DialogAddUser } from "./Buttons/ButtonAddUser/ButtonAddUser"
import { getUsersRow } from "../api/requestUsers"
import ButtonReflash from "./Buttons/ButtonReflashUsers"
import { Users } from "@prisma/client"

type DashboardClientProps = {
  emailBusiness: string;
  name?: string
}

export default function CardTable({emailBusiness}: DashboardClientProps) {

  const [users, setUsers] = useState<Users[]>([]); // Estado para armazenar os usuários
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async () => {
    const response = await getUsersRow(emailBusiness);
    setUsers(response.users ?? []);
    setTotalUsers((response.users ?? []).length);
  }, [emailBusiness])

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  return (
    <>
    <div className="flex ml-4 flex-col gap-4 xl:grid xl:grid-cols-6">
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
                    <CardTitle className="text-cards text-xl xl:text-sm 2xl:text-lg">Chamar Proximo</CardTitle>
                    <Vibrate />
                </div>
                </CardHeader>
                <CardContent className="justify-self-center">
                    <div className="flex items-center">
                    <ButtonNextUser emailBusiness={emailBusiness}></ButtonNextUser>
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
                        </>
                    ) : (
                        <h1>Não atendendo.</h1>
                    )}
                    </div>
                </CardContent>
        </Card>
    </div>
    <div className="ml-4 mt-4">
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
    </>
  )
}

