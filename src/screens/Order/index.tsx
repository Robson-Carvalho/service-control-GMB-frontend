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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/auth";
import { ICreateOrderDTO, IOrderDataTable } from "@/interfaces/orderDTOs";
import { orderService } from "@/services/orderService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "./dataTable";
import { columns } from "./columns";

export const Order = () => {
  const [content, setContent] = useState("");
  const [cpf, setCpf] = useState("");
  const { _id } = useAuth();

  const [orders, setOrders] = useState<IOrderDataTable[]>([]);

  useEffect(() => {
    async function getOrdersQuantity() {
      try {
        const data = await orderService.getAll();
        setOrders(data);
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

  const handleCreateOrder = async (event: React.FormEvent) => {
    event.preventDefault();

    const createData = {
      content,
      inhabitantCPF: cpf,
      userID: _id,
    } as ICreateOrderDTO;

    try {
      await orderService.create(createData);

      toast.success("Pedido criado com sucesso!");
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
      <main className="px-2  mt-12 flex-grow w-full">
        <section className="max-w-[1440px] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-bold text-3xl">Pedidos</h2>

            <Dialog
              onOpenChange={() => {
                setContent("");
                setCpf("");
              }}
            >
              <DialogTrigger asChild>
                <Button variant="default">Adicionar</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] rounded-sm ">
                <DialogHeader>
                  <DialogTitle>Criar pedido</DialogTitle>

                  <DialogDescription>
                    Crie um pedido aqui. Clique em criar para finalizar.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={handleCreateOrder}
                  className="flex flex-col w-full gap-4"
                >
                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="name" className="text-right">
                      Conteúdo
                    </Label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      placeholder="Digite a solicitação"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-4">
                    <Label htmlFor="cpf" className="text-right">
                      CPF do habitante
                    </Label>
                    <Input
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      id="cpf"
                      placeholder="Digite o CPF"
                      required
                    />
                  </div>

                  <Button type="submit">Salvar</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Separator className="my-4 mx-auto max-w-[1440px]" />

        <section className="max-w-[1440px] mx-auto">
          <DataTable columns={columns} data={orders} />
        </section>
      </main>
      <Footer />
    </div>
  );
};
