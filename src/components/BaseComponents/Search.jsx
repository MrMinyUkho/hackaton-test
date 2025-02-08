import styles from "./Search.module.scss";

const Search = () => {
    return (
        <div className={styles.search}>
            <span className={styles.icon}>🔍</span>
            <span className={styles.text}>натисніть для пошуку</span>
        </div>
    );
};

export default Search;
