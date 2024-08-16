import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

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
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "./dataTable";
import { columns } from "./columns";
import { ICommunity, ICreateCommunityDTO } from "@/interfaces/communityDTOs";
import { communityService } from "@/services/communityService";

export const Community = () => {
  const [name, setName] = useState("");

  const [communities, setCommunities] = useState<ICommunity[]>([]);

  useEffect(() => {
    async function getOrdersQuantity() {
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
    getOrdersQuantity();
  }, []);

  const handleCreateCommunity = async (event: React.FormEvent) => {
    event.preventDefault();

    const createData = {
      name,
    } as ICreateCommunityDTO;

    try {
      await communityService.create(createData);

      toast.success("Comunidade adicionanda com sucesso!");
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
      <main className="px-2 mt-12 flex-grow w-full">
        <section className="max-w-[1440px] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-bold text-3xl">Comunidades</h2>

            <Dialog
              onOpenChange={() => {
                setName("");
              }}
            >
              <DialogTrigger asChild>
                <Button variant="default">Adicionar</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] rounded-sm ">
                <DialogHeader>
                  <DialogTitle>Adicionar comunidade</DialogTitle>

                  <DialogDescription>
                    Adicione uma comunidade aqui. Clique em adicionar para
                    finalizar.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={handleCreateCommunity}
                  className="flex flex-col w-full gap-4"
                >
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="name" className="text-right">
                      Comunidade
                    </Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      placeholder="Digite o nome da comunidade"
                      required
                    />
                  </div>

                  <Button type="submit">Adicionar</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Separator className="my-4 mx-auto max-w-[1440px]" />

        <section className="max-w-[1440px] mx-auto">
          <DataTable columns={columns} data={communities} />
        </section>
      </main>
      <Footer />
    </div>
  );
};
