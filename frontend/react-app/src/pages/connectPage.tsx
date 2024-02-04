import React from 'react';
import TopBanner from "../components/Connect/connectTBanner";
import '../components/Home/Home.css'; 
import BottomBanner from "../components/Home/HomeBBanner";
import LoginPage from '../components/Connect/signPage';

const NewPage: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#445a73' }}>
            <header className="bannerheader">
                <a className="bannerA">
                    <TopBanner/>
                </a>
            </header>

            <div>
                <LoginPage/>
            </div>

            <header className="bannerheader">
                <a className="bannerA">
                    <BottomBanner/>
                </a>
            </header>
        </div>
    );
}

export default NewPage;
