import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IInhabitant } from "@/interfaces/IInhabitant";
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

export const Inhabitant = () => {
  const [inhabitants, setInhabitants] = useState<IInhabitant[]>([]);
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [numberPhone, setNumberPhone] = useState<string>("");
  const [community, setCommunity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  useEffect(() => {
    async function getOrdersQuantity() {
      try {
        const data = await inhabitantService.getAllInhabitant();

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

  return (
    <div className="px-2 page flex flex-col min-h-screen bg-primary-foreground">
      <Header />
      <main className="flex-grow w-full  ">
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

                  <form>
                    <div className="flex flex-col gap-2 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
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
                          value={numberPhone}
                          onChange={(e) => setNumberPhone(e.target.value)}
                          className="col-span-3"
                          placeholder="Telefone"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="community" className="text-right">
                          Comunidade
                        </Label>
                        <Input
                          id="community"
                          value={community}
                          onChange={(e) => setCommunity(e.target.value)}
                          className="col-span-3"
                          placeholder="Comunidade"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="street" className="text-right">
                          Rua
                        </Label>
                        <Input
                          id="street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
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
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          className="col-span-3"
                          placeholder="Nº"
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
