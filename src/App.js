import "./App.scss";
import { lazy, Suspense } from "react"
import Naav from "./components/Nav/Naav";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { Loader } from "./components/Loader/Loader";

import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import 'react-modern-drawer/dist/index.css';

import { ToastContainer } from "react-toastify";
import mockServer from './mock'
import { useAuth } from "./utils/hooks";
import appConfig from "./configs/app.config"

//pages
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Product/Products"));
const Detail = lazy(() => import("./pages/Detail/Detail"));
const Cart = lazy(() => import("./pages/Cart/Cart"))
const CheckOut = lazy(() => import("./pages/CheckOut/CheckOut"))

const environment = process.env.NODE_ENV

if (environment !== 'production' && appConfig.enableMock) {
  mockServer({ environment })
}

mockServer({ environment })

function App() {
  const { authenticated } = useAuth()
  return (
    <div className="App">
      <Naav />
      <Suspense fallback={<Loader />}>
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
      </Suspense>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
