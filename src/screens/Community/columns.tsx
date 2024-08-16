import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { View } from "./View";
import { ICommunity } from "@/interfaces/communityDTOs";
import { Delete } from "./Delete";

export const columns: ColumnDef<ICommunity>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <>
          <View row={row} />
        </>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <Delete row={row} />,
  },
];
