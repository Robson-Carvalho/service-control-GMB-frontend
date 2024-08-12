import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export const Order = () => {
  return (
    <div className="page flex flex-col min-h-screen bg-primary-foreground">
      <Header />
      <main className="flex-grow w-full px-2 py-6">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-bold text-3xl">Pedidos</h2>

          <Button>Criar</Button>
        </div>

        <div className="my-8 download"></div>
      </main>
      <Footer />
    </div>
  );
};
