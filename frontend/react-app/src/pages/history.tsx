import React from 'react';
import TopBanner from "../components/TransferToken/TTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import '../components/Home/Home.css'; 
import GetTokens from "../components/History/getHistory"

const History: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>

        <GetTokens/>

      <header className="bannerheader">
        <a className="bannerA">
          <BottomBanner/>
        </a>
      </header>
    </div>
  );
}

export default History;