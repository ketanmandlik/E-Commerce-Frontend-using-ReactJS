/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "../ReusableComponents/Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    console.log(products);
    return (
      <div>
        <h2>This section loads product</h2>
        {products.map((product, index) => (
          <div>
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addToCart={false}
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2 className="text-white">This section is for Products</h2>
      </div>
    );
  };

  console.log(products);

  return (
    <Base title="Cart Page" description="Ready to CkeckOut">
      <div className="row">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
