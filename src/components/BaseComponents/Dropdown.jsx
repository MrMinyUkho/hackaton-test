import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ options, routes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleSelect = (route) => {
        navigate(route); // Переходимо на вказану сторінку
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropdown__button} onClick={() => setIsOpen(!isOpen)}>
                Виберіть
            </button>
            {isOpen && (
                <ul className={`${styles.dropdown__menu} ${isOpen ? styles.open : ""}`}>
                    {options.map((option, index) => (
                        <li key={index} className={styles.dropdown__item} onClick={() => handleSelect(routes[index])}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired, // Список назв пунктів
    routes: PropTypes.arrayOf(PropTypes.string).isRequired // Відповідні маршрути для переходу
};

export default Dropdown;
