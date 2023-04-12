import React, { useState } from 'react';
import Main from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [status, setStatus] = useState(false);
  return (
    <>
      <Header stat={status} setStat={setStatus} />
      <Main stat={status} setStat={setStatus} />
      <Footer />
    </>
  );
}

export default App;
