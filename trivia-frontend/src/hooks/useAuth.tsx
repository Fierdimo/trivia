"use client";

import { User } from "@/types/user";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function useAuth() {
  const router = useRouter();
  const backendHost = process.env.BK_HOST || "http://localhost:3000";

  async function handleSubmit(
    isLogin: boolean,
    email: string,
    password: string
  ) {
    const url = isLogin ? "/auth/login" : "/auth/register";
    try {
      const { data } = await axios.post(backendHost + url, { email, password });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", data.id);
      router.push("/game");
    } catch (error: unknown) {
      const myError = error as AxiosError;
      const data = myError.response?.data as { message: string };
      const message = data?.message;
      alert("Error: " + message);
    }
  }

  async function getUser(login: (userData: User) => void) {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (!token || !id) {
        throw new Error("Usuario no validado");
      }
      const { data } = await axios.get(`${backendHost}/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      login(data);
      return true;
    } catch (error) {
      const myError = error as AxiosError
      alert(
        myError?.status == 401
          ? "Tu sesion ha vencido, reloguea inmediatamente"
          : "Error al validar el usuario"
      );
      router.push("/");
      return false;
    }
  }

  return { handleSubmit, getUser };
}
