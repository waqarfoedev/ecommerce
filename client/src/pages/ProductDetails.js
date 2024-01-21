import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-products/${params.slug}`
      );

      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      console.log(data);
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout title={"Products details"}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/products/product-photo/${product._id}`}
              alt={product.name}
              width="480px"
              height="480px"
            />
          </div>
          <div className="col-md-6">
            <h1>Product Details</h1>
            <hr />
            <h5>{product.name}</h5>
            <br />
            Price:<h2>{product.price}</h2>
            <br />
            {/* Category: <span>{product.category.name}</span> <br />  */}
            Stock:
            {product.quantity}
            <br />
            <h3>Description:</h3>
            <p>{product.description}</p>
            <button className="btn pnf-btnn">ADD TO CART</button>
          </div>
        </div>
        <hr />
        <div className="row">
          <h2>Similer Products</h2>
          <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="products-link"
              >
                <div className="card m-2" style={{ width: "13.5rem" }}>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    height="199px"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <h6 className="card-title">Rs.{p.price}</h6>
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

export default ProductDetails;
