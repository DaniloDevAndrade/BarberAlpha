import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormFinallyUser from "./FormFinally";

type BodyProp = {
    emailBusiness: string;
}

export function DialogFinallyUser({emailBusiness}: BodyProp) {
  
  return (
    <Dialog>
        <DialogTrigger asChild>           
            <Button className="mt-3"><PlusIcon />Finalizar Atendimento</Button>        
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Finalizar Atendimento.</DialogTitle>
            <DialogDescription >Finalize o corte do seu cliente em atendimento!</DialogDescription>
            <FormFinallyUser emailBusiness={emailBusiness}/>
            <DialogClose asChild>
					</DialogClose>
        </DialogContent>
    </Dialog>
  )
}
