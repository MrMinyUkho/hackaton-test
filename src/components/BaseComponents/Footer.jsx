// src/components/Footer/Footer.jsx
import React, { useState } from "react";
import "./Footer.module.scss";

const Footer = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <footer className="footer">
            <div className="footer__text">© 2025 Всі права захищені</div>
            <div className="footer__dev">Розроблено командою The Crutch Coders (TCC)</div>
            <div className="footer__social">
                <a href="https://github.com/MrMinyUkho/hackaton-test" target="_blank" rel="noopener noreferrer">
                    <img src="github.svg" alt="GitHub" />
                </a>
            </div>

        </footer>
    );
};

export default Footer;
