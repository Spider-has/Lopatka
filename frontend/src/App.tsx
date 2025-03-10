import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { NewsPage } from './pages/News/News';
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
import { ExcavationsPage } from './pages/Excavations/Excavations';
import { MainPage } from './pages/MainPage/MainPage';
import { Page404 } from './pages/page404/Page404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/success-creation" element={<NewsPage />} />
        <Route path="/news/success-update" element={<NewsPage />} />
        <Route path="/news/success-delete" element={<NewsPage />} />
        <Route path="/new/:id" element={<NewPage />} />
        <Route path="/newedit/:id" element={<NewEdit />} />
        <Route path="/newCreation" element={<NewCreation />} />

        <Route path="/monuments" element={<MonumentsPage />} />
        <Route path="/monuments/success-creation" element={<MonumentsPage />} />
        <Route path="/monuments/success-update" element={<MonumentsPage />} />
        <Route path="/monuments/success-delete" element={<MonumentsPage />} />
        <Route path="/monument/:id" element={<MonumentPage />} />
        <Route path="/monumentCreation" element={<MonumentCreation />} />
        <Route path="/monumentEdit/:id" element={<MonumentEdit />} />

        <Route path="/peoples" element={<PeoplePage />} />
        <Route path="/peoples/success-creation" element={<PeoplePage />} />
        <Route path="/peoples/success-update" element={<PeoplePage />} />
        <Route path="/peoples/success-delete" element={<PeoplePage />} />
        <Route path="/people/:id" element={<PeopleArticlePage />} />
        <Route path="/peopleArticleCreation" element={<PeopleArticleCreation />} />
        <Route path="/peopleArticleEdit/:id" element={<PeopleArticleEdit />} />

        <Route path="/excavations" element={<ExcavationsPage />} />

        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
