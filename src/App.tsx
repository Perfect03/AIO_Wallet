import React from 'react';
import Main from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
