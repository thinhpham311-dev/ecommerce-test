import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Slider from "react-slick";
import { Loader } from "../Loader/Loader";
import ProductCardGridItem from "../ProductCard/ProductCardGridItem";

import { STATUS } from "../../constants/Status";
import { fetchProducts } from "../../redux/features/Product/dataSlice";


const ProductSlider = () => {


  const dispatch = useDispatch()

  const { products, status } = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(fetchProducts({ search: "" }));
  }, [dispatch]);

  if (status === STATUS.LOADING) {
    return <Loader />;
  }

  if (status !== STATUS.LOADING && status === STATUS.ERROR) {
    return <h2>{status}</h2>;
  }


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    className: "slider",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <>
      <Slider {...settings}>
        {products?.map((product) => {
          return <ProductCardGridItem product={product} key={product.product_id} />
        })}
      </Slider>
    </>

  );
};

export default React.memo(ProductSlider);
