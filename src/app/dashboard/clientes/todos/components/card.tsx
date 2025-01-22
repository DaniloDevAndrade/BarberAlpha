import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense} from "react"
import { Users } from "lucide-react"
import { calculateNewUserMonth} from "../api/caculate"
import UserTable from "./table"
import { getUsersBusiness } from "../api/getUsersBusiness"

type DashboardClientProps = {
  emailBusiness?: string;
  name?: string
}

export default async function CardTable({emailBusiness}: DashboardClientProps) {

    const response = await getUsersBusiness(emailBusiness as string)

    const users = response.users || []
    const totalUsers = users.length
    const newUserAgoMonth = calculateNewUserMonth(users)
  
  return (
    <>
    <div className="flex ml-2 flex-col gap-4 md:flex-row">
        <Card className="">
                <CardHeader>
                    <div className="flex flex-row justify-between space-x-2">
                      <CardTitle className="text-lg">Total de Clientes</CardTitle>
                      <Users />
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
                    <Users />
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

