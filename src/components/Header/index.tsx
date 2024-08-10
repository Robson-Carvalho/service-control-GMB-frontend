import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/auth";

export const Header = () => {
  const { name, _id, email, userType, logout } = useAuth();

  return (
    <header className="w-full px-2 py-3">
      <nav className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">{name}</Button>
            </DialogTrigger>
            <DialogContent className="px-2 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    <p className="font-bold text-lg">
                      Informações do Servidor Público
                    </p>
                  </DialogTitle>
                  <DialogDescription>
                    <p className="mb-2">
                      Informações detalhadas sobre o usuário atualmente logado.
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    ID
                  </Label>
                  <Input id="username" value={_id} className="col-span-3" />
                </div>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value={name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      E-mail
                    </Label>
                    <Input id="email" value={email} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="userType" className="text-right">
                      Setor
                    </Label>
                    <Input
                      id="userType"
                      value={userType}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose>
                    <Button type="submit">Voltar</Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="px-6">
                Sair
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="px-2 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <AlertDialogTitle className="text-lg font-semibold">
                  Sign Out
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-sm">
                  Tem certeza que deseja sair do sistema?
                </AlertDialogDescription>

                <AlertDialogFooter className="flex justify-end mt-4 space-x-2">
                  <AlertDialogCancel className="mr-3 text-gray-500 hover:text-gray-700">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => logout()}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                  >
                    Sair
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </nav>
    </header>
  );
};
