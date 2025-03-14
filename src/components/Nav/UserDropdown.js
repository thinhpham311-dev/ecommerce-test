
import styles from "./userdropdown.module.scss"
import { useSelector } from 'react-redux';
import userNotFound from "../../assests/userNotFound.jpg";

function UserDropdown() {
    const { avatar, email } = useSelector((state) => state.auth.user)

    return (
        <div className={styles.avatarWrapper}>
            <img src={avatar ?? userNotFound} className={styles.avatarImage} alt={email} />
        </div>
    );
}

export default UserDropdown;