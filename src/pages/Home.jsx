import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk, filterCategoriesThunk} from "../store/slices/products.slice";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [inputName, setInputName] = useState("");
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((resp) => setCategories(resp.data.data.categories))
      .catch((error) => console.error(error));
  }, []);

  useEffect( () => {
    setDataProducts(products)
  },[products])


  const handleSearch = (e) => {
    e.preventDefault()
    setInputName(e.target[0].value)
  }

  const filterByName = () => {
    const productsFiltered = products.filter(products => products.title.toLowerCase().includes(inputName));
    
    setDataProducts(productsFiltered);
}

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={(e) => handleSearch(e)}>
        <label htmlFor="">
          Filter By productName
        </label>
        <input 
        type="text" 
        id="product"
        placeholder="Search"
        />
        <button 
        onClick={filterByName} 
        type="submit">Search</button>
      </form>
      {categories?.map((category) => (
        <Button
          className="m-1"
          key={category.name}
          variant="primary"
          onClick={() => dispatch(filterCategoriesThunk(category.id))}
        >
          {category.name}
        </Button>
      ))}
      <Button 
      className="m-2" 
      variant="primary" 
      onClick={() => dispatch(getProductsThunk())}>
        Ver todos
      </Button>
      <Row xs={1} md={2} lg={3}>
        {dataProducts?.map((productsItem) => (
          <Col key={productsItem.id}>
            <Card style={{padding: 20}} className="m-2">
              <div className="container-img">
              <Card.Img 

                variant=""
                src={productsItem.productImgs[1]}
                style={{ height: 200, objectFit:"contain" }}
              />
              <img className="container-cover-img" 
              src={productsItem.productImgs[0]} 
              alt=""
              style={{ height: 200, objectFit:"contain" }}
               />
              </div>
              <Card.Body>
                <Card.Title>{productsItem.title}</Card.Title>
                <Card.Text>Price ${productsItem.price}</Card.Text>
                <Button variant="primary" as={Link} to={`/products/${productsItem.id}`}>
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
