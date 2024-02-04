import React from 'react';
import TopBanner from "../components/WalletDash/walletTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import '../components/Home/Home.css'; 
import GetTokens from '../components/WalletDash/getTokens';
import '../components/WalletDash/dashboard.css'
import { useNavigate } from 'react-router-dom';

const Walletdash: React.FC = () => {
  const nav = useNavigate();

  const handleTransactionHistory = () => {
    nav(`/WalletDash/${sessionStorage.getItem("Token")}/history`);
  }

  return (
    <div>
      <header>
          <TopBanner />
      </header>

      <div className="main-content">
        <div className="token-info">
          <button className="transaction-history-button" onClick={handleTransactionHistory}>
            Transaction History
          </button>
          <h2>Your Token Information</h2>
          <GetTokens />
        </div>        
      </div>

      <footer>
        <BottomBanner />
      </footer>
    </div>
  );
}

export default Walletdash;