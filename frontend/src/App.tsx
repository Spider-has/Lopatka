import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { MainPage } from './pages/MainPage/MainPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" index element={<LoginPage />} />
                <Route path="/mainPage" index element={<MainPage />} />
            </Routes>
        </BrowserRouter>)
}

export default App;
