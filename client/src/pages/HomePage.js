import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Layout/Prices";
import ProductCard from "./Auth/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // get all category
  const getCategory = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data?.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong during getting all products");
    }
  };

  //lifecycle methd
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked.length, radio.length]);

  // get filter category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(all);
  };

  // create filter products in filter-route

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/filter-products", {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error, "while filtering the products");
    }
  };

  return (
    <Layout title={"All Products"}>
      <div className="row w-100">
        <div className="col-md-3 ">
          <div className="filter  w-25">
            <h4 className="text-start p-2">Filter By Category</h4>
            <div className="d-flex flex-column">
              <div className="row ms-3">
                {categories?.map((p) => (
                  <Checkbox
                    key={p._id}
                    onChange={(e) => handleFilter(e.target.checked, p._id)}
                  >
                    {p.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            <br />
            <h4 className="text-start p-2">Filter By Price</h4>
            <div className="d-flex flex-column">
              <div className="row ms-3">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="d-flex flex-column">
              <button
                className="pnf-btnn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                RESET FILTER
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <ProductCard p={p} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
