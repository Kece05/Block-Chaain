import { useState, useEffect } from 'react';
import decrypt from '../WalletDash/decrypt';
import './history.css'

interface Transaction {
    Number?: string | null;
    Name?: string | null;

    SentToken?: string | null;
    Reciever?: string | null;

    TimeStamp: string;
    LoggedIn?: string | null;
}
  
const AqquireTokens = () => {
    const [historyData, setHistoryData] = useState<Transaction[]>([]);
    const currentUrl = window.location.href;
    const baseURL = window.location.origin + '/BlockDash/';
    const tokenFromUrl = (currentUrl.replace(baseURL, '')).replace("/history", "");
    const key = sessionStorage.getItem("SessionKeyB");
    const decrypted = decrypt(tokenFromUrl, key);

    useEffect(() => {
      fetch(`http://localhost:3023/HistoryB?id=${encodeURIComponent(decrypted)}`)
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
        <h1 className='transaction-history-heading'>Activity History</h1>
        <div className="transaction-blocks">
          {historyData.map((transaction, index) => (
            <div key={index} className="transaction-block">
              {transaction.Number && (
                <>
                  <p> <strong>Number of Tokens created:</strong> {transaction.Number}</p>
                  <p> <strong>Name of Tokens:</strong> {transaction.Name}</p>
                  <p> <strong>Time Stamp:</strong> {transaction.TimeStamp}</p>
                </>
              )}
              {transaction.SentToken && (
                <>
                <p><strong>Sent Token:</strong> {transaction.SentToken}</p>
                  {transaction.Reciever && <p><strong>To Wallet:</strong> {transaction.Reciever}</p>}
                  <p> <strong>Time Stamp:</strong> {transaction.TimeStamp}</p>
                </>
              )}
              {transaction.LoggedIn && (
                <>
                <p><strong>Logged In:</strong> {transaction.LoggedIn}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
};
  
  export default AqquireTokens;