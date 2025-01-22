'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import ButtonRemoveRow from './Buttons/ButtonRemoveRow'
import { RowPositionStatus, Users } from '@prisma/client'
import { rowTimeJoin } from '../api/RowTime'
import { paginateUsers } from '@/app/dashboard/clientes/todos/api/caculate'

interface UserTableProps {
  initialUsers: Users[],
  emailBusiness: string,
  onRefresh: () => void;
}

export default function UserTable({ onRefresh, initialUsers, emailBusiness }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(initialUsers.length / pageSize)

  const users = paginateUsers(initialUsers, currentPage, pageSize)

  const getStatusRow = (status: RowPositionStatus) =>{
    const RowTexts = {
      "InServiced": "Em Atendimento",
      "Waiting": "Aguardando"
    }
    return RowTexts[status]
  } 

  return (
    <>
    <div className=''>
      <Table className=''>
        <TableHeader>
          <TableRow>
            <TableHead>Posição</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tempo de fila</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: Users) => (
            <TableRow key={user.id}>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className='table-status'>{getStatusRow(user.rowStatus as RowPositionStatus)}</TableCell>
                <TableCell className='table-timeJoin'>{rowTimeJoin(user)}</TableCell>
            <TableCell><ButtonRemoveRow onRefresh={onRefresh} emailBusiness={emailBusiness} userEmail={user.email as string}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <div className="text-sm text-muted-foreground">
          Pagina {currentPage} de {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Proxima
        </Button>
      </div>
      </div>
    </>
  )
}

