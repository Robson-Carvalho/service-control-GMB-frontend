import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { IOrderWithCommunity } from "@/interfaces/orderDTOs";
import { orderService } from "@/services/orderService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Reports = () => {
  const [ordersQuantity, setOrdersQuantity] = useState<IOrderWithCommunity[]>(
    []
  );

  console.log(ordersQuantity);

  useEffect(() => {
    async function getOrdersQuantity() {
      try {
        const orders = await orderService.getOrdersQuantity();

        setOrdersQuantity(orders);
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
    <div className="page flex flex-col min-h-screen bg-primary-foreground">
      <Header />
      <main className="px-2  mt-12 flex-grow w-full">
        <section className="max-w-[1440px] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-bold text-3xl">Relatórios</h2>
          </div>
        </section>

        <Separator className="my-4 mx-auto max-w-[1440px]" />

        <section className="max-w-[1440px] mx-auto"></section>
      </main>
      <Footer />
    </div>
  );
};
