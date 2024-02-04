import React from 'react';
import { useState } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';

const Registersss: React.FC = () => {

    const [walletFields, setwallet] = useState({
        Name: '',
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const createWEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            Click();
        }
    };

    const Click = () => {
        const enteredPassword = prompt('Enter your password to verify:');
        if (enteredPassword !== walletFields.password) {
            alert('Password verification failed. Please try again.');
            return;
        }
        if (!walletFields.Name || !walletFields.username || !walletFields.password) {
            alert('Please fill in all fields');
            return;
        }

        fetch(`http://localhost:3023/createWallet?username=${encodeURIComponent(walletFields.username)}&password=${encodeURIComponent(walletFields.password)}&email=${encodeURIComponent(walletFields.Name)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Server Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
        });

        navigate('/connect');
    };

    return (
        <div className="mt-4 col-md-8 mx-auto">
            <body style={{ backgroundColor: '#445a73', marginTop: '90px'}}>
                <div className='sectiondiv'>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registering a Block</h2>
                    <p>
                        If you want to register a block, please feel free to contact us using the information below:
                    </p>
                    <div style={{ marginTop: '20px' }}>
                        <strong>Contact Info:</strong>
                        <ul>
                        <li>Phone: 571-439-9743</li>
                        <li>Email: keller.s.bice@icloud.com</li>
                        </ul>
                    </div>
                </div>

                <div className='sectiondiv' >
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registering a Wallet</h2>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="input-field"
                        value={walletFields.Name}
                        onChange={(e) => setwallet({ ...walletFields, Name:e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="input-field"
                        value={walletFields.username}
                        onChange={(e) => setwallet({ ...walletFields, username:e.target.value})}
                    />
                    <div style={{ position: 'relative' }}>
                        <input
                            placeholder="Password" 
                            className="input-field"
                            onKeyDown={createWEnter}
                            type={showPassword ? 'text' : 'password'}
                            value={walletFields.password}
                            onChange={(e) => setwallet({ ...walletFields, password:e.target.value})}
                        />
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
                    <button className="action-button" onClick={Click}>Create Wallet</button>
                </div>
            </body>
        </div>
    );
};

export default Registersss;
