import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import social from "../../assets/social.svg";
import team from "../../assets/team.svg";
import work from "../../assets/work.svg";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext/useAuth";
import { useState } from "react";

export const SignIn = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await auth.authenticate(email, password);
      naviagte("/dashbord");
    } catch (error) {}
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-grow flex w-full flex-col md:flex-row justify-center items-center ">
        <div className="hidden md:flex  w-full h-full items-center justify-center p-16">
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              <CarouselItem>
                <div className="flex aspect-square bg-background rounded p-8">
                  <img src={social} alt="Social image" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div>
                  <img src={team} alt="Team image" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div>
                  <img src={work} alt="Work" />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <section className="flex items-center justify-center bg-background h-full w-full p-4 md:max-w-3xl md:w-full">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tighter">
                Entre com sua conta
              </CardTitle>
              <CardDescription>
                Utilize seu e-mail e senha para entrar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="email" className="font-bold ">
                  E-mail
                </Label>
                <Input
                  id="email"
                  placeholder="exemplo@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="password" className="font-bold">
                  Senha
                </Label>
                <Input
                  id="password"
                  placeholder="Sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                className="mt-6 w-full"
                onClick={() => handleLogin(email, password)}
              >
                Entrar
              </Button>
              <CardFooter className="mt-4">
                <p className="text-muted-foreground text-center text-sm">
                  Ao entrar em nossa plataforma você concorda com nossos termos
                  de Uso e Política de Privacidade.
                </p>
              </CardFooter>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="absolute bottom-0 w-full text-center text-xs text-muted-foreground p-4 bg-primary-foreground">
        &copy; {new Date().getFullYear()} Next Automações. Todos os direitos
        reservados.
      </footer>
    </div>
  );
};
