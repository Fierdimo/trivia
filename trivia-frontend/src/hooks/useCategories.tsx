import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const backendHost = process.env.BK_HOST || "http://localhost:3000";

  async function getCategories() {
    console.log('adquiriendo categorias')
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(backendHost + "/questions/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, getCategories };
}
