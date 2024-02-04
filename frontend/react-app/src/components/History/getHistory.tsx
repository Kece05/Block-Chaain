import { useState, useEffect } from 'react';
import decrypt from '../WalletDash/decrypt';
import './history.css'

interface Transaction {
    SentToken?: string;
    ToWallet?: string;
    ReceivedToken?: string;
    FromWallet?: string | null;
    FromBlock?: string | null;
    TimeStamp: string;
  }
  
  const GetTokens = () => {
    const [historyData, setHistoryData] = useState<Transaction[]>([]);
    const currentUrl = window.location.href;
    const baseURL = window.location.origin + '/WalletDash/';
    const tokenFromUrl = (currentUrl.replace(baseURL, '')).replace("/history", "");
    const key = sessionStorage.getItem("SessionKey");
    const decrypted = decrypt(key, tokenFromUrl);

    useEffect(() => {
      fetch(`http://localhost:3023/History?username=${encodeURIComponent(decrypted)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setHistoryData(data.reverse() as Transaction[]);
          } else {
            console.error('Data is not in the expected format:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [decrypted]);

    return (
      <div>
        <h1 className='transaction-history-heading'>Transaction History</h1>
        <div className="transaction-blocks">
          {historyData.map((transaction, index) => (
            <div key={index} className="transaction-block">
              {transaction.SentToken && (
                <>
                  <p> <strong>Sent Token:</strong> {transaction.SentToken}</p>
                  <p> <strong>To Wallet:</strong> {transaction.ToWallet}</p>
                </>
              )}
              {transaction.ReceivedToken && (
                <>
                <p><strong>Received Token:</strong> {transaction.ReceivedToken}</p>
                  {transaction.FromWallet && <p><strong>From Wallet:</strong> {transaction.FromWallet}</p>}
                  {transaction.FromBlock && <p><strong>From Block:</strong> {transaction.FromBlock}</p>}
                </>
              )}
              <p> <strong>Time Stamp:</strong> {transaction.TimeStamp}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default GetTokens;