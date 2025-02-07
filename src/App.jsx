import "./App.scss";
import "./scss/main.scss";
import Dropdown from "./components/BaseComponents/Dropdown";

const App = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Выберите опцию:</h1>
            <Dropdown
                options={["Выберите", "Опция 1", "Опция 2", "Опция 3"]}
                onSelect={(value) => console.log("Вы выбрали:", value)}
            />
        </div>
    );
};

export default App;
