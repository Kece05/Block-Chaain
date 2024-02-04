import React from 'react';
import TopBanner from "../components/createToken/TTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import '../components/Home/Home.css'; 
import AqquireTokens from '../components/BlockH/history';

const BlockHistory: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>

    <AqquireTokens/>

      <header className="bannerheader">
        <a className="bannerA">
          <BottomBanner/>
        </a>
      </header>
    </div>
  );
}

export default BlockHistory;