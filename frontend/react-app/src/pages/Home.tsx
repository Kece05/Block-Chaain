import React from 'react';
import TopBanner from "../components/Home/HomeTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import About from '../components/Home/about';
import '../components/Home/Home.css'; 

const Home: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>
      <About/>

      <header className="bannerheader">
        <a className="bannerA">
          <BottomBanner/>
        </a>
      </header>
    </div>
  );
}

export default Home;