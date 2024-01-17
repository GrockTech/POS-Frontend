import React, { useEffect, useState } from "react";
import "./Admin.css";
import { BsCart4 } from "react-icons/bs";
import { GrCurrency } from "react-icons/gr";
import { BsCartX } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import useFetch from "../../hook/useFetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Admin = () => {
  const [prevImage, setPreImage] = useState(null);
  const [uploadImage, setUpload] = useState("");
  const [uploadedUrl, setUploadurl] = useState(null);
  const [outStock, setLstock] = useState([]);

  // state monitoring edit
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    quantity: "",
    _id: null,
  });

  const [productId, setProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const receiptData = useSelector((state) => state.bought.receipt);

  const { data, error, loading, reFetch } = useFetch(
    `http://localhost:8000/api/newproduct/products`
  );
  console;

  const uploadPreset = "usxtoqfc";

  const handleUpload = async (e) => {
    setUpload(e.target.files[0]);
    setPreImage(URL.createObjectURL(e.target.files[0]));
    console.log(uploadImage, "check the data being uploaded");
  };
  // console.log(data, "products from backend");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("clicked");
    const title = e.target[0].value;
    const price = e.target[1].value;
    const quantity = e.target[2].value;
    const category = e.target[3].value;
    // const name = e.target[0].value

    let receiveURL = [];

    try {
      const image = new FormData();
      image.append("file", uploadImage);
      image.append("cloud_name", "debd3pqpv");
      image.append("upload_preset", uploadPreset);
      // }

      const res1 = await fetch(
        "https://api.cloudinary.com/v1_1/debd3pqpv/image/upload",
        {
          method: "post",
          body: image,
        }
      );

      if (res1.ok) {
        const urlData = await res1.json();
        const uploadUrl = urlData.url.toString();

        receiveURL.push(uploadUrl);

        console.log(receiveURL);

        console.log(receiveURL, "success image deliver");
      } else {
        const errorres = await res1.josn();
        console.log(errorres, "there is problem with image ");
      }

      // console.log(upl, " here is final upload string ")
      const urlString = receiveURL.toString();
      alert(urlString);
      const res = await fetch("http://localhost:8000/api/newproduct", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          quantity,
          category,
          pImage: urlString,
        }),
      });

      if (res.ok) {
        console.log(res, "there new item");
        e.target.reset();
      } else {
        console.log("there is no item");
      }
    } catch (error) {
      console.log(error, "error stacked");
    }
    setPreImage([]);
    reFetch();
  };

  const handleEdit = async (_id) => {

    console.log(_id)
    try {
      const response = await fetch(
        `http://localhost:8000/api/newproduct/productone/${_id}`
      );

      if (!response.ok) {
        console.log("error fetching ");
        return;
      }

      const productData = await response.json();

      // Set the formData state with the fetched task data
      setFormData({
        title: productData.title,
        price: productData.price,
        quantity: productData.quantity,
        id: productData._id,
      });
      console.log("fetched successfuly");

      setProductId(productData._id);
      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      // we send updated data to the particular product end point
      const res =  await fetch(
        `http://localhost:8000/api/newproduct/updateproduct/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            price: formData.price,
            quantity: formData.quantity,
          }),
        }
      );
      if(!res.ok){
        console.log(`did find ${productId}` )

      }else {
        const result  = await res.json() 
        console.log(`product updated successfuly ${result}`)
      }
      setFormData({ price: "", quantity: "", _id: null });
      setIsEditing(false);
      reFetch();
    } catch (error) {
      console.log();
    }
  };

  const handleDelete = async (_id) => {
    const del = await fetch(
      `http://localhost:8000/api/newproduct/product/${_id}`,
      {
        method: "delete",
      }
    );
    reFetch();
  };
  const datavalue = data.map((item, index) => {
    return (
      <tr key={index}>
        {/* <td>{item._id}</td> */}
        {/* <td>{item.pImage}</td> */}
        <td>{item.title}</td>
        <td>{item.price}.00</td>
        <td>{item.quantity}</td>
        <td>{item.category}</td>

        <td>
          <span
            className="deleteAdmin"
            style={{ color: "red" }}
            onClick={() => handleDelete(item._id)}
          >
            <RiDeleteBinLine size={20} color="red" />
          </span>
        </td>

        <td>
          <span
            className="EditItem"
            style={{ backgroundColor: "oragered", padding: "10px" }}
            onClick={() => handleEdit(item._id)}
          >
            {" "}
            Update
          </span>
        </td>
      </tr>
    );
  });

  let totalValue = 0;

  const CalValue = () => {
    data.forEach((item) => {
      totalValue += item.quantity * item.price;
    });
    console.log(totalValue, "consoling here in block ");
  };

  CalValue(data);

  const calBalance = (balance) => {
    const boughtItem = receiptData[0];
    const Item = data.find((item) => item.id === receiptData[0]["id"]);
    // console.log(Item.quantity - receiptData[0].quantity, " we need to substract");
    console.log(Item);
    // console.log(boughtItem.totalPrice -  balance);
  };
  calBalance();

  useEffect(() => {
    const lowStock = () => {
      const remaining = data.filter((item) => item.quantity < 2);
      if (remaining) {
        console.log(remaining);

        console.log(remaining, "here is remaining");
        setLstock(remaining);
      }
    };

    lowStock();

    console.log(outStock, " here is low item");
  }, [data]);

  console.log(outStock, " less quantity");
  const itemName = outStock.map((item, index) => {
    return <span key={index}> {item.name}</span>;
  });

  return (
    <div className="adContainer">
      <h2>Inventory Statistics</h2>
      <div className="topSection1">
        <div className="card1">
          <span>
            <BsCart4 size={48} />
          </span>
          Total Products
          <br />
          {datavalue.length}
        </div>

        <div className="card2">
          <span>
            <GrCurrency size={48} color="#fff" />
          </span>
          Total Store Value:
          <p></p>
          <strong>{"GH¢" + totalValue}</strong>
        </div>

        <div className="card3">
          <span>
            {/* <BsCart4  /> */}
            <BsCartX color="#fff" size={48} />
          </span>
          Out of Stock
          <br />
          {itemName.length}
        </div>
        <div className="card4">
          <span>
            <BsCart4 size={48} />
          </span>
          All Categories
          <br />9
        </div>
      </div>
      <div className="downSideAdmin">
        <div className="leftAdmin">
          <form
            className="form--control"
            onSubmit={isEditing ? updateTask : handleSubmit}
          >
            <h2>Add Product</h2>
            <label htmlFor="name">Name</label>
            <input
              className="input-field"
              type="text"
              placeholder="Product Name"
              id="name"
            />

            <label htmlFor="Price">Price</label>
            <input
              className="input-field"
              type="text"
              placeholder="Price"
              id="Price"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <label htmlFor="Quantity">Quantity</label>
            <input
              className="input-field"
              type="text"
              placeholder="Quantity"
              id="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />

            <label htmlFor="cat">Category</label>
            <input
              className="input-field"
              type="text"
              placeholder="Product Cat"
              id="Category"
            />
            <label htmlFor="desc">Description</label>
            <input
              className="input-field"
              type="text"
              placeholder="Product desc"
              id=""
            />

            {/*  */}
            <p></p>

            <label htmlFor="photo">Upload Product Picture</label>
            <p></p>
            <input
              type="file"
              id="photo"
              className="upload-field"
              accept="image/jpg, image/jpeg"
              onChange={handleUpload}
            />

            <button type="submit" className="btnSubmit">
              {isEditing ? "Update" : "Add Product"}
            </button>
          </form>
          <Link to="/update">
            <span>Click here to update product</span>
          </Link>

          <div className="imgPrev">
            {prevImage && (
              <div className="prevContainer">
                <img src={prevImage} alt="" className="outputImage" />
              </div>
            )}
          </div>
          {/* <button className="imageUpload" onClick={handleUpload}>
            Upload Image
          </button> */}
        </div>

        <div className="rightAdmin">
          <input type="search" id="searchInput" placeholder="search ....." />
          <h2>Inventory Items</h2>

          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>

            <th>Action</th>

            <th>Action</th>
          </tr>

          <tbody>{datavalue}</tbody>
        </div>
      </div>
    </div>
  );
};

export default Admin;
