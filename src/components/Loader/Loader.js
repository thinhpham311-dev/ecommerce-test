import React from "react";
import loader from "../../assests/loader.gif";
import styles from "./loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <img src={loader} alt="loading" />
    </div>
  );
};

export default Loader;
