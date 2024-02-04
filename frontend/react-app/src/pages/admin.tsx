import React from 'react';
import TopBanner from "../components/admin/TTBanner";
import '../components/Home/Home.css'; 
import Logged from '../components/admin/login'

const Admin: React.FC = () => {
  return (
    <div>
      <header className="bannerheader">
        <a className="bannerA">
          <TopBanner/>
        </a>
      </header>
        <Logged/>
    </div>
  );
}

export default Admin;