import './log.css'
import { useState } from 'react';
import React from 'react';

interface BlocKItem {
    timestamp: string;
    hash: string;
    data: string[];
    authority: boolean;
    username: string;
}

interface history {
    Created?: string | null;
    NewBlock?: string | null;

    ChangedAuth?: string | null;
    ToBlock?: string | null;

    LoggedIn: string | null;
}
  

const Logged = () => {
    const [fields, setFields] = useState({
        id: '',
        username: '',
        password: '',
    });

    const [create, setcreate] = useState({
        creator: '',
        id: '',
        data: '',
        user:'',
        email: '',
    });

    const [showModal, setShowModal] = useState(true);
    const [showNewModal, setShowNewModal] = useState(false);
    const [historyModal, sethistoryModal] = useState(false);
    const [block, setblock] = useState<BlocKItem[]>([]);
    const [selectedBlock, setSelectedBlock] = useState<BlocKItem | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [historyData, setHistoryData] = useState<history[]>([]);

    const displayList = () => {
        const bulletPoints = create.data.split('\n').filter(item => item.trim() !== '');
        return (
          <ul>
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        );
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleBoxClick = (block: BlocKItem) => {
        setSelectedBlock(block);
    };

    const handleAuthorityChange = (blockItem: number) => async () => {
        const enteredPassword = String(prompt('Enter your password to verify:'));
        const enteredid = String(prompt('Enter your id to verify:'));
        const blockNum = blockItem; 

        fetch(`http://localhost:3023/changeAuth?password=${encodeURIComponent(enteredPassword)}&id=${encodeURIComponent(enteredid)}&num=${encodeURIComponent(blockNum)}`)
                .then(response => response.json())
                .then(data => {

                   if (data[0]) {
                    setblock(data[1]);
                   } else {
                    alert('Was Unable to Change the Blocks State.');
                   }
                })
                .catch(error => {
                    console.error('Error:', error);
        });
    };
      

    const handleCloseModal = () => {
        setSelectedBlock(null);
    };

    const clickedOnH = () => {
        sethistoryModal(true);
        const enteredid = String(prompt('Enter your id to verify:'));

        fetch(`http://localhost:3023/HistoryA?id=${enteredid}`)
        .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (Array.isArray(data)) {
              setHistoryData(data.reverse() as history[]);
            } else {
              console.error('Data is not in the expected format:', data);
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });        
    };

    const handleCreateButtonClick = () => {
        if (!create.id || !create.user || !create.creator || !create.data || !create.email) {
            alert('Please fill in all fields');
            return;
        }
        const first = `user=${encodeURIComponent(create.user)}`
        const second = `&id=${encodeURIComponent(create.id)}`
        const thrid = `&creator=${encodeURIComponent(create.creator)}`
        const fourth = `&data=${encodeURIComponent(create.data)}`
        const fifth = `&email=${encodeURIComponent(create.email)}`
        
        fetch(`http://localhost:3023/addBlock?${first}${second}${thrid}${fourth}${fifth}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setblock(data.chain);
                    setShowNewModal(false);
                } else {
                    alert('Was Unable to Create a New Block.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const createBEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleTransferButtonClick();
        }
    };

    const handleTransferButtonClick = () => {
        if (!fields.id || !fields.username || !fields.password) {
            alert('Please fill in all fields');
            return;
        }

        const enteredPassword = prompt('Enter your password to verify:');
        if (enteredPassword !== fields.password) {
            alert('Password verification failed. Please try again.');
            return;
        }

        fetch(`http://localhost:3023/admin?encrypt=${encodeURIComponent(fields.id)}&password=${encodeURIComponent(fields.password)}&username=${encodeURIComponent(fields.username)}`)
            .then(response => response.json())
            .then(data => {
                setShowModal(!data[0]);
                setblock(data[1]);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    };

    return (
      <div id="boxesContainer">
        { showModal ? (
          <div className={`modals`}>
            <div className="modal-contents">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin</h2>
                <input 
                    type="text" 
                    placeholder="ID" 
                    className="input-field"
                    value={fields.id}
                    onChange={(e) => setFields({ ...fields, id:e.target.value})}
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    className="input-field"
                    value={fields.username}
                    onChange={(e) => setFields({ ...fields, username:e.target.value})}
                />
                <div style={{ position: 'relative' }}>
                    <input
                        placeholder="Password" 
                        className="input-field"
                        type={showPassword ? 'text' : 'password'}
                        value={fields.password}
                        onChange={(e) => setFields({ ...fields, password:e.target.value})}
                        onKeyDown={createBEnter}
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
                <button className="log-button" onClick={() => handleTransferButtonClick()}>
                    Log-In
                </button>
            </div>
        </div>
        ) : (
            <div className="page-containerd">
                <h1 className='headingd'>Blocks</h1>
                <button className="new-buttond" onClick={() => setShowNewModal(true)}>
                    Create New Block
                </button>
                <button className="new-buttond" onClick={() => clickedOnH()}>
                    Get History
                </button>
                <div id="boxesContainerd">
                    {block.map((BlocKItem, index) => (
                        <div className="box-container" key={index}>
                            <div className="box" onClick={() => handleBoxClick(BlocKItem)}>
                                <div className={`status-indicatord ${BlocKItem.authority ? 'authority' : 'non-authority'}`}></div>
                                <p><strong>{BlocKItem.username}</strong></p>
                                <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={BlocKItem.authority}
                                        onChange={handleAuthorityChange(index)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        )}
        {selectedBlock !== null && (
            <div className={`modals ${selectedBlock ? 'show' : ''}`}>
                <div className="modal-contents">
                  <span onClick={handleCloseModal}>&times;</span>
                  <h2>{selectedBlock.username}</h2>
                  <p><strong>Blocks Hash:</strong> {selectedBlock.hash}</p>
                  <p><strong>Time Created:</strong> {selectedBlock.timestamp}</p>
                  <p>
                        <strong>Authority:</strong>
                        <span className="authority-statusd">{selectedBlock.authority ? 'Yes' : 'No'}</span>
                  </p>
                  <p><strong>Data:</strong></p>
                  <ul>
                    {selectedBlock.data.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
            </div>
         )}
         { showNewModal && (
            <div className={`modals`}>
                <div className="modal-contents">
                <span onClick={() => setShowNewModal(false)}>&times;</span>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create</h2>
                    <input 
                        type="text" 
                        placeholder="ID" 
                        className="input-field"
                        value={create.id}
                        onChange={(e) => setcreate({ ...create, id:e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="input-field"
                        value={create.user}
                        onChange={(e) => setcreate({ ...create, user:e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Email for Block Owner" 
                        className="input-field"
                        value={create.email}
                        onChange={(e) => setcreate({ ...create, email:e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Creator" 
                        className="input-field"
                        value={create.creator}
                        onChange={(e) => setcreate({ ...create, creator:e.target.value})}
                    />
                    <textarea
                        id="data"
                        placeholder="Data for the block"
                        className="input-field"
                        value={create.data}
                        onChange={(e) => setcreate({ ...create, data: e.target.value })}
                    />

                    <div>
                        {displayList()}
                    </div>
                    <button className="log-button" onClick={() => handleCreateButtonClick()}>
                        Create Block
                    </button>
                </div>
            </div>
         )}

        { historyModal && (
            <div className={`modals`}>
                <div className="modal-contents">
                    <span onClick={() => sethistoryModal(false)}>&times;</span>
                    <div>
                        <h1 className='transaction-history-heading'>Activity History</h1>
                        <div className="transaction-blocks">
                        {historyData.map((his, index) => (
                            <div key={index} className="transaction-block">
                            {his.Created && (
                                <>
                                <p> <strong>Block Created: </strong> {his.Created}</p>
                                <p> <strong>Blocks Hash: </strong> {his.NewBlock}</p>
                                </>
                            )}
                            {his.ChangedAuth && (
                                <>
                                <p><strong>Changed Auth On: </strong> {his.ChangedAuth}</p>
                                <p><strong>Blocks Hash: </strong> {his.ToBlock}</p>
                                </>
                            )}
                            {his.LoggedIn && (
                                <>
                                <p> <strong>Logged In: </strong> {his.LoggedIn}</p>
                                </>
                            )}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
         )}

      </div>   
    );
};

export default Logged;