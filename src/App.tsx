import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import i18n from './i18n';
import useLocalStorage from './hooks/uselocalStorage';
import Home from './components/Home/Home';
import { Context } from './languageContext';
import Wallet from './components/Wallet/Authorisation/CreateWallet';

function App() {
  const [language, setLanguage] = useLocalStorage('language', 'ru');
  return (
    <Context.Provider value={{ language: language, setLanguage: setLanguage }}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/AIO-Wallet" element={<Wallet />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
