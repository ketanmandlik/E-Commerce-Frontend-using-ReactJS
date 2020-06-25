import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import Loader from "react-loader-spinner";

const AddProduct = () => {
  const [userId, setUserId] = useState("");
  console.log(userId);
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    discription: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
    success: false,
  });

  const {
    name,
    discription,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preLoad = () => {
    getCategories().then((data) => {
      console.log(data.categories);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data.categories,
          formData: new FormData(),
        });
        console.log("CATE ==>", categories);
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(userId, token, formData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          discription: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          error: false,
          createdProduct: data.name,
        });
        console.log(createdProduct);
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value); //we set formData to name and value to pass it to bckend
    setValues({ ...values, [name]: value });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <Loader
          type="Hearts"
          color="#FF3E4D"
          height={100}
          width={100}
          secondaryColor="#FF3E4D"
          //timeout={3000} //3 secs
        />
      )
    );
  };
  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created successfully!</h4>
      </div>
    );
  };

  const warningMessage = () => {
    return (
      <div
        className="alert alert-warning mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  useEffect(() => {
    var user_ID = isAuthenticated().user._id;
    console.log(user_ID);
    setUserId(user_ID);
    preLoad();
  }, []);

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("discription")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={discription}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              console.log(cate);
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
