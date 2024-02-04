import React from 'react';
import TopBanner from "../components/TransferToken/TTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import '../components/Home/Home.css'; 
import Transfer from '../components/TransferToken/Transfer';

const TransferToken: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>

      <Transfer/>

      <header className="bannerheader">
        <a className="bannerA">
          <BottomBanner/>
        </a>
      </header>
    </div>
  );
}

export default TransferToken;