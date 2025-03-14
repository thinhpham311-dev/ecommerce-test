import "./App.scss";
import Naav from "./components/Nav/Naav";
import Home from "./pages/Home/Home";
import Products from "./pages/Product/Products";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut"
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import 'react-modern-drawer/dist/index.css'

import { ToastContainer } from "react-toastify";
import mockServer from './mock'
import { useAuth } from "./utils/hooks";


const environment = process.env.NODE_ENV

// if (environment !== 'production' && appConfig.enableMock) {
//   mockServer({ environment })
// }

mockServer({ environment })

function App() {
  const { authenticated } = useAuth()
  return (
    <div className="App">
      <Naav />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Detail />} />
          {!authenticated && <Route path="/login" element={<Login />} />}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" />
      <ToastContainer />
    </div>
  );
}

export default App;
