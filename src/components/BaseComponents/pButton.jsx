import PropTypes from "prop-types";
import styles from "./PButton.module.scss";

const PButton = ({ name, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {name}
        </button>
    );
};

PButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default PButton;
