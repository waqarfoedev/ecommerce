import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get cat
  const getCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      // console.log(data.category);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return categories;
}
