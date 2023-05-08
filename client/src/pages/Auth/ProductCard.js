import React from "react";
import "../../styles/ProductStyle.css";
import { MdFavorite } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";

const ProductCard = ({ p }) => {
  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={`/api/v1/products/product-photo/${p._id}`} alt={p.name} />
      </div>
      <div className="product-details">
        <span className="product-catagory">{p.name}</span>

        <div className="product-bottom-details">
          <div className="product-price">${p.price}</div>
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
    </div>
  );
};

export default ProductCard;
