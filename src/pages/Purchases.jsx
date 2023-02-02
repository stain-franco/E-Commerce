import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "../helpers/getConfig";

export const Purchases = () => {

  const [purchases, setPurchases] = useState([])

  useEffect( () =>{
    axios
    .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
    .then(resp => setPurchases(resp.data.data.purchases))
  },[])

  return (
    <div>
        <h1>Purchases</h1>
        {
          purchases.map (item => {
            return item.cart.products.map( item => 
            <div key={item.title} className="container-purchases">
              <h4 >{item.productsInCart.quantity} {item.title}</h4> 
            
            </div>
            )
          })
        }
    </div>
  )
}

export default Purchases;