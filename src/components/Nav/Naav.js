import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./naav.module.scss";
import UserDropdown from "./UserDropdown";
import CartDrawer from "./CartDrawer"
import Button from "../Button/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../utils/hooks";
import { toast } from "react-toastify";

const Naav = () => {
  const [open, setOpen] = useState(false);
  const { authenticated, signOut } = useAuth();

  const menus = [
    { name: "Trang chủ", id: 1, path: "/" },
    { name: "Sản phẩm", id: 2, path: "/products" }
  ];


  const handleSignOut = () => {
    signOut();
    setOpen(false);
    toast.warning(<span>Bạn đã đăng xuất</span>, {
      autoClose: 1000,
    });
  }

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

              {authenticated && (
                <div className={`${styles.navLink} ${styles.menuLink}`}>
                  <UserDropdown />
                </div>
              )}

              {authenticated && (
                <div className={`${styles.navLink} ${styles.menuLink}`}>
                  <Button
                    size="small"
                    color="danger"
                    onClick={handleSignOut}

                  >
                    Đăng xuất
                  </Button>
                </div>
              )}
            </nav>
          </div>
          <CartDrawer />
        </div>
      </div>
    </div>
  );
};

export default Naav;
