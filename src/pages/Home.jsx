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

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((resp) => setCategories(resp.data.data.categories))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Home</h1>
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
        {products?.map((productsItem) => (
          <Col key={productsItem.id}>
            <Card className="m-2">
              <Card.Img 
                variant=""
                src={productsItem.productImgs[0]}
                style={{ height: 200, objectFit:"contain" }}
              />
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
