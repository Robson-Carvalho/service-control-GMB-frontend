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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IOrderDataTable, IUpdateOrderDTO } from "@/interfaces/orderDTOs";
import { orderService } from "@/services/orderService";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "react-toastify";

export const View = ({ row }: { row: Row<IOrderDataTable> }) => {
  const {
    _id,
    content,
    status,
    date,
    date_update,
    inhabitantCPF,
    userType,
    userName,
  } = row.original;
  const [newStatus, setNewStatus] = useState<string>(status);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newStatus);

    const updatedData = {
      status: newStatus,
      content,
    } as IUpdateOrderDTO;

    try {
      await orderService.update(_id, updatedData);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-sm ">
        <DialogHeader>
          <DialogTitle>Visualização e Edição de dados</DialogTitle>
          <DialogDescription>
            Faça mudanças no pedido aqui. Clique em salvar para finalizar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="flex flex-col w-full gap-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="cpf" className="text-right">
              ID
            </Label>
            <Input id="cpf" disabled value={_id} className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="cpf" className="text-right">
              Setor
            </Label>
            <Input id="cpf" disabled value={userType} className="col-span-3" />
          </div>

          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="cpf" className="text-right">
              Servidor(a)
            </Label>
            <Input id="cpf" disabled value={userName} className="col-span-3" />
          </div>

          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Conteúdo
            </Label>
            <Textarea disabled value={content} />
          </div>

          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>

            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger id="status" className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Negado">Negado</SelectItem>
                  <SelectItem value="Atendido">Atendido</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="cpf" className="text-right">
              CPF
            </Label>
            <Input
              id="cpf"
              disabled
              value={inhabitantCPF}
              className="col-span-3"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="cpf" className="text-right">
              Data de criação
            </Label>

            <Input id="cpf" disabled value={date} className="col-span-3" />
          </div>

          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="cpf" className="text-right">
              Última atualização
            </Label>

            <Input
              id="cpf"
              disabled
              value={date_update}
              className="col-span-3"
            />
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
