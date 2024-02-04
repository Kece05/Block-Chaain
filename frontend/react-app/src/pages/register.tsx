import React from 'react';
import TopBanner from "../components/Register/registerTBanner";
import BottomBanner from "../components/Home/HomeBBanner";
import Registersss from '../components/Register/registerBlock';

const Register: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#445a73' }}>
        <header className="bannerheader">
          <a className="bannerA">
            <TopBanner/>
          </a>
        </header>

        <Registersss/>
      
        <header className="bannerheader" >
          <a className="bannerA">
            <BottomBanner/>
          </a>
        </header>
        
      </div>
    );
};

export default Register;