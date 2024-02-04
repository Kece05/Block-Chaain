import React from 'react';
import TopBanner from "../components/WalletDash/walletTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import '../components/Home/Home.css'; 
import Dashboard from '../components/BlockDash/dashboard';

const BlockDash: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>
      <Dashboard/>
      <header className="bannerheader">
        <a className="bannerA">
          <BottomBanner/>
        </a>
      </header>
    </div>
  );
}

export default BlockDash;
