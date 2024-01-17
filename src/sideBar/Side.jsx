import React from "react";
import "./Side.css";
// import Link from "react-router-dom";
// import Link from 'react-router-dom'
import {GrUserAdmin} from "react-icons/gr"
// import {FaCartShopping} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BiPurchaseTag} from "react-icons/bi"
import {CiSettings} from "react-icons/ci"
import {RiAdminLine} from "react-icons/ri"
import {AiOutlineTransaction} from "react-icons/ai"
// import {GrTransaction} from "react-icons/gr"
import {MdSupervisorAccount, MdPersonAddAlt } from "react-icons/md"
import {TbTruckDelivery} from 'react-icons/tb'
import {VscAccount} from "react-icons/vsc"
import {SiExpertsexchange } from "react-icons/si"

const Side = () => {
const links = [
  {
    id: 1,
    href: "Admin",
    icon: <RiAdminLine/>,
    to: "/"
  },
  {
    id: 2,
    href: "Shop",
    icon: <AiOutlineShoppingCart/>,
    to: "/store"
  },
  {
    id: 3,
    href: "Transactions",
    icon: <BiPurchaseTag/>,
    to: "/orders"
  },

  {
    id: 4,
    href: "Customers",
    icon: <MdPersonAddAlt/>,
    to: ""
  },
  {
    id: 5,
    href: "Suppliers",
    icon: <TbTruckDelivery/>,
    to: ""
  },
  {
    id: 6,
    href: "Settings",
    icon: <CiSettings/>,
    to: ""
  },
]

  return (
    <div className="mainContainer">
      
      <div className="topBar">
      <div className="logoWrapper">
     
       <SiExpertsexchange style={{fontSize: "32px", color: "orangered"}}/>
        <span>Pos</span>
        {/* <GrTransaction style={{color: "red"}}/> */}
      </div>
      <div className="userAccount">
    <span>ootiarhin@gmail.com</span>
    <VscAccount style={{fontSize: "32px", color:"#fff"} }/>
    {/* <MdSupervisorAccount style={{fontSize: "50px", color: "#fff"} } /> */}

      </div>
      </div>
    
      <div className="linkContainer">
        {links.map((item) =>(
        <div className="linkWrapper" key={item.id}>
          <div className="icon">
          {item.icon}
          </div>
          <a href={item.to}>{item.href}</a>
        </div>

          ))}
      </div>
    </div>
  );
};

export default Side;
