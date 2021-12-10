import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SignIn";
import Dashboard from "./screens/Dashboard";

function App() {
    const text = sessionStorage.getItem("userName") === null ? "Sign In" : sessionStorage.getItem("userName")

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <a className="brand" href="/">
                            EasyShopping
                        </a>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to="/signin">{text}</NavLink>
                        <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="/product/:id" element={<ProductScreen />}></Route>
                        <Route path="/" element={<HomeScreen />} exact></Route>
                        <Route path="/signin" element={< SigninScreen />} exact></Route >
                        <Route path="/dashboard" element={< Dashboard />} exact></Route >
                    </Routes>
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
