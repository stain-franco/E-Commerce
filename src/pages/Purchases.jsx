import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "../helpers/getConfig";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import Table from 'react-bootstrap/Table';

export const Purchases = () => {

  const [purchases, setPurchases] = useState([])
  const dispatch = useDispatch();



  useEffect( () =>{
    dispatch(setIsLoading(true));
    axios
    .get("https://e-commerce-backend-uunu.onrender.com/purchases", getConfig())
    .then(resp => setPurchases(resp.data))
    .finally(() => dispatch(setIsLoading(false)));
  },[])
console.log(purchases)
  return (
    <div>
        <h1>Purchases</h1>
        {
          purchases.length > 0 ?

          purchases.map (purchase => (  

            
              <div key={purchase.title} className="container-purchases">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>total</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{purchase.quantity}</td>
                      <td>{purchase?.product?.title}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )
          ) :
          <h2>No hay compras realizadas</h2>
        }
    </div>
  )
}

export default Purchases;
