import { useState } from 'react';
import './signPage.css';
import { useNavigate } from 'react-router-dom';
import App from '../../main';
import ReactDOM from 'react-dom/client';
import React from 'react';

const LoginPage = () => {
  const [showWalletFields, setShowWalletFields] = useState(true);
  const [walletFields, setWalletFields] = useState({
    privateKey: '',
    username: '',
    password: '',
  });


  const [showBlockFields, setShowBlockFields] = useState(false);
  const [blockFields, setBlockFields] = useState({
    identifier: '',
    username: '',
    password: '',
  });

  const handleWalletClick = () => {
    setShowWalletFields(true);
    setShowBlockFields(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
  };
  
  const handleBlockClick = () => {
    setShowBlockFields(true);
    setShowWalletFields(false); 
  };
  const navigate = useNavigate();

  const register = () => {
    navigate('/register');
  };

  const WalletClick = () => {
    if (!walletFields.username || !walletFields.privateKey || !walletFields.password) {
      alert('Please fill in all fields');
      return;
    }

    fetch(`http://localhost:3023/accessWallet?username=${encodeURIComponent(walletFields.username)}&password=${encodeURIComponent(walletFields.password)}&private_key=${encodeURIComponent(walletFields.privateKey)}`)
        .then(response => response.json())
        .then(data => {
            if (data[0]) {
              sessionStorage.setItem("Token", data[2])
              sessionStorage.setItem("SessionKey", data[1]);
              ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
              navigate(`/WalletDash/${sessionStorage.getItem("Token")}`);
          
            } else {
                alert('Invalid Login');
            }
        })
        .catch(error => {
            console.error('Error:', error);
    });
  };

  const createBEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      BlockClick();
    }
};
const createWEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    WalletClick();
  }
};
  const BlockClick = () => {
    if (!blockFields.username || !blockFields.identifier || !blockFields.password) {
      alert('Please fill in all fields');
      return;
    }

    fetch(`http://localhost:3023/accessBlock?id=${encodeURIComponent(blockFields.identifier)}&username=${encodeURIComponent(blockFields.username)}&password=${encodeURIComponent(blockFields.password)}`)
        .then(response => response.json())
        .then(data => {
            if (data[0]) {
              sessionStorage.setItem("SessionKeyB", data[2])
              sessionStorage.setItem("TokenB", data[1]);
              ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
              navigate(`/BlockDash/${sessionStorage.getItem("TokenB")}`);
            } else {
                alert('Invalid Login');
            }
        })
        .catch(error => {
            console.error('Error:', error);
    });

  };

  return (
    <div className="login-container">
      <header className='fheader'>
        
      </header>
      {showWalletFields && (
        <div className="wallet-fields">
          <input 
            type="text" 
            placeholder="Private Key" 
            className="input-field"
            value={walletFields.privateKey}
            onChange={(e) => setWalletFields({ ...walletFields, privateKey:e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Username" 
            className="input-field"
            value={walletFields.username}
            onChange={(e) => setWalletFields({ ...walletFields, username:e.target.value })}
          />
          <div className="second-container" style={{ position: 'relative' }}>
            <input
              placeholder="Password" 
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              value={walletFields.password}
              onKeyDown={createWEnter}
              onChange={(e) => setWalletFields({ ...walletFields, password:e.target.value})}/>
            <button 
              className="pass"
              onClick={handlePasswordToggle}
              style={{ 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-75%)', 
              }}>
                {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="log-button" onClick={WalletClick}>Access Wallet</button>
        </div>
      )}

      {showBlockFields && (
        <div className="block-fields">
          <input 
            type="text" 
            placeholder="Identifier" 
            className="input-field"
            value={blockFields.identifier}
            onChange={(e) => setBlockFields({ ...blockFields, identifier:e.target.value})}
            maxLength={16}
          />
          <input 
            type="text" 
            placeholder="Username" 
            className="input-field"
            value={blockFields.username}
            onChange={(e) => setBlockFields({ ...blockFields, username:e.target.value})}
          />
          <div className="second-container" style={{ position: 'relative' }}>
            <input
              placeholder="Password" 
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              value={blockFields.password}
              onKeyDown={createBEnter}
              onChange={(e) => setBlockFields({ ...blockFields, password:e.target.value})}/>
            <button 
              className="pass"
              onClick={handlePasswordToggle}
              style={{ 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-75%)', 
              }}>
                {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="log-button" onClick={BlockClick}>Access Block</button>
        </div>
      )}
        <button className="action-button" onClick={handleWalletClick}>Wallet </button>
        <button className="action-button" onClick={handleBlockClick}>Block</button>
        <button className="register-button" onClick={register}>Need to Register</button>
    </div>
  );
};

export default LoginPage;
