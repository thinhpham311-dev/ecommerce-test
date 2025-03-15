import React from "react";
import loaderFill from "../../assests/loader-fill.svg";
import loaderIcon from "../../assests/loader-icon.svg";

import styles from "./loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <img src={loaderFill} alt="loading" />
    </div>
  );
};

const LoaderIcon = () => {
  return (
    <img className={styles.loaderIcon} src={loaderIcon} alt="loading" />
  );
};

export { Loader, LoaderIcon };
