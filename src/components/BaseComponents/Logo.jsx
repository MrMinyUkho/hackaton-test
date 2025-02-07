import PropTypes from "prop-types";
import styles from "./Logo.module.scss";

const Logo = ({ onClick }) => {
    return (
        <button className={styles.logo} onClick={onClick}>
            <img src="/Crutch.svg" alt="Логотип" />
        </button>
    );
};

Logo.propTypes = {
    onClick: PropTypes.func.isRequired, // Функція для переходу на головну
};

export default Logo;
