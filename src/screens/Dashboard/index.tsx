import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const Dashboard = () => {
  return (
    <div className="page flex flex-col min-h-screen bg-primary-foreground">
      <Header />
      <main className="flex-grow w-full px-2 py-3">
        <section className="max-w-[1440px] mx-auto">
          <h2 className="font-bold text-3xl">
            Dashboard
            <div className="content my-8">
              <div className="charts "></div>
            </div>
          </h2>
        </section>
      </main>
      <Footer />
    </div>
  );
};
