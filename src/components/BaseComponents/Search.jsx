import { useState } from "react";
import axios from "axios"; // для запитів до беку
import styles from "./Search.module.scss";

const Search = () => {
    const [query, setQuery] = useState(""); // зберігаємо введене значення
    const [isFocused, setIsFocused] = useState(false); // флаг для фокусу на input

    const handleInputChange = (e) => {
        setQuery(e.target.value); // оновлюємо запит
    };

    const handleSearch = async () => {
        if (query.trim() === "") return;
        try {
            const response = await axios.get(`/search?query=${query}`); // запит на сервер
            console.log(response.data);
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    return (
        <div className={styles.search}>
            <span className={styles.icon}>🔍</span>
            <input
                id="search-field"
                className={styles.input}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)} // коли поле в фокусі
                onBlur={() => setIsFocused(false)} // коли поле втрачає фокус
                placeholder="Натисніть для пошуку"
            />
            {isFocused && query.length > 0 && (
                <button className={styles.searchButton} onClick={handleSearch}>
                    Шукати
                </button>
            )}
        </div>
    );
};

export default Search;
