import React from "react";

const Productard = () => {
  return (
    <div className="container">
      <div className="overlay">
        <div className="items" />
        <div className="items head">
          <p>Flower Embroidery Hoop Art</p>
          <hr />
        </div>
        <div className="items price">
          <p className="old">$699</p>
          <p className="new">$345</p>
        </div>
        <div className="items cart">
          <i className="fa fa-shopping-cart" />
          <span>ADD TO CART</span>
        </div>
      </div>
    </div>
  );
};

export default Productard;
