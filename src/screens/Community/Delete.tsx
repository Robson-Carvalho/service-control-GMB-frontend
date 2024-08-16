import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { ICommunity } from "@/interfaces/communityDTOs";
import { communityService } from "@/services/communityService";

import { Row } from "@tanstack/react-table";

import { toast } from "react-toastify";

export const Delete = ({ row }: { row: Row<ICommunity> }) => {
  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await communityService.delete(row.original._id);
      toast.success("Informações atualizadas!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        toast.warning(`${message}`);
      } else {
        toast.error("Erro inesperado ao fazer login");
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="">
          Apagar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle className="text-lg font-semibold">
          Apagar comunidade {row.original.name}
        </AlertDialogTitle>
        <AlertDialogDescription className="mt-2 text-sm">
          Tem certeza que deseja apagar a comunidade?
        </AlertDialogDescription>

        <AlertDialogFooter className="flex flex-row justify-end mt-4 space-x-2">
          <AlertDialogCancel className="text-gray-500 hover:text-gray-700">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
