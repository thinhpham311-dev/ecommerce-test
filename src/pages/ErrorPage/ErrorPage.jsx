import React from "react";
import notfound from "../../assests/notfound.png";
import styles from "./errorpage.module.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div
      className={styles.errorPage}
    >
      <img src={notfound} alt="Not found" />
      <Button size="small" onClick={() => navigate("/")} type="button">Quay về trang chủ</Button>
    </div>
  );
};

export default ErrorPage;
