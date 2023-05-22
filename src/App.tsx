import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from './hooks/useLocalStorage';
import Home from './components/Home/Home';
import { Context } from './languageContext';
import Wallet from './components/Wallet/Authorisation/CreateWallet';
import { Provider } from 'react-redux';
import { store } from './store';
import Presale from './components/Presale/Presale';

function App() {
  const [language, setLanguage] = useLocalStorage('language', 'ru');
  return (
    <Provider store={store}>
      <Context.Provider value={{ language: language, setLanguage: setLanguage }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/AIO-Wallet" element={<Wallet />} />
          <Route path="/presale" element={<Presale />} />
        </Routes>
      </Context.Provider>
    </Provider>
  );
}

export default App;
