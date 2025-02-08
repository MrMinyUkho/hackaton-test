import { useState } from "react";
import PropTypes from "prop-types"; // Импортируем PropTypes
import styles from "./Dropdown.module.scss";

const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const handleSelect = (option) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropdown__button} onClick={() => setIsOpen(!isOpen)}>
                {selected}
            </button>
            <ul className={`${styles.dropdown__menu} ${isOpen ? styles.open : ""}`}>
                {options
                    .filter((option) => option !== selected) // Убираем выбранный пункт из списка
                    .map((option, index) => (
                        <li
                            key={index}
                            className={styles.dropdown__item}
                            onClick={() => handleSelect(option)}
                        >
                            {
                                option.replace(" ", "\u00A0") // Костыль добавляющий неразрывный пробел для корректного отображения списка
                            }
                        </li>
                    ))}
            </ul>
        </div>
    );
};

Dropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired, // Массив строк (обязательный)
    onSelect: PropTypes.func.isRequired, // Функция (обязательная)
};

export default Dropdown;
