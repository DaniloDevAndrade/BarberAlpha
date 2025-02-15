import { AppSidebar } from "./components/app-slidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { planDays } from "./billing/api/planDays";
import { requestPlan } from "./billing/api/requestPlan";
import InitialDashboard from "../components/InitialDashboard";

export default async function Page() {
  const session = await auth();
        if (!session) {
            redirect('/login');
        }
        const nameBusiness = session.user.name
        const emailBusiness = session.user.email;

  const res = await requestPlan(emailBusiness)
  
  if(res.planStatus?.status !== 'active'){
    redirect('/dashboard/billing');
  }  
  
  if(res.plan?.name === "free"){
    const plan = await planDays(emailBusiness)

    if(plan.days?.currentDay as number > 7) {
      redirect('/dashboard/billing');
    }
  }
  

  return (
    <SidebarProvider>
      <AppSidebar emailBusiness={emailBusiness} nameBusiness={nameBusiness} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Inicio
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <InitialDashboard></InitialDashboard>
      </SidebarInset>
    </SidebarProvider>
  )
}

