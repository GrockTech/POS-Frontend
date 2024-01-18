import React, { useState } from 'react'
import useFetch from '../../hook/useFetch';
import { IoIosSearch, IoMdCodeWorking } from "react-icons/io";

const Search = ({onSearch}) => {
  const [search, setSearch] = useState([])
 
  const { data, error, loading } = useFetch(
    `http://localhost:8000/api/newproduct/products?search=${search}`
  );

  const handleChange = (e) =>{
    e.preventDefault()
    const value = e.target.value 
    setSearch(value)

    if(onSearch){
      onSearch(value)
    }

  }
  return (
    
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


    </div>
  )
}

export default Search