import React from 'react'

import styles from "./userdropdown.module.scss"
import { useSelector } from 'react-redux';
import userNotFound from "../../assests/userNotFound.jpg";
import Drawer from 'react-modern-drawer'
import { useAuth } from '../../utils/hooks';
import Button from '../Button/Button';
import { LoaderIcon } from '../Loader/Loader';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "../../utils/hooks"
import { IoIosLogIn } from "react-icons/io";
import { LoaderImage } from '../Loader/Loader';

function UserDrawer() {
    const navigate = useNavigate()
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { avatar, email, fullName } = useSelector((state) => state.auth.user)
    const [isOpen, setOpen] = React.useState(false)
    const { signOut, authenticated, loading } = useAuth();

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

    if (loading) {
        return <LoaderIcon />;
    }

    return (
        <>
            {!authenticated && (
                <>
                    {isMobile &&
                        <div
                            className={styles.btnLoginIcon}
                            onClick={() => navigate("/login")}
                        >
                            <IoIosLogIn size={25} />
                        </div>
                    }
                    {!isMobile &&
                        <Button color='success' size='small'
                            onClick={() => navigate("/login")}
                        >
                            Đăng nhập
                        </Button>
                    }
                </>
            )}
            {authenticated && <div>
                <div className={styles.avatarWrapper} onClick={toggleDrawer}>
                    <LoaderImage src={avatar ?? userNotFound} className={styles.avatarImage} alt={email} />
                </div>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='right'
                    size={250}
                    className={styles.userDrawerWrapper}
                >
                    <div className={styles.avatarWrapperImageInfo}>
                        <LoaderImage src={avatar ?? userNotFound} className={styles.avatarImageInfo} alt={email} />
                    </div>
                    <div className={styles.avatarWrapperTextInfo}>
                        <p className="clamp-line-1 "> <strong> {fullName}</strong></p>
                        <p className="clamp-line-1 "> <span>{email}</span></p>
                    </div>
                    <Button color='danger' size='small' onClick={handleSignOut}>Đăng xuất</Button>
                </Drawer>
            </div>
            }
        </>
    );
}

export default UserDrawer;