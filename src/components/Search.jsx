import axios from 'axios'
import React, { useEffect, useState } from 'react'
import filterCategoriesThunk from '../store/slices/products.slice'
import {  Button  } from "react-bootstrap";

const Search = () => {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [listProducts, setListProducts] = useState([])

    const getProductsById = () =>{
        axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
        .then(resp =>{
            setProducts(resp.data.data.products)
            setListProducts(resp.data.data.products)
        })
        .catch(error => console.error(error))
    }
    
    useEffect(() =>{
        getProductsById();
    },[])

    const handleChange = e =>{
        setSearch(e.target.value)
        console.log("search: "+ e.target.value)
    }

    
   

  return (
    <div className='container-input'>
        <input 
        type="text" 
        name="" 
        id="" 
        value={search}
        onChange={handleChange}
        />
        <Button
        onChange={handleChange}
        >
            Search

        </Button>
        
    </div>
  )
}

export default Search