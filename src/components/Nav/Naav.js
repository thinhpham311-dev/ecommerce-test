import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./naav.module.scss";
import UserDrawer from "./UserDrawer";
import CartDrawer from "./CartDrawer"
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../utils/hooks";

const Naav = () => {
  const [open, setOpen] = useState(false);
  const { authenticated } = useAuth();

  const menus = [
    { name: "Trang chủ", id: 1, path: "/" },
    { name: "Sản phẩm", id: 2, path: "/products" }
  ];

  return (
    <div className={styles.navBar}>
      <div className="container">
        <div className={styles.navBarContext}>
          <div className={styles.navBarBrand}>
            <Link to="/" className={styles.navLink}>
              Bài test Commerce
            </Link>
          </div>
          <button className={styles.toggleBtn} type="button" onClick={() => setOpen(!open)}>
            <GiHamburgerMenu />
          </button>

          <div className={`${styles.navBarCollapse} ${open ? styles.open : ""}`}>
            <nav className={styles.navBarCollapseContext}>
              {menus.map((menu) => (
                <Link
                  to={menu.path}
                  key={menu.id}
                  className={`${styles.navLink} ${styles.menuLink}`}
                  onClick={() => setOpen(false)}
                >
                  {menu.name}
                </Link>
              ))}



              {!authenticated && (
                <Link
                  to="/login"
                  className={`${styles.navLink} ${styles.menuLink}`}
                  onClick={() => setOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </nav>
          </div>
          <div className={styles.navLink}>
            <CartDrawer />
            {authenticated && (
              <UserDrawer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Naav;
