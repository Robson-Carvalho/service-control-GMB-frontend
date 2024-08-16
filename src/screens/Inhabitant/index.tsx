import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { inhabitantService } from "@/services/inhabitantService";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "./dataTable";
import { columns } from "./columns";
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
import { ICreateInhabitantDTO, IInhabitant } from "@/interfaces/inhabitantDTOs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICommunity } from "@/interfaces/communityDTOs";
import { communityService } from "@/services/communityService";

interface FormState {
  name: string;
  cpf: string;
  numberPhone: string;
  communityID: string;
  street: string;
  number: string;
}

export const Inhabitant = () => {
  const [inhabitants, setInhabitants] = useState<IInhabitant[]>([]);
  const [communities, setCommunities] = useState<ICommunity[]>([]);

  useEffect(() => {
    async function getOrdersQuantity() {
      try {
        const data = await inhabitantService.getAll();

        setInhabitants(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          const { message } = error;
          toast.warning(`${message}`);
        } else {
          toast.error("Erro inesperado ao fazer login");
        }
      }
    }
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
    getOrdersQuantity();
  }, []);

  const [formState, setFormState] = useState<FormState>({
    name: "",
    cpf: "",
    numberPhone: "",
    communityID: "",
    street: "",
    number: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      communityID: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const createData: ICreateInhabitantDTO = {
      name: formState.name,
      cpf: formState.cpf,
      numberPhone: formState.numberPhone,
      address: {
        street: formState.street,
        number: formState.number,
      },
      communityID: formState.communityID,
    };

    if (!createData.communityID) {
      toast.warning("Comunidade não informada!");
      return;
    }

    try {
      await inhabitantService.create(createData);

      toast.success("Novo habitante adicionado!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        toast.warning(`${message}`);
      } else {
        toast.error("Erro inesperado!");
      }
    }
  };

  return (
    <div className="page flex flex-col min-h-screen bg-primary-foreground">
      <Header />
      <main className="px-2 mt-12 flex-grow w-full  ">
        <section className="max-w-[1440px] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-bold text-3xl">Habitantes</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">Adicionar</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] rounded-sm ">
                <DialogHeader>
                  <DialogTitle>Adicionar habitante</DialogTitle>
                  <DialogDescription>
                    Adicione um habitante. Clique em criar para finalizar.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-full gap-4 py-4"
                >
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Nome"
                      required
                    />
                  </div>

                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="cpf" className="text-right">
                      CPF
                    </Label>
                    <Input
                      id="cpf"
                      value={formState.cpf}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="CPF"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="numberPhone" className="text-right">
                      Telefone
                    </Label>
                    <Input
                      id="numberPhone"
                      value={formState.numberPhone}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Telefone"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="community" className="text-right">
                      Comunidade
                    </Label>

                    <Select
                      required
                      value={formState.communityID}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="community" className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Comunidade</SelectLabel>
                          {communities.length > 0 &&
                            communities.map((community) => {
                              return (
                                <SelectItem
                                  key={community._id}
                                  value={community._id}
                                >
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
                      value={formState.street}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Rua"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="number" className="text-right">
                      Nº
                    </Label>
                    <Input
                      id="number"
                      value={formState.number}
                      onChange={handleChange}
                      className="col-span-3"
                      placeholder="Número da residência"
                      required
                    />
                  </div>

                  <Button variant="default" type="submit">
                    Criar
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Separator className="my-4 mx-auto max-w-[1440px]" />

        <section className="max-w-[1440px] mx-auto">
          <DataTable columns={columns} data={inhabitants} />
        </section>
      </main>
      <Footer />
    </div>
  );
};
