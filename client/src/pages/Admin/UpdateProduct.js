import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");
  const [shipping, setShipping] = useState("");
  const params = useParams();

  // form Update handle
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/products/update-products/${id}`,
        productData
      );
      if (data?.success) {
        navigate("/dashboard/admin/products");
        toast.success("Product successfully Update");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong during posting product on server");
    }
  };
  // get single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-products/${params.slug}`
      );
      if (data.success) {
        setName(data.product.name);
        setDescription(data.product.description);
        setPhoto(data.product.photo);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setCategory(data.product.category._id);
        setId(data.product._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);
  // get all category
  const getCategory = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data?.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong during updataing Product");
    }
  };
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line
  }, []);

  // Delete Product

  const handleDelete = async () => {
    try {
      const answer = window.prompt("Are you sure want to Delete?");
      if (!answer) return;
      await axios.delete(`/api/v1/products/delete-product/${id}`);
      toast.success(`product ${name} delete successfully`);
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title="Dashboard-Create Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>Update Product</h1>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  placeholder="select a category"
                  size="large"
                  className="form-select mb-3"
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                      hidden
                    />
                  </label>
                  <div className="mb-3">
                    {photo ? (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <img
                          src={`/api/v1/products/product-photo/${id}`}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="write a name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="write a description"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="write a price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="write quantity of product"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <Select
                      size="large"
                      showSearch
                      bordered={false}
                      className="form-control"
                      placeholder="select shipping"
                      onChange={(value) => setShipping(value)}
                      value={shipping ? "Yess" : "No"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      UPDATE PRODUCT
                    </button>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-danger" onClick={handleDelete}>
                      DELETE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
