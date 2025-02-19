import { useEffect, useState } from "react";
import useConnection from "./useConnection";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const { ADDRESS, getData } = useConnection();

  async function getCategories() {
    const data = await getData(ADDRESS.categories);
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, getCategories };
}
