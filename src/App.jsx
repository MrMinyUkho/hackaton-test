import './App.scss'
import './scss/main.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<div>Головна сторінка</div>} />
                <Route path="/create-quest" element={<div>Сторінка створення квесту</div>} />
            </Routes>
        </Router>
    );
};

export default App;
