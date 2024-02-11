import Layout from "../components/Layout/Layout";
import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";


const Categories = () => {
  const cate = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {cate.map((c) => (
           <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" id={c._id}>
             <Link to={`/category/${c.slug}`} className="btn btn-dark">
              {c.name}
            </Link>
           </div>
       ))} 
        </div>
      </div>
    </Layout>
  )
}

export default Categories
