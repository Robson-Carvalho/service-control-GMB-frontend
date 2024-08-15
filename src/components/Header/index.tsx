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
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@radix-ui/react-label";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/auth";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

export const Header = () => {
  const { name, _id, email, userType, logout } = useAuth();

  const firstName = name?.split(" ")[0];

  return (
    <header className="w-full py-4 px-2">
      <nav className="max-w-[1440px] mx-auto flex flex-row items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{firstName}</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] rounded-sm ">
            <DialogHeader>
              <DialogTitle>Informações do Serividor(a) público</DialogTitle>
              <DialogDescription>
                Essas informações são referentes ao servidor(a) {firstName}.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input id="id" value={_id} className="col-span-3" />
              </div>

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
                <Input id="userType" value={userType} className="col-span-3" />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between gap-4">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline">Menu</Button>
            </SheetTrigger>
            <SheetContent>
              <ul className="mt-4 flex flex-col items-start gap-2">
                <Link to="/dashboard">
                  <p>Home</p>
                </Link>
                <Separator className="my-1" />

                <Link to="/pedidos">
                  <p>Pedidos</p>
                </Link>
                <Separator className="my-1" />
                <Link to="/habitantes">
                  <p>Habitantes</p>
                </Link>
                <Separator className="my-1" />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="px-6">
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

                      <AlertDialogFooter className="flex flex-row justify-end mt-4 space-x-2">
                        <AlertDialogCancel className="text-gray-500 hover:text-gray-700">
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
              </ul>
            </SheetContent>
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Sair</Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="px-2 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <AlertDialogTitle className="text-lg font-semibold">
                  Sign Out
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-sm">
                  Tem certeza que deseja sair do sistema?
                </AlertDialogDescription>

                <AlertDialogFooter className="flex flex-row justify-end mt-4 space-x-2">
                  <AlertDialogCancel className="text-gray-500 hover:text-gray-700">
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
