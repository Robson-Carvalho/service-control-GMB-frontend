import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Order = () => {
  return (
    <div className="page flex flex-col min-h-screen bg-primary-foreground">
      <Header />
      <main className="flex-grow w-full px-2 py-6">
        <section className="max-w-[1440px] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-bold text-3xl">Pedidos</h2>

            <Button>Criar</Button>
          </div>
        </section>

        <Separator className="my-4 mx-auto max-w-[1440px]" />

        <section className="max-w-[1440px] mx-auto">d</section>
      </main>
      <Footer />
    </div>
  );
};
