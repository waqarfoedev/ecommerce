import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-products/${params.slug}`
      );

      setProduct(data?.product);
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
            Category: <span></span> | Stock:
            {product.quantity}
            <br />
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
