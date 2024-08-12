import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import notFound from "../../assets/notFound.svg";

export const NotFound = () => {
  return (
    <div className="page flex flex-col min-h-screen bg-primary-foreground">
      <main className="flex-grow w-full px-2 py-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Página não encontrada</h2>
          <Link to="/dashboard">
            <Button>Home</Button>
          </Link>
        </div>

        <section className="mt-10">
          <div className="my-auto max-w-xl mx-auto aspect-square p-8">
            <img src={notFound} alt="Not found" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
