import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const TopBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    navigate('/');
  };

  return (
    <div className="container-fluid bg-dark" style={{ position: 'fixed', top: '0', width: '100%' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center text-light py-3">
          <button className="btn btn-light" onClick={handleConnectClick}>
            <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
