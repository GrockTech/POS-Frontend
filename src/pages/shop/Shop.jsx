import React, { useEffect, useState } from "react";
import "./Shop.css";
import { IoIosSearch, IoMdCodeWorking } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtoPurchase } from "../../redux/counter";
import useFetch from "../../hook/useFetch";

const Shop = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { data, error, loading } = useFetch(
    `http://localhost:8000/api/newproduct/products?search=${search}`
  );
  console.log(data);

  const [cardID, setCardID] = useState([]);
  const [cartData, setcartData] = useState([]);
  // const [quantity, setQuantity] = useState(1)
  const [grandTotal, setgrandTotal] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
// record to display on every page 
  const recordPerpage = 6;
  
  const lastIndex = currentPage * recordPerpage;
  const firstIndex = lastIndex - recordPerpage;

  const records = data.slice(firstIndex, lastIndex);
  const npages = Math.ceil(data.length / recordPerpage);

  const numbers = [...Array(npages + 1).keys()].slice(1);

  useEffect(() => {
    const priceList = [cartData];
    const entries = Object.entries(priceList);

    entries.forEach(([key, value]) => {
      console.log(key, "keys ");
      let total = 0;
      value.forEach((item) => {
        total += item.price * item.quantity;
        return total;
      });
      console.log(total);

      setgrandTotal(total);
    });
  }, [cartData]);

  const handlePay = (_id) => {
    const existingItem = cartData.find((item) => item._id === _id);

    if (existingItem) {
      existingItem.quantity += 1;
      setcartData([...cartData]); // Update the cartData state to trigger a re-render
    } else {
      const newItem = data.find((item) => item._id === _id);
      if (newItem) {
        newItem.quantity = 1;
        setcartData([...cartData, newItem]); // Add the new item to the cartData array
      }
    }
  };

  const handleDelete = (_id) => {
    // const res = cartData.filter((item) => item.id != id);
    setcartData(cartData.filter((item) => item._id !== _id));

    // console.log(res, "delete ");
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSelectedOption(value);
  };

  const Purchase = async (e) => {
    e.preventDefault();


    try {
      for (const data of cartData) {
        console.log(data, "catch data here");

        

        const { _id, title, price, quantity } = data;
        console.log(title, "sure come ");

        const res = await fetch(
          "http://localhost:8000/api/newproduct/purchased",
          {
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              productID: _id,
              title,
              price,
              quantity,
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
        } else {
          console.log(" items not delivered");
        }
      }
      setcartData([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
  };
  function Prev() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function Next() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  function Change(id) {
    setCurrentPage(id);
  }

  return (
    <div className="Container">
      <h2>Shop</h2>

      <div className="topSide">
        <div className="search">
          <div className="iconSearch">
            <IoIosSearch className="searchI" />
          </div>

          <input
            type="search"
            placeholder="search item......."
            className="input--field"
            onChange={handleChange}
            value={search}
          />
        </div>
        <div className="selectCat">
          <label htmlFor="mySelect">Select Category:</label>
          <select
            id="mySelect"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="Mixture">Mixture</option>
            <option value="Blood Tonic">Blood Tonic</option>
            <option value="Capsule">Capsule</option>
            <option value="Cream">Cream</option>
            <option value="Others">Others</option>
          </select>
          <p>
            Selected option : <em>{selectedOption}</em>{" "}
          </p>
        </div>
      </div>
      <hr />
      <hr />

      <div className="bottomSide">
        <div className="right">
          {records?.map((item, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handlePay(item._id)}
            >
              <div className="imgContainer">
                <img className="item-img" src={item.pImage} alt="" />
              </div>

              <div className="details">
                <h4 className="item--title">{item.title}</h4>

                <span className="item-price">Price:{"GH¢" + item.price}</span>

                <span className="desc">
                  {" "}
                  {/* <strong>Descrption:</strong> {item.description} */}
                </span>
              </div>
            </div>
          ))}
        </div>
        <nav className="numberContainer">
          <ul className="pagination">
            <li className="pageItem">
              <a href="#" onClick={Prev}>
                Prev
              </a>
            </li>
            {numbers.map((number, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => Change(number)}
                  className={`pageItem ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  {number}
                </a>
              </li>
            ))}
            <li className="pageItem">
              <a href="#" onClick={Next}>
                Next
              </a>
            </li>
          </ul>
        </nav>
        <div className="left">
          <div className="cart">
            <h2>Items in your Cart</h2>
            <table>
              <tr>
                <th>Qty.</th>
                <th>Item</th>
                <th>Cost</th>
                <th>Sub Total </th>
                <th>Action </th>
              </tr>

              {cartData.map((item, _id) => (
                <tr key={_id}>
                  <td>{item.quantity}</td>
                  <td>{item && item.title}</td>

                  <td>GH¢ {item.price}</td>
                  <td> {"GH¢" + " " + item.quantity * item.price}</td>
                  <td>
                    <span onClick={() => handleDelete(item._id)}>
                      <BsTrash style={{ color: "crimson" }} />
                    </span>
                  </td>
                </tr>
              ))}
            </table>
            <span className="totalPrice">
              <strong>Grand Total:{"GH¢" + " " + grandTotal + ".00"}</strong>
            </span>

            <button onClick={Purchase} className="btnPay">
              Buy
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
