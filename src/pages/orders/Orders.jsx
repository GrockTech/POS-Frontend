import { Children, useState } from "react";
import "./Orders.css";
import { useDispatch, useSelector } from "react-redux";
import { addtoReceipt, deleteAll } from "../../redux/counter";
import { AiOutlinePrinter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const purchasedItems = useSelector((state) => state.bought.purchases);
  console.log(purchasedItems);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Check if purchasedItems is an array

  if (!Array.isArray(purchasedItems)) {
    return <div>No purchased items available.</div>;
  }

  const flattenedItems = [];

  // Function to flatten the nested structure
  function flattenItems(obj) {
    if (obj && obj.length) {
      obj.forEach((item) => {
        const { name, ...rest } = item;
        flattenedItems.push({ name, ...rest });
        if (rest.children) {
          flattenItems(rest.children);
        }
      });
    }
  }

  // Flatten the purchased items
  flattenItems(purchasedItems);
  console.log(flattenedItems, "new items here");

  const handleReceipt = (_id) => {
    const receipt = [];
    const itemsFound = flattenedItems.find((item) => item._id === _id);
  
    receipt.push(itemsFound);
    console.log(receipt, "receipt singel")
    for (let i = 0; i < receipt.length; i++) {
     
      const row = dispatch(addtoReceipt(receipt[i]));
      console.log(row, "we are dispatching receipt to receipt");
      // navigate({pathname: "/receipt", state: receipt[i]})
    }

     navigate("/receipt")
  };

  return (
    <div className="ordersContainer">
      <h1>Transactions History</h1>
      <table>
        <th>Receipt</th>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total Cost</th>
        <th>Date</th>
        {/* <th>
          <span onClick={()=>dispatch(deleteAll())}>
            delete 
            </span>          
        </th> */}

        {flattenedItems.map((item, index) => (
          <tr key={index}>
            <td>
              <button onClick={() => handleReceipt(item._id)}>
                <AiOutlinePrinter style={{ color: "red" }} size={18} />
              </button>
            </td>
            <td> {item.name}</td>
            <td> {item.price + ".00"}</td>
            <td> {item.quantity}</td>
            <td>
              <strong>{"GH¢" + item.grandTotal + ".00"}</strong>
            </td>

            <td> {item.date}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Orders;
