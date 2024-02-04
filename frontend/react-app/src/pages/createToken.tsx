import React from 'react';
import TopBanner from "../components/createToken/TTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import CreateT from "../components/createToken/Create";

const CreateToken: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>

      <CreateT/>

      <header className="bannerheader">
        <a className="bannerA">
          <BottomBanner/>
        </a>
      </header>
    </div>
  );
}

export default CreateToken;