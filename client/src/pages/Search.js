import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Products"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Products</h1>
          <h6>
            {value?.result.length < 1
              ? "No result found"
              : `Found ${value?.result.length}`}
          </h6>
        </div>
        <div className="d-flex flex-wrap mt-4">
          {value?.result.map((p) => (
            <div className="product-card">
              <div className="product-tumb">
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                />
              </div>
              <div className="product-details">
                <span className="product-name">{p.name}</span>
                <span className="product-catagory">{p.category.name}</span>

                <div className="product-bottom-details">
                  <div className="product-price">${p.price}</div>
                  <div className="btnn">
                    <Link to={`/product/${p.slug}`} className="pnf-btnn ">
                      More Details.
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
