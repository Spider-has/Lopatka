import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { MainPage } from './pages/News/News';
import { MonumentsPage } from './pages/Monuments/Monuments';
import { PeoplePage } from './pages/Peoples/People';
import { NewPage } from './pages/New/NewPage';
import { NewCreation } from './pages/NewCreationEdit/NewCreation';
import { NewEdit } from './pages/NewCreationEdit/NewEdit';
import { MonumentCreation } from './pages/MonumentsCreationEdit/MonumentsCreation';
import { MonumentPage } from './pages/Monument/Monument';
import { MonumentEdit } from './pages/MonumentsCreationEdit/MonumentsEdit';
import { PeopleArticleCreation } from './pages/PeopleArticleEdit/PeopleArticleCreation';
import { PeopleArticleEdit } from './pages/PeopleArticleEdit/PeopleArticleEdit';
import { PeopleArticlePage } from './pages/PeopleArticle/PeopleArticle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<LoginPage />} />

        <Route path="/news/*" index element={<MainPage />} />
        <Route path="/new/:id" index element={<NewPage />} />
        <Route path="/newedit/:id" index element={<NewEdit />} />
        <Route path="/newCreation" index element={<NewCreation />} />

        <Route path="/monuments/*" index element={<MonumentsPage />} />
        <Route path="/monument/:id" index element={<MonumentPage />} />
        <Route path="/monumentCreation" index element={<MonumentCreation />} />
        <Route path="/monumentEdit/:id" index element={<MonumentEdit />} />

        <Route path="/peoples/*" index element={<PeoplePage />} />
        <Route path="/people/:id" index element={<PeopleArticlePage />} />
        <Route path="/peopleArticleCreation" index element={<PeopleArticleCreation />} />
        <Route path="/peopleArticleEdit/:id" index element={<PeopleArticleEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
