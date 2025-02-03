"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import type { UserAll } from "./types"
import { paginateAllUsers} from "../api/caculate"

interface UserTableProps {
  initialUsers: UserAll[]
}

type SortField = "name" | "email" | "phone" | "createdAt" | "lastHaircut"
type SortOrder = "asc" | "desc"

export default function UserTable({ initialUsers }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const pageSize = 10

  const sortedUsers = [...initialUsers].sort((a, b) => {
    if (sortField === "lastHaircut") {
      const aDate = a.FinishedHaircuts && a.FinishedHaircuts.length > 0 ? new Date(a.FinishedHaircuts[0].createdAt).getTime() : 0;
      const bDate = b.FinishedHaircuts && b.FinishedHaircuts.length > 0 ? new Date(b.FinishedHaircuts[0].createdAt).getTime() : 0;
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    }
  
    if (sortField === "createdAt") {
      const aCreatedAt = a[sortField] ? new Date(a[sortField]).getTime() : 0;
      const bCreatedAt = b[sortField] ? new Date(b[sortField]).getTime() : 0;
      return sortOrder === "asc" ? aCreatedAt - bCreatedAt : bCreatedAt - aCreatedAt;
    }
  
    const aField = a[sortField] || '';
    const bField = b[sortField] || '';
    return sortOrder === "asc" ? aField.localeCompare(bField) : bField.localeCompare(aField);
  });
  

  const totalPages = Math.ceil(sortedUsers.length / pageSize)
  const users = paginateAllUsers(sortedUsers, currentPage, pageSize)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              { label: "Nome", field: "name" },
              { label: "Email", field: "email" },
              { label: "Telefone", field: "phone" },
              { label: "Cliente desde", field: "createdAt" },
              { label: "Ultimo corte", field: "lastHaircut" },
            ].map(({ label, field }) => (
              <TableHead key={field}>
                <Button variant="ghost" onClick={() => handleSort(field as SortField)} className="hover:bg-transparent">
                  {label}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {user.FinishedHaircuts.length > 0
                  ? new Date(user.FinishedHaircuts[0].createdAt).toLocaleDateString()
                  : "Nunca Cortou"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Proxima
        </Button>
      </div>
    </>
  )
}

