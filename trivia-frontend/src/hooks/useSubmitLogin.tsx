"use client";

import axios from "axios";
import { useRouter } from "next/router";

export default function useSubmitLogin() {
  const router = useRouter();
  const handleSubmit = async (
    isLogin: boolean,
    email: string,
    password: string
  ) => {
    console.log(isLogin);
    const url = isLogin ? "/auth/login" : "/auth/register";
    try {
      const { data } = await axios.post('http://localhost:3000'+url, { email, password });
      //TODO: entregar token de acceso al registrar
      localStorage.setItem('token', data.access_token);
      router.push('/game');
    } catch (error) {
      alert('Error: ' + error.response?.data?.message);
    }
  };

  return { handleSubmit };
}
