import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio, Slider } from "antd";
import { Prices } from "../components/Layout/Prices";
// import ProductCard from "./Auth/ProductCard";
import { MdFavorite } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    getTotal();
    // eslint-disable-next-line
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong during getting all products");
    }
  };
  //======= Pagination ================

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
          <div className="filter">
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
              <div className="product-card">
                <div className="product-tumb">
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="middle">
                    <div className="product-links">
                      <a href="#">
                        <MdFavorite size={35} />
                      </a>
                      <a href="#">
                        <IoCartSharp size={35} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="product-details">
                  <span className="product-name">{p.name}</span>
                  <span className="product-catagory">{p.category.name}</span>

                  <div className="product-bottom-details">
                    <div className="product-price">${p.price}</div>
                    <div className="btnn">
                      <Link className="pnf-btnn ">More Details.</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-2">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
