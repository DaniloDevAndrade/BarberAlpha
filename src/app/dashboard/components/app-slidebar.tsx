"use client"

import * as React from "react"
import {
  Bot,
  Settings2,
  Wallet,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({nameBusiness, emailBusiness, ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    user: {
        nameBarber: nameBusiness as string,
        email: emailBusiness as string
    },
    navMain: [
      {
        title: "Clientes",
        url: "/dashboard/clientes/todos",
        icon: Bot,
        items: [
          {
            title: "Todos Clientes",
            url: "/dashboard/clientes/todos",
            isActive: true,
          },
        ],
      },
      {
        title: "Financeiro",
        url: "/dashboard/finance/current-mont",
        icon: Wallet,
        items: [
          {
            title: "Faturamento Anual",
            url: "/dashboard/finance",
            isActive: true,
          },
          {
            title: "Faturamento Mensal",
            url: "/dashboard/finance/current-month",
            isActive: true,
          },
          {
            title: "Despesas",
            url: "/dashboard/finance/despesas",
            isActive: true,
          },
        ],
      },
      {
        title: "Fila",
        url: "/dashboard/fila/gerencia",
        icon: Settings2,
        items: [
          {
            title: "Gereciamento",
            url: "/dashboard/fila/gerencia",
          },
          {
            title: "QRCode",
            url: "/dashboard/fila/qrcode",
          },
        ],
      },
    ],
  }
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

