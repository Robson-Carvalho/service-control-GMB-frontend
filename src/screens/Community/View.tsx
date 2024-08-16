import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ICommunity, IUpdateCommunityDTO } from "@/interfaces/communityDTOs";
import { communityService } from "@/services/communityService";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "react-toastify";

export const View = ({ row }: { row: Row<ICommunity> }) => {
  const [newName, setNewName] = useState<string>(row.original.name);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedData = {
      name: newName,
    } as IUpdateCommunityDTO;

    try {
      await communityService.update(row.original._id, updatedData);
      toast.success("Informações atualizadas!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        toast.warning(`${message}`);
      } else {
        toast.error("Erro inesperado ao fazer login");
      }
    }
  };

  return (
    <Dialog onOpenChange={() => setNewName("")}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-sm ">
        <DialogHeader>
          <DialogTitle>Visualização e Edição de dados</DialogTitle>
          <DialogDescription>
            Faça mudanças no nome da comunidade aqui. Clique em salvar para
            finalizar.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleUpdate}
          className="flex flex-col w-full gap-4 py-4"
        >
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Comunidade
            </Label>
            <Input
              id="name"
              required
              placeholder="Digite o nome da comunidade"
              value={newName}
              defaultValue={row.original.name}
              onChange={(e) => setNewName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
