import { useState } from 'react';
import '../Register/register.css';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';

const TransferBTOW = () => {
    
  const [transferFields, setFields] = useState({
    hash: '',
    password: '',
    publicKey: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...transferFields, [name]: value });
  };


  const handleClick = () => {
    const { publicKey, hash, password } = transferFields;

    if (!publicKey || !hash || !password) {
      alert('Please fill in all fields');
      return;
    }

    const tokenHash = sessionStorage.getItem('THash') || 'Invalid';

    fetch(
      `http://localhost:3023/BTransfer?hash=${encodeURIComponent(
        hash
      )}&password=${encodeURIComponent(
        password
      )}&THash=${encodeURIComponent(tokenHash)}&public=${encodeURIComponent(
        publicKey
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
            navigate(`/BlockDash/${sessionStorage.getItem("TokenB")}/`);
        } else {
          alert(
            'Failed to Transfer. Please verify that the fields have been entered correctly.'
          );
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <div className="mt-4 col-md-8 mx-auto">
      <body style={{ marginTop: '90px' }}>
        <div className="sectiondiv">
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            Transfer Token
          </h2>
          <input
            type="text"
            placeholder="Hash"
            className="input-field"
            name="hash"
            value={transferFields.hash}
            onChange={handleChange}
          />
          <div style={{ position: 'relative' }}>
            <input
              placeholder="Password"
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={transferFields.password}
              onChange={handleChange}
            />
            <button
              className="pass"
              onClick={handlePasswordToggle}
              style={{
                right: '10px',
                top: '50%',
                transform: 'translateY(-60%)',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            type="text"
            placeholder="Receiver's Public Key"
            className="input-field"
            name="publicKey"
            value={transferFields.publicKey}
            onChange={handleChange}
          />
          <button className="action-button" onClick={handleClick}>
            Transfer Token
          </button>
        </div>
      </body>
    </div>
  );
};

export default TransferBTOW;
