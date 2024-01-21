import Layout from "../components/Layout/Layout";
import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories?.map((c) => {
            <h3 style={{ color: "black" }} className="btn btn-primary">
              {c.name}
              {console.log(c.name)}
            </h3>;
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
