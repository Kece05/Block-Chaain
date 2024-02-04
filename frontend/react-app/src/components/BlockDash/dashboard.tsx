import { useEffect, useState } from 'react';
import decrypt from '../WalletDash/decrypt';
import replaceFinalCharacter from '../WalletDash/replaceChar';
import './dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import App from '../../main';
import ReactDOM from 'react-dom/client';

interface DataItem {
  authority: boolean;
  data: string[];
  hash: string;
  id: string;
  timestamp: string;
  username: boolean;
}

interface TokenItem {
  timestamp: string;
  ISSUER: string;
  Name: string;
  data: string[];
  BlocksHash: string;
  TokenHash: string;
  Transferable: boolean;
}

const Dashboard = () => {
  const [data, setData] = useState<DataItem | null>(null); 
  const [token, setToken] = useState<TokenItem[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUrl = window.location.href;
  const baseURL = window.location.origin + '/BlockDash/';
  const tokenFromUrl = replaceFinalCharacter(currentUrl.replace(baseURL, ''), '/', '');
  const key = sessionStorage.getItem('SessionKeyB');
  const decrypted = decrypt(tokenFromUrl, key);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3023/requestBlock?id=${encodeURIComponent(decrypted)}`);
        const responseData = await response.json();
        setData(responseData || null); 
        setToken(responseData.Tokens);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, [key, decrypted]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedToken(null);
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleBoxClick = (token: TokenItem) => {
    setSelectedToken(token);
  };

  const handleTransferButtonClick = (token: TokenItem) => {
    const url = `/BlockDash/${tokenFromUrl}/BTransfer`;
    sessionStorage.setItem("THash",token.TokenHash);
    ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
    navigate(url);
};

  const navigate = useNavigate();

  const CreateToken = () => {
        if (data !== null) {
            const url = `/BlockDash/${tokenFromUrl}/CreateToken`;
            sessionStorage.setItem("BlockH", data.hash);
            ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
            navigate(url);
        }
  };

  const handleTransactionHistory = () => {
    navigate(`/BlockDash/${sessionStorage.getItem("TokenB")}/history`);
  }

  return (
    <div>
      {data === null ? (
        <p>Data is loading...</p>
      ) : (
        <div>
          <div className="header" onClick={handleOpenModal}>
            Block: {data.username}
          </div>
            <div className={`modal ${isModalVisible ? 'show' : ''}`}>
                <div className="modal-content">
                  <span className="close" onClick={handleCloseModal}>&times;</span>
                  <h2>{data.username}</h2>
                  <p><strong>Block Hash:</strong> {data.hash}</p>
                  <p><strong>Blocks Identifier:</strong> {data.id}</p>
                  <p><strong>Authority:</strong> {data.authority ? 'Yes' : 'No'}</p>
                  <p><strong>Data:</strong></p>
                  <ul>
                    {data.data.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  {data.authority && (
                    <button className="transfer-button" onClick={() => CreateToken()}>
                      Create Token
                    </button>
                  )}
                </div>
          </div>
        </div>
      )}
      <div className="main-contented">
          <div className="token-info">
            <button className="transaction-history-button" onClick={handleTransactionHistory}>
                Log History
            </button>
            <h2>Your Token Information</h2>
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
                    {data !== null && data.authority && (
                      <button className="transfer-button" onClick={() => handleTransferButtonClick(selectedToken)}>
                          Transfer Token
                        </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
