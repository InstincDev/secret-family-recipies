import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import RecipeCard from "./components/RecipeCard/RecipeCard.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage.jsx";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";

//ToDo
// create function for getting types
// update state sliderTypes obj
// pass state sliderTypes obj to Home page

const App = ()=> {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:7575/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((res) => {
                    if (res.status === 200) return res.json();
                    throw new Error("authentication has failed");
                })
                .then((resObject) => {
                    setUser(resObject.user);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };
        getUser();
    }, []);
    
    return (
        <>
            <BrowserRouter>
            <NavBar user={user}/>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage user = {user}/>}
                    />
                    <Route
                        path="/login"
                        element={user? <Navigate to="/" /> : <LoginPage/>}
                    />
                    <Route
                        path="/recipe/:id"
                        element={user ? <RecipeCard/> : <Navigate to="/login"/>}
                    />
                    
                    <Route path="/user" element={<UserProfilePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
