import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { MainPage } from './pages/News/News';
import { MonumentsPage } from './pages/Monuments/Monuments';
import { PeoplePage } from './pages/People/People';
import { NewPage } from './pages/New/NewPage';
import { NewCreation } from './pages/NewCreationEdit/NewCreation';
import { NewEdit } from './pages/NewCreationEdit/NewEdit';
import { MonumentCreation } from './pages/MonumentsCreationEdit/MonumentsCreation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/news/*" index element={<MainPage />} />
        <Route path="/monuments" index element={<MonumentsPage />} />
        <Route path="/people" index element={<PeoplePage />} />
        <Route path="/new/:id" index element={<NewPage />} />
        <Route path="/newCreation" index element={<NewCreation />} />
        <Route path="/monumentCreation" index element={<MonumentCreation />} />
        <Route path="/monumentEdit/:id" index element={<MonumentCreation />} />
        <Route path="/newedit/:id" index element={<NewEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
