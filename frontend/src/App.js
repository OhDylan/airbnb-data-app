import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from "./pages/LandingPage/LandingPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import "./App.css";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/searchproperty" exact element={<SearchPage/>} />
                    <Route path="/" exact element={<LandingPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;