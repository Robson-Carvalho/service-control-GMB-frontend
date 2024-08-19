import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { IDataTable } from ".";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { BarChart, CartesianGrid, YAxis, Bar, LabelList } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Separator } from "@/components/ui/separator";

import logo from "../../assets/logo.png";

export const Download = ({ row }: { row: Row<IDataTable> }) => {
  const { year, months, communities } = row.original;

  const generatePDF = () => {
    const input = document.getElementById("contentToPrint") as HTMLElement;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [210, 297],
      });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(
        `Controle de Serviço - Prefeitura de Governador Mangabeira - ${year}.pdf`
      );
    });
  };

  const chartConfig = {
    visitors: {
      label: "Visitantes",
      color: "hsl(var(--primary))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } as ChartConfig;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Baixar</Button>
      </DialogTrigger>

      <DialogContent className="rounded-sm max-h-[500px] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Relatório</DialogTitle>
          <DialogDescription>
            O relatório a ser baixado é referente ao ano de {row.original.year}.
            Tem certeza que deseja baixá-lo?
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto">
          <div
            id="contentToPrint"
            style={{
              width: "210mm",
              height: "297mm",
              padding: "20mm",
              backgroundColor: "white",
            }}
          >
            <div className="flex flex-row items-center justify-between">
              <div>
                <h1 className="font-bold text-2xl">Relatório {year}</h1>
                <h3 className="">
                  Controle de Serviço - Prefeitura de Governador Mangabeira - BA
                </h3>
              </div>
              <img
                src={logo}
                className="w-16"
                alt="Bandeira de Governador Mangabeira - BA"
              />
            </div>

            <Separator className="my-4 mx-auto max-w-[1440px]" />

            <div className="charts flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitações</CardTitle>
                  <CardDescription>Janeiro - Dezembro {year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={months}
                      layout="vertical"
                      margin={{
                        right: 16,
                      }}
                    >
                      <CartesianGrid horizontal={false} />
                      <YAxis
                        dataKey="month"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />

                      <Bar
                        dataKey="visitors"
                        layout="vertical"
                        fill="var(--color-visitors)"
                        radius={4}
                      >
                        <LabelList
                          dataKey="month"
                          position="insideLeft"
                          offset={8}
                          className="fill-[--color-label]"
                          fontSize={12}
                        />
                        <LabelList
                          dataKey="visitors"
                          position="right"
                          offset={8}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Solicitações por comunidade</CardTitle>
                  <CardDescription>Janeiro - Dezembro {year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={communities}
                      layout="vertical"
                      margin={{
                        right: 16,
                      }}
                    >
                      <CartesianGrid horizontal={false} />
                      <YAxis
                        dataKey="community"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />

                      <Bar
                        dataKey="visitors"
                        layout="vertical"
                        fill="var(--color-visitors)"
                        radius={4}
                      >
                        <LabelList
                          dataKey="community"
                          position="insideLeft"
                          offset={8}
                          className="fill-[--color-label]"
                          fontSize={12}
                        />
                        <LabelList
                          dataKey="visitors"
                          position="right"
                          offset={8}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Button onClick={generatePDF}>Baixar</Button>
      </DialogContent>
    </Dialog>
  );
};
