import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { IOrderWithCommunity } from "@/interfaces/orderDTOs";
import { orderService } from "@/services/orderService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

export const Dashboard = () => {
  const [ordersQuantity, setOrdersQuantity] = useState<IOrderWithCommunity[]>(
    []
  );

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

  const year = new Date().getFullYear();

  const chartData = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(year, index).toLocaleString("default", {
      month: "long",
    });

    const visitors = ordersQuantity?.filter((order) => {
      const [, month] = order.date.split("/").map(Number);
      return month - 1 === index;
    }).length;

    return { month, visitors };
  });

  const chartConfig = {
    visitors: {
      label: "Visitantes",
      color: "hsl(var(--bg-primary))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } as ChartConfig;

  const communityCount = ordersQuantity.reduce((acc, order) => {
    if (order.community in acc) {
      acc[order.community]++;
    } else {
      acc[order.community] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const PieChartData = [
    {
      community: "jacarezinho",
      visitors: communityCount["Jacarezinho"] || 0,
      fill: "#b91c1c",
    },
    {
      community: "quixabeira",
      visitors: communityCount["Quixabeira"] || 0,
      fill: "#15803d",
    },
  ];

  const PieChartConfig = {
    visitors: {
      label: "Visitors",
    },
    jacarezinho: {
      label: "Jacarezinho",
    },
    quixabeira: {
      label: "Quixabeira",
    },
  } as ChartConfig;

  const generatePDF = async () => {
    const input = document.querySelector(".download") as HTMLElement;
    if (input) {
      setTimeout(async () => {
        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("dashboard.pdf");
      }, 500);
    } else {
      toast.error("Erro ao baixar relatório.");
    }
  };

  return (
    <div className="page flex flex-col min-h-screen bg-primary-foreground">
      <Header />
      <main className="px-2 flex-grow w-full">
        <section className="max-w-[1440px] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-bold text-3xl">Dashboard</h2>

            <Button onClick={generatePDF}>Baixar</Button>
          </div>
        </section>

        <Separator className="my-4 mx-auto max-w-[1440px]" />

        <section className="max-w-[1440px] mx-auto">
          <div className="my-8 download">
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
                      data={chartData}
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

                      <XAxis dataKey="visitors" type="number" />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
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

              <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Solicitações por Comunidade</CardTitle>
                  <CardDescription>Janeiro - Dezembro 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={PieChartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={PieChartData}
                        dataKey="visitors"
                        nameKey="community"
                        innerRadius={60}
                        strokeWidth={5}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {ordersQuantity.length}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Visitantes
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </Pie>

                      <ChartLegend
                        content={<ChartLegendContent nameKey="community" />}
                        className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
