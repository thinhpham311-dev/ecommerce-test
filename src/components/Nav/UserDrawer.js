import React from 'react'
import styles from "./userdropdown.module.scss"
import { useSelector } from 'react-redux';
import userNotFound from "../../assests/userNotFound.jpg";
import Drawer from 'react-modern-drawer'
import { useAuth } from '../../utils/hooks';
import Button from '../Button/Button';
import { toast } from "react-toastify";

function UserDrawer() {
    const { avatar, email, fullName } = useSelector((state) => state.auth.user)
    const [isOpen, setOpen] = React.useState(false)
    const { signOut } = useAuth();

    const toggleDrawer = () => {
        setOpen((prevState) => !prevState)
    }

    const handleSignOut = () => {
        signOut();
        setOpen(false);
        toast.warning(<span>Bạn đã đăng xuất</span>, {
            autoClose: 1000,
        });
    }

    return (
        <>
            <div className={styles.avatarWrapper} onClick={toggleDrawer}>
                <img src={avatar ?? userNotFound} className={styles.avatarImage} alt={email} />
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                size={250}
                className={styles.userDrawerWrapper}
            >
                <div className={styles.avatarWrapperImageInfo}>
                    <img src={avatar ?? userNotFound} className={styles.avatarImageInfo} alt={email} />
                </div>
                <div className={styles.avatarWrapperTextInfo}>
                    <p>  {fullName}</p>
                    <p> <span>{email}</span></p>
                </div>
                <Button color='danger' size='small' onClick={handleSignOut}>Đăng xuất</Button>
            </Drawer>
        </>
    );
}

export default UserDrawer;