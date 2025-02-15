import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useSubmitLogin from "@/hooks/useSubmitLogin";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { handleSubmit } = useSubmitLogin();
  function submit(e: React.FormEvent) {
    e.preventDefault();
    handleSubmit(isLogin, email, password);
  }

  return (
    <Box padding={8}>
      <Typography variant="h3">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </Typography>
      <form onSubmit={submit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </Button>
      </form>
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia Sesión"}
      </Button>
    </Box>
  );
}
