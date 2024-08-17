import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { IOrderWithCommunity } from "@/interfaces/orderDTOs";
import { orderService } from "@/services/orderService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "./dataTable";
import { columns } from "./columns";

type MonthVisitors = {
  month: string;
  visitors: number;
};

type CommunityVisitors = {
  community: string;
  visitors: number;
};

export type IDataTable = {
  year: string;
  months: MonthVisitors[];
  communities: CommunityVisitors[];
};

function transformData(data: IOrderWithCommunity[]): IDataTable[] {
  function generateYearStructure(year: number): IDataTable {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return {
      year: year.toString(),
      months: months.map((month): MonthVisitors => ({ month, visitors: 0 })),
      communities: [],
    };
  }

  const groupedData = data.reduce<Record<number, IDataTable>>(
    (acc, { community, date }) => {
      const [, month, year] = date.split("/");
      const yearInt = parseInt(year, 10);
      const monthIndex = parseInt(month, 10) - 1;

      if (!acc[yearInt]) {
        acc[yearInt] = generateYearStructure(yearInt);
      }

      acc[yearInt].months[monthIndex].visitors += 1;

      const communityEntry = acc[yearInt].communities.find(
        (entry) => entry.community === community
      );

      if (communityEntry) {
        communityEntry.visitors += 1;
      } else {
        acc[yearInt].communities.push({ community, visitors: 1 });
      }

      return acc;
    },
    {}
  );

  Object.values(groupedData).forEach((yearData) => {
    yearData.communities.sort((a, b) => a.community.localeCompare(b.community));
  });

  const result = Object.values(groupedData);

  return result;
}

export const Reports = () => {
  const [reports, setReports] = useState<IDataTable[]>([]);

  useEffect(() => {
    async function getOrdersQuantity() {
      try {
        const orders = await orderService.getOrdersQuantity();

        const data = transformData(orders);

        setReports(data);
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

        <section className="max-w-[1440px] mx-auto">
          <DataTable columns={columns} data={reports} />
        </section>
      </main>
      <Footer />
    </div>
  );
};
