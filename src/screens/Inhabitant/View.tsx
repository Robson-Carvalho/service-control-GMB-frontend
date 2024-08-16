import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inhabitantService } from "@/services/inhabitantService";

import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IInhabitant, IUpdateInhabitantDTO } from "@/interfaces/inhabitantDTOs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { communityService } from "@/services/communityService";
import { ICommunity } from "@/interfaces/communityDTOs";

export const View = ({ row }: { row: Row<IInhabitant> }) => {
  const [name, setName] = useState<string>(row.original.name);
  const [cpf, setCpf] = useState<string>(row.original.cpf);
  const [numberPhone, setNumberPhone] = useState<string | undefined>(
    row.original.numberPhone
  );
  const [communityID, setCommunityID] = useState<string>(
    row.original.communityID
  );
  const [street, setStreet] = useState<string>(row.original.address.street);
  const [number, setNumber] = useState<string>(row.original.address.number);

  const [communities, setCommunities] = useState<ICommunity[]>([]);

  useEffect(() => {
    async function getCommunities() {
      try {
        const data = await communityService.getAll();
        setCommunities(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          const { message } = error;
          toast.warning(`${message}`);
        } else {
          toast.error("Erro inesperado ao fazer login");
        }
      }
    }
    getCommunities();
  }, []);

  const handleSubmit = async (_id: string) => {
    const updatedData = {
      name,
      cpf,
      numberPhone,
      address: {
        street,
        number,
      },
      communityID,
    } as IUpdateInhabitantDTO;

    try {
      await inhabitantService.update(_id, updatedData);
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
    <div className="flex justify-center space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Editar</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] rounded-sm ">
          <DialogHeader>
            <DialogTitle>
              Editar dados de {row.original.name.split(" ")[0]}
            </DialogTitle>
            <DialogDescription>
              Faça mudanças no perfil aqui. Clique em salvar para finalizar.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-full gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                defaultValue={row.original.name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="cpf" className="text-right">
                CPF
              </Label>
              <Input
                id="cpf"
                value={cpf}
                defaultValue={row.original.cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="numberPhone" className="text-right">
                Telefone
              </Label>
              <Input
                id="numberPhone"
                value={numberPhone}
                defaultValue={row.original.numberPhone}
                onChange={(e) => setNumberPhone(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="community" className="text-right">
                Comunidade
              </Label>

              <Select value={communityID} onValueChange={setCommunityID}>
                <SelectTrigger id="community" className="w-[180px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Comunidade</SelectLabel>
                    {communities.length > 0 &&
                      communities.map((community) => {
                        return (
                          <SelectItem key={community._id} value={community._id}>
                            {community.name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="street" className="text-right">
                Rua
              </Label>
              <Input
                id="street"
                value={street}
                defaultValue={row.original.address.street}
                onChange={(e) => setStreet(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="number" className="text-right">
                Nº
              </Label>
              <Input
                id="number"
                value={number}
                defaultValue={row.original.address.number}
                onChange={(e) => setNumber(e.target.value)}
                className="col-span-3"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              onClick={() => handleSubmit(row.original._id)}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
