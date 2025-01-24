"use client"

import * as React from "react"
import {
  Bot,
  Settings2,
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
        url: "#",
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
        title: "Fila",
        url: "#",
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

