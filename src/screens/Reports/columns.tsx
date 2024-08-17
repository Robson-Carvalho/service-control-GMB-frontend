import { ColumnDef } from "@tanstack/react-table";
import { Download } from "./Download";
import { IDataTable } from ".";

export const columns: ColumnDef<IDataTable>[] = [
  {
    accessorKey: "year",
    header: "Ano",
  },
  {
    accessorKey: "communities",
    header: "Número de pedidos",
    cell: ({ row }) => {
      const reduceNumber = row.original.months.reduce((acc, curr) => {
        return acc + curr.visitors;
      }, 0);

      return <div>{reduceNumber}</div>;
    },
  },
  {
    accessorKey: "action",
    header: "Ação",
    cell: ({ row }) => <Download row={row} />,
  },
];
