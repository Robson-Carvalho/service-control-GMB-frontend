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

import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
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
import {
  CommunityName,
  ICreateInhabitantDTO,
  IInhabitant,
} from "@/interfaces/inhabitantDTOs";

interface FormState {
  name: string;
  cpf: string;
  numberPhone: string;
  community: CommunityName;
  street: string;
  number: string;
}

export const Inhabitant = () => {
  const [inhabitants, setInhabitants] = useState<IInhabitant[]>([]);

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
    getOrdersQuantity();
  }, []);

  const [formState, setFormState] = useState<FormState>({
    name: "",
    cpf: "",
    numberPhone: "",
    community: CommunityName.DEFAULT,
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

  const handleSelectChange = (value: CommunityName) => {
    setFormState((prevState) => ({
      ...prevState,
      community: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const createData: ICreateInhabitantDTO = {
      name: formState.name,
      cpf: formState.cpf,
      numberPhone: formState.numberPhone,
      address: {
        community: formState.community,
        street: formState.street,
        number: formState.number,
      },
    };

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
      <main className="px-2 flex-grow w-full  ">
        <section className="max-w-[1440px] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-bold text-3xl">Habitantes</h2>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default">Adicionar</Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="px-2 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <AlertDialogTitle className="text-lg font-semibold">
                    Adicionar habitante{" "}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mt-2 text-sm">
                    Adicione um habitante. Clique em criar para finalizar.
                  </AlertDialogDescription>

                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
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

                      <div className="grid grid-cols-4 items-center gap-4">
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
                      <div className="grid grid-cols-4 items-center gap-4">
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="community" className="text-right">
                          Comunidade
                        </Label>

                        <Select
                          required
                          value={formState.community}
                          onValueChange={handleSelectChange}
                        >
                          <SelectTrigger id="community" className="w-[180px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Comunidade</SelectLabel>
                              <SelectItem value="Jacarezinho">
                                Jacarezinho
                              </SelectItem>
                              <SelectItem value="Quixabeira">
                                Quixabeira
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="number" className="text-right">
                          Nº
                        </Label>
                        <Input
                          id="number"
                          value={formState.number}
                          onChange={handleChange}
                          className="col-span-3"
                          placeholder="Nº"
                          required
                        />
                      </div>
                    </div>

                    <AlertDialogFooter className="flex flex-row justify-end mt-4 space-x-2">
                      <AlertDialogCancel className="mr-3 text-gray-500 hover:text-gray-700">
                        <Button variant="secondary">Cancelar</Button>
                      </AlertDialogCancel>

                      <Button variant="default" type="submit">
                        Criar
                      </Button>
                    </AlertDialogFooter>
                  </form>
                </div>
              </AlertDialogContent>
            </AlertDialog>
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
