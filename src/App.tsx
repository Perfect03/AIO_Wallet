import React, { useState } from 'react';
import Main from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from './i18n';
import useLocalStorage from './hooks/use-localStorage';

function App() {
  const [status, setStatus] = useState(false);
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <>
      <Header stat={status} setStat={setStatus} lang={language} setLanguage={setLanguage} />
      <Main stat={status} setStat={setStatus} lang={language} />
      <Footer />
    </>
  );
}

export default App;
