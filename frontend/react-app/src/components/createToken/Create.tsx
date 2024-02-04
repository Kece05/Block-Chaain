import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import './create.css'
import { useNavigate } from 'react-router-dom';
import isInteger from './testValue';

const CreateT: React.FC = () => {
    const hash = sessionStorage.getItem("BlockH");

    const [fields, setB] = useState({
        data: '',
        numTokens: '',
        tokenName: '',
        transferable: ''
    });

    const displayList = () => {
        const bulletPoints = fields.data.split('\n').filter(item => item.trim() !== '');
        return (
          <ul>
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        );
    };

    const navigate = useNavigate();

    const handleTransferableChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setB({ ...fields, transferable: e.target.value });
    };

    const Click = () => {
        if (!isInteger(fields.numTokens)) {
            alert('Please a valid number');
            return;
        }

        if (!fields.data || !fields.numTokens || !fields.tokenName || !fields.transferable || hash == null) {
            alert('Please fill in all fields');
            return;
        } 

        const dataUrl = `data=${encodeURIComponent(fields.data)}`;
        const numUrl = `&tokens=${encodeURIComponent(fields.numTokens)}`;
        const nameUrl = `&name=${encodeURIComponent(fields.tokenName)}`;
        const transferableUrl = `&transferable=${encodeURIComponent(fields.transferable)}`;

        const hashUrl = `&hash=${encodeURIComponent(hash)}`;
        fetch(`http://localhost:3023/createTokens?${dataUrl}${numUrl}${nameUrl}${transferableUrl}${hashUrl}`)
            .then(response => response.json())
            .then(data => {
                console.log('Server Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
        });

        navigate(`/BlockDash/${sessionStorage.getItem("TokenB")}`);
    };

    return (
        <div className="mt-4 col-md-8 mx-auto">
            <body style={{ marginTop: '90px'}}>
                <div className='sectiondiv' >
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Tokens</h2>
                    <input 
                        type="text" 
                        placeholder="Token Name" 
                        className="input-field"
                        value={fields.tokenName}
                        onChange={(e) => setB({ ...fields, tokenName:e.target.value})}
                        maxLength={16}
                    />
                    <input 
                        type="text" 
                        placeholder="Number of Tokens" 
                        className="input-field"
                        value={fields.numTokens}
                        onChange={(e) => setB({ ...fields, numTokens:e.target.value})}
                    />
                    <label><strong>Info for the Tokens</strong></label>
                    <textarea
                        id="data"
                        placeholder="Info for the Tokens"
                        className="input-field"
                        value={fields.data}
                        onChange={(e) => setB({ ...fields, data: e.target.value })}
                    />

                    <div>
                        {displayList()}
                    </div>
                    <select
                        id="transferable"
                        className="input-field"
                        value={fields.transferable}
                        onChange={handleTransferableChange}
                    >
                        <option value="">---Select Tokens Transferability---</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                    <button className="action-button" onClick={Click}>Create Wallet</button>
                </div>
            </body>
        </div>
    );
};

export default CreateT;
