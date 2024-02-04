import React from 'react';
import logo from '../../assets/logo.svg';

const TopBanner: React.FC = () => {
  return (
    <div className="container-fluid bg-dark" style={{ position: 'fixed', top: '0', width: '100%' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center text-light py-3">
          <div style={{ background: 'white', padding: '5px', borderRadius: '5px' }}>
            <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
