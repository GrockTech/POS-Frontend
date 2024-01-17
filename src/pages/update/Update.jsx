import React, { useState } from "react";
import "./Update.css";

import { useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";

const Update = () => {
 
  const navigate = useNavigate();
  const { data, error, loading } = useFetch(
    `http://localhost:8000/api/newproduct/products`
  );

  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const handleEdit =  async (e) => {
    e.preventDefault()

      const title = e.target[0].value 
      if(title){
        console.log(title, "there is an id")
        const response = [...title]
        console.log(response, "i want the array")
      }else{
        console.log("there is no ID")
      }
    

      // i take -Id from selectd item 
    const {_id} = [...title]
    
    console.log(_id)
    try {
      // we are fetchitg data base on its id 
      const res = await fetch(`http://localhost:8080/api/newproduct/productone/${_id}`)
   
      if (!response.ok) {
        console.log("Error fetching task data");
        return;
      }
   const product = await res.json()
   console.log(product)
   
    } catch (error) {
      console.log(error, "error message....")
      
    }

  
  };

  const selectITem = data.map((item) => {
    return (
      <option key={item.id} value={item.title}>
        {item.title}
      </option>
    );
  });

  return (
    <div className="container-update">
      <form className="form--control" onSubmit={handleEdit}>
        <h2>Update Product</h2> <p></p>
        <label for="product">Select the product:</label>
        <select name="product" id="product">
          {selectITem}
        </select>
        <br />
        <label htmlFor="Price">New Price</label>
        <input
          className="input-field"
          type="text"
          placeholder="Price"
          id="Price"
        />
        <label htmlFor="Quantity">Quantity</label>
        <input
          className="input-field"
          type="text"
          placeholder="Quantity"
          id="Quantity"
        />
        <p></p>
        <button type="submit" className="btnSubmit">
          <strong>Update Product</strong>
        </button>
      </form>
    </div>
  );
};

export default Update;
