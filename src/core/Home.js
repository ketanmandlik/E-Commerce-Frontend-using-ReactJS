import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "../ReusableComponents/Card";
import { getProducts } from "./helper/coreapicalls";

function Home() {
  //console.log("API IS", API);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log(data);
          setError(false);
          setProducts(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to the T-Shirt Store">
      <div className="row">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
