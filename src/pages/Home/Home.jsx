import React from "react";
import ProductSlider from "../../components/Slider/ProductSlider";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className="container">
        <ProductSlider />
      </div>
    </div>
  );
};

export default Home;
