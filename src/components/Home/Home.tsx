import { useState } from 'react';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [status, setStatus] = useState(false);
  return (
    <>
      <Header stat={status} setStat={setStatus} />
      <Main stat={status} setStat={setStatus} />
      <Footer />
    </>
  );
}

export default Home;
