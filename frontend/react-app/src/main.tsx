import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import NewPage from './pages/connectPage.tsx';
import Register from './pages/register.tsx';
import Walletdash from './pages/Walletdash.tsx';
import TransferToken from './pages/TransferToken.tsx';
import History from './pages/history.tsx';
import BlockDash from './pages/BlockDash.tsx';
import CreateToken from './pages/createToken.tsx';
import BTOW from './pages/BTOW.tsx';
import BlockHistory from './pages/BlockHistory.tsx';
import Admin from './pages/admin.tsx';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path={`/admin`} element={<Admin />} />
          <Route path={`/BlockDash/${sessionStorage.getItem("TokenB")}`} element={<BlockDash />} />
          <Route path={`/BlockDash/${sessionStorage.getItem("TokenB")}/CreateToken`} element={<CreateToken />} />
          <Route path={`/WalletDash/${sessionStorage.getItem("Token")}`} element={<Walletdash />} />
          <Route path={`/WalletDash/${sessionStorage.getItem("Token")}/history`} element={<History />} />
          <Route path={`/WalletDash/${sessionStorage.getItem("Token")}/TransferToken`} element={<TransferToken />} />
          <Route path={`/BlockDash/${sessionStorage.getItem("TokenB")}/BTransfer`} element={<BTOW />} />
          <Route path={`/BlockDash/${sessionStorage.getItem("TokenB")}/history`} element={<BlockHistory />} />
          <Route path="/connect" element={<NewPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

export default App;