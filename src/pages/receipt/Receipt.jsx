import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./receipt.css";
import { deleteRceipt } from "../../redux/counter";

import  { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// import { ComponentToPrint } from './ComponentToPrint';

const Receipt = () => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const location = useLocation();
  const receiptData = useSelector((state) => state.bought.receipt);



  const myData = [];
 
  myData.push(receiptData);

  console.log(myData, " here should be able to map");

  const dispatch = useDispatch();

 

  const tbdata = myData.map((item, index) => {
    return (
      <div key={index} id="tbody">
        
        <span>{item[0]["_id"]}</span>
        <span>{item[0].name}</span>
        <span>{item[0]["price"]}.00</span>
        <span>{item[0]["quantity"]}</span>
        <span>{item[0]["grandTotal"]}.00</span>

        <span>{item[0]["date"]}</span>
      </div>
    );
  });
  return (
    <>
    
    <div className="receiptContainer" ref={componentRef}>
      <h2 color="orangered">SCAB PHARMACY </h2>

      <h3>Official Receipt</h3>
      <div className="wrapper">
        <div className="tableHeader">
          <span>Product ID: </span>
          <span>Name: </span>
          <span>Price: </span>
          <span>Quantity: </span>
          <span>Total Cost: </span>
          <span>Date of purchased: </span>
        </div>
        <div className="tableBody" >{tbdata}</div>
       
        
      </div>
      <div className="btnPrint">
        <p></p>
          <button className="receiptButton" onClick={handlePrint}>Print</button>
        </div>
    </div>
    
    </>
  );
};

export default Receipt;
