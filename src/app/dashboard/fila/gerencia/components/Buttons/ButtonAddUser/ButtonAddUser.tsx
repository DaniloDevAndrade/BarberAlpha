import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import FormAddUser from "./FormAddUser";
import { Button } from "@/components/ui/button";

type BodyProp = {
    emailBusiness: string;
}

export function DialogAddUser({emailBusiness}: BodyProp) {
  
  return (
    <Dialog>
        <DialogTrigger asChild>           
            <Button><PlusIcon />Adicionar Cliente</Button>        
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Adcionar novo cliente na fila.</DialogTitle>
            <DialogDescription >Adicione novos clientes a fila!</DialogDescription>
            <FormAddUser emailBusiness={emailBusiness}/>
            <DialogClose asChild>
					</DialogClose>
        </DialogContent>
    </Dialog>
  )
}
