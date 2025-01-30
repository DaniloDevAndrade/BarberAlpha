'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense, useEffect, useState} from "react"
import { Users as UsersIcon } from "lucide-react"
import { calculateNewUserMonth} from "../api/caculate"
import UserTable from "./table"
import { getUsersBusiness } from "../api/getUsersBusiness"
import Loading from "@/app/components/Loading"
import { Users } from "@prisma/client"

type DashboardClientProps = {
  emailBusiness: string;
  name?: string
}

export default function CardTable({emailBusiness}: DashboardClientProps) {
    const [users, setUsers] = useState<Users[]>([])
    const [isLoading, setIsLoading] = useState(true);

    const totalUsers = users.length
    const newUserAgoMonth = calculateNewUserMonth(users)

    useEffect(() =>{
      async function fetchUsers() {
        const res = await getUsersBusiness(emailBusiness)
        setUsers(res.users || [])
        setIsLoading(false)
      }
      fetchUsers()
    }, [emailBusiness])
    
  if (isLoading) {
    return (<Loading />);
  }

  return (
    <>
    <div className="flex ml-2 flex-col gap-4 md:flex-row">
        <Card className="">
                <CardHeader>
                    <div className="flex flex-row justify-between space-x-2">
                      <CardTitle className="text-lg">Total de Clientes</CardTitle>
                      <UsersIcon />
                    </div>
                </CardHeader>
                <CardContent className="justify-self-center">
                    <p className="text-2xl font-bold">{totalUsers}</p>
                </CardContent>
                </Card>
                <Card className="">
                <CardHeader>
                  <div className="flex flex-row justify-between space-x-2">
                    <CardTitle className="text-lg">Novos Clientes <CardDescription>(Ultimos 30 Dias)</CardDescription></CardTitle>
                    <UsersIcon />
                  </div>
                </CardHeader>
                <CardContent className="justify-self-center">
                    <p className="text-2xl font-bold">{newUserAgoMonth}</p>
                </CardContent>
              </Card>
    </div>
    <div>
    <Card className="ml-2">
        <CardHeader>
          <CardTitle>Tabela de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <UserTable initialUsers={users} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
    </>
  )
}

