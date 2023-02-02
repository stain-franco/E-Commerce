import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Purchases from "./pages/Purchases";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/Navbar";
import Container from "react-bootstrap/Container";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Search from "./components/Search";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <Loader />}
      <Search/>
      <Container className="my-4">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={ <ProtectedRoutes/> }>
            <Route path="/purchases" element={<Purchases />} />
          </Route>

        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
