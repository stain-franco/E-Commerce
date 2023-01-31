import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { Button, Col, Row, ListGroup } from "react-bootstrap";
import { filterCategoriesThunk } from "../store/slices/products.slice";
import Carousel from 'react-bootstrap/Carousel';
import { createCartThunk } from "../store/slices/cart.slice";

const ProductsDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  const productsRelated = useSelector(state => state.products);
  const [count, setCount] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setIsLoading(true));

    axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then((resp) => {
        setDetail(resp.data.data.product)
        dispatch(filterCategoriesThunk(resp.data.data.category?.id))
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 1500);
      })

      

  }, [id]);

  const addToPurchases = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const cart = {
        cart: detail.id,
        count: count
      };
      console.log(cart)
      dispatch(createCartThunk(cart))
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      
      
      <Row className="sliceLabel">
        
        <Col lg={9}>
        <h1>{detail.title}</h1>
      <p>{detail.description}</p>
      <p>Price ${detail.price}</p>
      
      <Button className="mb-3" onClick={addToPurchases}>
      Agregar al carrito
      </Button>
      <div>
        <Button onClick={() => setCount(count -1)}>-</Button>
         {count}
        <Button onClick={() => setCount(count +1)}>+</Button>
      </div>
          
         <Carousel 
         
         variant="dark">
      <Carousel.Item
      
      >
        <img
          className="d-block w-100"
          src={detail?.productImgs?.[0]}
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail?.productImgs?.[1]}
          alt="Second slide"
        />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail?.productImgs?.[2]}
          alt="Third slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  
        </Col>
      </Row>
      
    </div>
    
  );
};

export default ProductsDetail;
