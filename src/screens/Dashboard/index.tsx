import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <>
      <h1>dashborad</h1>
      <Button className="bg-red-600" onClick={() => logout()}>
        Sign Out
      </Button>
    </>
  );
};
