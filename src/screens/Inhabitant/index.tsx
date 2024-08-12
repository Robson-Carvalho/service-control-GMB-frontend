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

export const Inhabitant = () => {
  const [inhabitants, setInhabitants] = useState<IInhabitant[]>([]);

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

            <Button>Adicionar</Button>
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
