import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const TopBanner: React.FC = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  };

  const connect = () => {
    navigate('/connect');
  };

  return (
    <div className="container-fluid bg-dark" style={{ position: 'fixed', top: '0', width: '100%' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center text-light py-3">
          <button className="btn btn-light" onClick={home}>
            <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
          </button>
          <button className="btn btn-light" onClick={connect}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
