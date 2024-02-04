import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import ReactDOM from 'react-dom/client';
import App from '../../main';

const TopBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    sessionStorage.setItem("Token", "");
    sessionStorage.setItem("TokenB", "");
    sessionStorage.setItem("THash", "");
    sessionStorage.setItem("SessionKeyB", "");
    sessionStorage.setItem("SessionKey", "");
    ReactDOM.createRoot(document.getElementById('root')!).render(<App/>);
    navigate('/');
  };

  return (
    <div className="container-fluid bg-dark" style={{ position: 'fixed', top: '0', width: '100%', zIndex:10}}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center text-light py-3">
          <div style={{ background: 'white', padding: '5px', borderRadius: '5px' }}>
            <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
          </div>
          <button className="btn btn-light" onClick={handleConnectClick}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
