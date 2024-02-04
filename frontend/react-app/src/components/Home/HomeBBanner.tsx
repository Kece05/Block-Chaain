import React from 'react';

const BottomBanner: React.FC = () => {
  return (
    <div style={{ position: 'fixed', bottom: '0', width: '100%', background: '#333', color: '#fff', padding: '15px', textAlign: 'center' }}>
      <p style={{ margin: '0' }}>
        Check out the source code on GitHub: 
        <a href="https://github.com/Kece05/Data-Chain" target="_blank" rel="noopener noreferrer" style={{ color: '#ffcc00', marginLeft: '5px' }}>
          Data Chain Repository
        </a>
      </p>
    </div>
  );
};

export default BottomBanner;
