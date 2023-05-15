import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
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
    getAllProducts();
  }, []);
  return (
    <Layout title="Products">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/products/${p.slug}`}
                className="products-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    height="251px"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <h6 className="card-title">Rs.{p.price}</h6>
                    <p className="card-text text-truncate">{p.description}</p>
                    <h6 className="card-title">{p.category.name}</h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
