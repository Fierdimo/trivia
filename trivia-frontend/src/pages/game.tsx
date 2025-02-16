import { useLayoutEffect, useContext, useState } from "react";
import { CircularProgress, Grid2 } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { UserContext } from "@/context/userContext";
import Ranking from "@/components/ranking";
import Header from "@/components/header";
import Questions from "@/components/questions";

export default function Game() {
  const [isLogged, setIsLogged] = useState(false);
  const { getUser } = useAuth();
  const { login, logout, user } = useContext(UserContext);

  async function getLogged() {
    const validUser = await getUser(login);
    setIsLogged(validUser);
  }
  useLayoutEffect(() => {
    getLogged();
  }, []);

  if (!isLogged) return <CircularProgress />;

  return (
    <Grid2 container>
      <Grid2 size={8}>
        <Grid2>
          <Header user={user} logout={logout} />
        </Grid2>
        <Grid2 height={"80%"}>
          <Questions admin={user?.role === "admin"} />
        </Grid2>
      </Grid2>
      <Grid2 size={4}>
        <Ranking />
      </Grid2>
    </Grid2>
  );
}
