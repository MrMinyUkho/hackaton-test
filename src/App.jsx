// src/App.jsx
import "./App.scss";
import "./scss/main.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LimitedContainer from "./components/LimitedContainer";
import Footer from "./components/BaseComponents/Footer";

const App = () => {
    return (
        <Router>
            <LimitedContainer>
                <Header />
                <div className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="home-page">
                                    <h1 className="home-page__title">
                                        Дякуємо, що завітали до нас на сайт створення та проходження квестів!
                                    </h1>
                                </div>
                            }
                        />
                        <Route path="/create-quest" element={<div>Сторінка створення квесту</div>} />
                    </Routes>
                </div>
                <Footer />
            </LimitedContainer>
        </Router>

    );
};

export default App;
