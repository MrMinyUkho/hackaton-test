import { useNavigate } from "react-router-dom";
import Logo from "../BaseComponents/Logo";
import Dropdown from "../BaseComponents/Dropdown";
import Search from "../BaseComponents/Search";
import PButton from "../BaseComponents/PButton";
import styles from "./Header.module.scss";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <Logo src="/logo.png" alt="Логотип" onClick={() => navigate("/")} />
            <Dropdown
                options={["Створити тест", "Створити картинку"]}
                routes={["/create-test", "/create-image"]}
            />
            <Search />
            <PButton name="Увійти" onClick={() => navigate("/login")} />
        </header>


    );
};

export default Header;
