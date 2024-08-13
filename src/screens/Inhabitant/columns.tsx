import { IInhabitant } from "@/interfaces/inhabitantDTOs";
import { ColumnDef } from "@tanstack/react-table";

import { Cell } from "./Cell";

export const columns: ColumnDef<IInhabitant>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "numberPhone",
    header: "Telefone",
  },
  {
    accessorKey: "address.community",
    header: "Comunidade",
  },
  {
    accessorKey: "address.street",
    header: "Rua",
  },
  {
    accessorKey: "address.number",
    header: "Nº",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => <Cell row={row} />,
  },
];
