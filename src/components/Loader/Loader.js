import React from "react";
import loaderFill from "../../assests/loader-fill.svg";
import loaderIcon from "../../assests/loader-icon.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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

const LoaderImage = (props) => {
  return (
    <LazyLoadImage
      className={props.className}
      effect="blur"
      alt={props.alt}
      style={props.styles}
      src={props.src} />
  )
}

export { Loader, LoaderIcon, LoaderImage };
