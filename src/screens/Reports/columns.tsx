import { Button } from "@/components/ui/button";

import { IOrderDataTable } from "@/interfaces/orderDTOs";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { View } from "./View";

export const columns: ColumnDef<IOrderDataTable>[] = [
  {
    accessorKey: "inhabitantName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("inhabitantName")}</div>,
  },
  {
    accessorKey: "inhabitantCPF",
    header: "CPF",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("inhabitantCPF")}</div>
    ),
  },
  {
    accessorKey: "content",
    header: "Pedido",
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      const truncatedContent =
        content.length > 10 ? `${content.substring(0, 10)}...` : content;
      return <div>{truncatedContent}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "userType",
    header: "Setor",
    cell: ({ row }) => <div className="">{row.getValue("userType")}</div>,
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => <View row={row} />,
  },
];
