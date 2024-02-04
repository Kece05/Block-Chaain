import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const TopBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    navigate(`/BlockDash/${sessionStorage.getItem("TokenB")}/`);
  };

  return (
    <div className="container-fluid bg-dark" style={{ position: 'fixed', top: '0', width: '100%' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center text-light py-3">
          <div style={{ background: 'white', padding: '5px', borderRadius: '5px' }}>
            <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
          </div>
          <button className="btn btn-light" onClick={handleConnectClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
