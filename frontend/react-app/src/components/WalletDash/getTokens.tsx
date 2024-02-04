import decrypt from './decrypt';
import './tokens.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import App from '../../main';
import ReactDOM from 'react-dom/client';
import replaceFinalCharacter from './replaceChar';

interface TokenItem {
  timestamp: string;
  ISSUER: string;
  Name: string;
  data: string[];
  BlocksHash: string;
  TokenHash: string;
  Transferable: boolean;
}

const GetTokens = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<TokenItem[]>([]);
    const currentUrl = window.location.href;
    const baseURL = window.location.origin + '/WalletDash/';
    const tokenFromUrl = replaceFinalCharacter(currentUrl.replace(baseURL, ''), "/","");

    const key = sessionStorage.getItem("SessionKey");
    const decrypted = decrypt(key,tokenFromUrl);
    const [selectedToken, setSelectedToken] = useState<TokenItem | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3023/requestWalletTokens?username=${encodeURIComponent(decrypted)}`);
            const responseData = await response.json();

            if (Array.isArray(responseData)) {
              setToken(responseData);
            } else {
              console.error('Invalid data format received from the server');
            }
          } catch (error) {
            alert(error);
          }
        };
    
        fetchData();
      }, [key, decrypted]);

    const handleBoxClick = (token: TokenItem) => {
        setSelectedToken(token);
    };

    const handleCloseModal = () => {
        setSelectedToken(null);
    };

    const handleTransferButtonClick = (token: TokenItem) => {
        const url = `/WalletDash/${tokenFromUrl}/TransferToken`;
        sessionStorage.setItem("THash",token.TokenHash);
        ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
        navigate(url);
    };

    return (
      <div id="boxesContainer">
        {token.length === 0 ? (
          <p className='no-tokens-message'>It Looks Like You Have No Tokens...</p>
        ) : (
          token.map((tokenItem, index) => (
            <div className="box"  key={index} onClick={() => handleBoxClick(tokenItem)}>
              <div className="circle">
                <span className="letter">{tokenItem.ISSUER.charAt(0)}</span>
              </div>
              <p className="top">{tokenItem.Name}</p>
              <p className="bottom">{tokenItem.timestamp}</p>
            </div>
          ))
        )}
        {selectedToken !== null && (
          <div className={`modal ${selectedToken !== null ? 'show' : ''}`}>
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2>{selectedToken.Name}</h2>
              <p><strong>Tokens Hash:</strong> {selectedToken.TokenHash}</p>
              <p><strong>Blocks Hash:</strong> {selectedToken.BlocksHash}</p>
              <p><strong>Transferable:</strong> {selectedToken.Transferable ? 'Yes' : 'No'}</p>
              <p><strong>Data:</strong></p>
              <ul>
                {selectedToken.data.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {selectedToken.Transferable && (
                <button className="transfer-button" onClick={() => handleTransferButtonClick(selectedToken)}>
                  Transfer Token
                </button>
              )}
            </div>
          </div>
        )}
      </div>    
    );
};

export default GetTokens;