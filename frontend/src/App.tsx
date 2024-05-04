import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { MainPage } from './pages/News/News';
import { MonumentsPage } from './pages/Monuments/Monuments';
import { PeoplePage } from './pages/People/People';
import { ArticlePage } from './pages/Article/ArticlePage';
import { ArticleCreation } from './pages/ArticleCreation/ArticleCreation';
import { EditNew } from './pages/EditNew/EditNew';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/news/*" index element={<MainPage />} />
        <Route path="/monuments" index element={<MonumentsPage />} />
        <Route path="/people" index element={<PeoplePage />} />
        <Route path="/article/:id" index element={<ArticlePage />} />
        <Route path="/articleCreation" index element={<ArticleCreation />} />
        <Route path="/editNew/:id" index element={<EditNew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
