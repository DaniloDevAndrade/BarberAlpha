'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { paginateUsers } from '../api/caculate'
import { Users } from '@prisma/client'

interface UserTableProps {
  initialUsers: Users[]
}

export default function UserTable({ initialUsers }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(initialUsers.length / pageSize)

  const users = paginateUsers(initialUsers, currentPage, pageSize)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Cliente desde</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: Users) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
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
    </>
  )
}

