// App.jsx
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';

function App() {
    return (
        <div>
            <h1>Welcome to the Application</h1>
            {/* Рендеринг компонентов */}
            <Login />
            <Register />
        </div>
    );
}

export default App;