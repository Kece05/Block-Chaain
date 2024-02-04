import React from 'react';
import TopBanner from "../components/TransferToken/TTBTOW";
import BottomBanner from "../components/Home/HomeBBanner";
import '../components/Home/Home.css'; 
import TransferBTOW from '../components/TransferToken/TransferBTOW';

const BTOW: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>

      <TransferBTOW/>

      <header className="bannerheader">
        <a className="bannerA">
          <BottomBanner/>
        </a>
      </header>
    </div>
  );
}

export default BTOW;