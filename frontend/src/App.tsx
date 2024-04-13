import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { MainPage } from './pages/News/News';
import { MonumentsPage } from './pages/Monuments/Monuments';
import { PeoplePage } from './pages/People/People';
import { ArticlePage } from './pages/Article/ArticlePage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" index element={<LoginPage />} />
                <Route path="/news" index element={<MainPage />} />
                <Route path="/monuments" index element={<MonumentsPage />} />
                <Route path="/people" index element={<PeoplePage />} />
                <Route path="/article" index element={<ArticlePage />} />
            </Routes>
        </BrowserRouter>)
}

export default App;
