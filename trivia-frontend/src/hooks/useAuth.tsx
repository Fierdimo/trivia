"use client";

import { User } from "@/types/user";
import { useRouter } from "next/router";
import useConnection from "./useConnection";

export default function useAuth() {
  const router = useRouter();

  const { ADDRESS, getData, postData } = useConnection();

  async function handleSubmit(
    isLogin: boolean,
    email: string,
    password: string
  ) {
    const url = isLogin ? ADDRESS.login : ADDRESS.register;
    const { data } = await postData(url, { email, password });
    if (data) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", data.id);
      router.push("/game");
    }
  }

  async function getUser(login: (userData: User) => void) {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (!token || !id) {
        throw new Error("Area restringida: Solo para usuarios registrados");
      }

      const user  = await getData(ADDRESS.users + id);
      login(user);
      return true;
    } catch (error) {
      router.push("/");
      alert(error);
      return false;
    }
  }

  return { handleSubmit, getUser };
}
