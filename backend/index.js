const express = require('express');
const cors = require('cors');
const Blockchain = require("./BlockChain");
const Wallet = require('./wallet');
const nodemailer = require('nodemailer');
const CryptoJS = require("crypto-js");
const Token = require('./token');
const TransactionBtoW = require('./transaction_BtoW');
const TransactionWtoW = require('./transaction_WtoW');
const { getCurrentDateTimeEST } = require('./Block');

const app = express();
app.use(cors());

const blockchain = new Blockchain();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 't9147783@gmail.com',
        pass: 'yhsuvkizjcrcaecx',
    },
});

app.get("/createWallet", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;

    if (!username || !password) {
        return res.status(400).json({ error: 'Both username and password are required' });
    }

    const [pair, pub]= new Wallet(username, password, email).addWallet(blockchain);
    const private_key = pair.getPrivate().toString(16);
    const emailText = `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
            .container { width: 100%; max-width: 600px; margin: auto; background-color: white; padding: 20px; }
            .header { background-color: #004aad; color: white; padding: 10px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f3f3f3; padding: 10px; text-align: center; }
            .button {
                background-color: #008CBA;
                color: white;
                padding: 15px 25px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Data Chain</h1>
            </div>
            <div class="content">
                <h2>Welcome to Data Chain - Your New Wallet is Ready!</h2>
                <p>Dear ${username},</p>
                <p>We're excited to welcome you to Data Chain! Your new digital wallet has been successfully set up. For your security and convenience, please find the essential details of your wallet below. It's crucial to keep this information private and secure.</p>
                <h3>Your Wallet Details:</h3>
                <p><strong>Private Key:</strong> ${private_key}<br>
                (Important: This key is essential for accessing your wallet. Never share it with anyone and store it in a secure location.)</p>
                <p><strong>Public Key:</strong> ${pub}<br>
                (Use this key for all incoming transactions and token receipts.)</p>
                <h3>Security Recommendations:</h3>
                <ol>
                    <li><strong>Secure Storage:</strong> Store these details in a secure and private location, such as a password manager or a safe.</li>
                    <li><strong>Email Deletion:</strong> To further protect your wallet's security, we recommend deleting this email after securely saving the provided information.</li>
                </ol>
                <p>Should you have any questions or require assistance, our support team is here to help. Contact us anytime, and we'll be more than happy to assist you.</p>
                <p>Thank you for choosing Data Chain as your trusted digital wallet provider. We're committed to delivering a safe and seamless experience.</p>
                <p>Warm regards,</p>
                <p>The Data Chain Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2023 Data Chain. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`
    ;

    res.status(200).json({ success: true });

    transporter.sendMail({
        from: 't9147783@gmail.com',
        to: email,
        subject: 'Important Information Regarding Your New Wallet',
        html: emailText,
    }, (error, info) => {
        if (error) {
            console.error('Error sending verification email:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Verification email sent:', info.response);
            res.status(200).json({ message: 'Registration successful. Verification email sent.' });
        }
    });
});

app.get("/accessWallet", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const private_key = req.query.private_key;

    let validLogin = false;

    for (let i = 0; i < blockchain.wallets.length; i++) {
        const currentWallet = blockchain.wallets[i];
        const fKey = currentWallet.keyPair.getPrivate().toString(16);

        if (currentWallet.username === username && currentWallet.password === password && fKey === private_key) {
            validLogin = true;
            numWallet = i;
            break;
        }
    }

    if (validLogin) {        
        const token = ((Math.random().toString(36)) + (Math.random().toString(36))).replace(/[^a-zA-Z0-9 ]/g, "").replace(/\//g, "");
        const encrypted = CryptoJS.AES.encrypt(username, token).toString();
        res.send([true, encrypted, token]);
    } else {
        res.send([false]);
    }
    
});

app.get("/requestWalletTokens", (req, res) => {
    const username = req.query.username;
    for (let i = 0; i < blockchain.wallets.length; i++) {
        const currentWallet = blockchain.wallets[i];
        if (currentWallet.username === username) {
            res.send(currentWallet["tokens"]);
            break;
        }
    }
});

app.get("/createTokens", (req, res) => {
    const data = req.query.data.split('\n').filter(item => item.trim() !== '');
    const hash = req.query.hash;
    const numTokens = parseInt(req.query.tokens);
    const tokenName = req.query.name;
    var transferable = req.query.transferable === "True"; 
    var block_to_add_Tokens = null;

    for (let i = 0; i < blockchain.chain.length; i++) {
        const currentBlock = blockchain.chain[i];
        if (currentBlock.hash === hash) {
            block_to_add_Tokens = i;
            break;
        }
    }
    
    if (block_to_add_Tokens !== null) {
        var call_block = blockchain.chain[block_to_add_Tokens];
        Token.createTokens({
            block: call_block,
            NumTokens: numTokens,
            TokenName: tokenName, 
            data: data,
            transferable: transferable 
        });
        Token.removeInvalidTokens(blockchain.chain[block_to_add_Tokens]);
        call_block["history"].push({"Number": numTokens, "Name": tokenName, "TimeStamp": getCurrentDateTimeEST()})
    }
});

app.get("/requestBlock", (req, res) => {
    const id = req.query.id;
    let found = false;

    for (let i = 0; i < blockchain.chain.length; i++) {
        const currentBlock = blockchain.chain[i];
        if (currentBlock.id === id) {
            const data = {
                "timestamp": currentBlock.timestamp,
                "hash": currentBlock.hash,
                "data": currentBlock.data,
                "authority": currentBlock.authority,
                "id": currentBlock.id,
                "username": currentBlock.username,
                "Tokens": currentBlock.Tokens
            };

            res.header("Content-Type", "application/json");
            res.send(JSON.stringify(data));
            found = true;
            break;
        }
    }

    if (!found) {
        res.status(404).send("Block not found");
    }
});


app.get("/History", (req, res) => {
    const username = req.query.username;

    for (let i = 0; i < blockchain.wallets.length; i++) {
        const currentWallet = blockchain.wallets[i];
        if (currentWallet.username === username) {
            res.send(currentWallet["history"]);
            break;
        }
    }
});

app.get("/HistoryA", (req, res) => {
    if (req.query.id == blockchain.chain[0].id) {
        res.send(blockchain.chain[0]["history"]);
    }
});

app.get("/HistoryB", (req, res) => {
    const id = req.query.id;

    for (let i = 0; i < blockchain.chain.length; i++) {
        const currentBlock = blockchain.chain[i];
        if (currentBlock.id === id) {
            res.send(currentBlock["history"]);
            break;
        }
    }
});

app.get("/accessBlock", (req, res) => {
    const id = req.query.id;
    const username = req.query.username;
    const password = req.query.password;

    for (let i = 0; i < blockchain.chain.length; i++) {
        const currentWallet = blockchain.chain[i];
        if (currentWallet.id === id) {
            if (currentWallet.username === '' && currentWallet.password === '') {
                currentWallet.username = username;
                currentWallet.password = password;
            } 

            if (currentWallet.username === username & currentWallet.password === password) {
                const token = ((Math.random().toString(36)) + (Math.random().toString(36))).replace(/[^a-zA-Z0-9 ]/g, "").replace(/\//g, "");
                const encrypted = CryptoJS.AES.encrypt(id, token).toString();
                currentWallet["history"].push({"LoggedIn": getCurrentDateTimeEST()});
                res.send([true, encrypted, token]);
            } else {
                res.send([false]);
            }
        }
    }
});

app.get("/TransferToken", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const tokenHash = req.query.THash;
    const publicKey = req.query.public;

    var senderWallet = null;
    var recieversWallet = null;
    var tokenNum = null;
    var doneLoop = 0;

    for (let i = 0; i < blockchain.wallets.length; i++) {
        const currentWallet = blockchain.wallets[i];
        if (currentWallet.username == username && currentWallet.password == password) {
            for (let x = 0; x < currentWallet["tokens"].length; x++) {
                if (currentWallet["tokens"][x].TokenHash === tokenHash) {
                    senderWallet = i;
                    tokenNum = x;
                    doneLoop += 1;
                    break;
                }
            }
            if (doneLoop == 2) {
                break;
            }
        }
        if (publicKey === currentWallet.publicKey) {
            recieversWallet = i;
            doneLoop += 1;
            if (doneLoop == 2) {
                break;
            }
        }
    }

    if (senderWallet !== null && recieversWallet !== null && tokenNum !== null) {
        const transferFW = new TransactionWtoW({
            Sender: blockchain.wallets[senderWallet],
            Reciever: blockchain.wallets[recieversWallet], 
            verify: publicKey, 
            token: blockchain.wallets[senderWallet]["tokens"][tokenNum] 
        });

        transferFW.Transfer();
        blockchain.wallets[senderWallet]["history"].push({"SentToken": tokenHash, "ToWallet": publicKey,"TimeStamp": getCurrentDateTimeEST()})
        blockchain.wallets[recieversWallet]["history"].push({"ReceivedToken": tokenHash, "FromWallet": blockchain.wallets[senderWallet].publicKey,"TimeStamp": getCurrentDateTimeEST()})
        res.send(true)
    } else {
        res.send(false)
    }
});

app.get("/BTransfer", (req, res) => {
    const hash = req.query.hash;
    const password = req.query.password;
    const tokenHash = req.query.THash;
    const publicKey = req.query.public;

    var recieversWallet = null;
    var tokenNum = null;
    var block_to_add_Tokens = null;

    for (let i = 0; i < blockchain.chain.length; i++) {
        const currenBlock = blockchain.chain[i];
        if (currenBlock.hash == hash && currenBlock.password == password) {
            for (let x = 0; x < currenBlock["Tokens"].length; x++) {
                if (currenBlock["Tokens"][x].TokenHash === tokenHash) {
                    block_to_add_Tokens = i;
                    tokenNum = x;
                    break;
                }
            }
        }
    }

    for (let i = 0; i < blockchain.wallets.length; i++) {
        const currentWallet = blockchain.wallets[i];
        if (publicKey === currentWallet.publicKey) {
            recieversWallet = i;
            break;
        }
    }

    if (recieversWallet !== null && tokenNum !== null && block_to_add_Tokens !== null) {
        const transferTransaction1 = new TransactionBtoW({
            block: blockchain.chain[block_to_add_Tokens],
            wallet: blockchain.wallets[recieversWallet], 
            verify: publicKey, 
            token: blockchain.chain[block_to_add_Tokens].Tokens[tokenNum] 
        });
        transferTransaction1.Transfer();
        blockchain.wallets[recieversWallet]["history"].push({"ReceivedToken": tokenHash, "FromBlock": blockchain.chain[block_to_add_Tokens].hash, "TimeStamp": getCurrentDateTimeEST()})
        blockchain.chain[block_to_add_Tokens]["history"].push({"SentToken": tokenHash, "Reciever": blockchain.wallets[recieversWallet].publicKey, "TimeStamp": getCurrentDateTimeEST()})
        res.send(true)

    } else {
        res.send(false)
    }
});

app.get("/admin", (req,res) => {
    const password = req.query.password;
    const username = req.query.username;
    const encrypt = req.query.encrypt;
    if (!blockchain.chain[0].username && !blockchain.chain[0].password) {
        blockchain.chain[0].username = username;
        blockchain.chain[0].password = password;
        blockchain.chain[0].id = encrypt;
    }

    if (blockchain.chain[0].username == username && blockchain.chain[0].password == password && blockchain.chain[0].id == encrypt) {
        blockchain.chain[0]["history"].push({"LoggedIn": getCurrentDateTimeEST()});
        res.send([true, blockchain.chain]);
    } else {
        res.send([false]);
    }

})

app.get("/changeAuth", (req,res) => {
    const password = req.query.password;
    const id = req.query.id;
    const blockNum = req.query.num;

    if (blockchain.chain[0].password == password && blockchain.chain[0].id == id) {
        blockchain.chain[blockNum].authority = !blockchain.chain[blockNum].authority;
        blockchain.chain[0]["history"].push({"ChangedAuth": getCurrentDateTimeEST(), "ToBlock":blockchain.chain[blockNum].hash});
        res.send([true, blockchain.chain]);
    } else {
        res.send([false]);
    }

})

app.get("/addBlock", (req,res) => {
    const user = req.query.user;
    const id = req.query.id;
    const creator = req.query.creator;
    const data = req.query.data.split('\n').filter(item => item.trim() !== '');
    const email = req.query.email;

    if (blockchain.chain[0].username == user && blockchain.chain[0].id == id) {
        blockchain.addBlock({ Data: data , creator: creator});

        const emailText = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                .container { width: 100%; max-width: 600px; margin: auto; background-color: white; padding: 20px; }
                .header { background-color: #004aad; color: white; padding: 10px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f3f3f3; padding: 10px; text-align: center; }
                .button {
                    background-color: #008CBA;
                    color: white;
                    padding: 15px 25px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Data Chain</h1>
                </div>
                <div class="content">
                    <p>Dear ${creator},</p>
                    <p>Thank you for adding a new block to our blockchain platform. Your transaction has been successfully processed, and the details of your new block are as follows:</p>
                    <ul>
                        <li>Block ID: ${blockchain.chain[blockchain.chain.length - 1].id}</li>
                    </ul>
                    <p>This Block ID is essential for accessing and managing your block securely. Please note that your username and password will be initially set based on the credentials you provided during your first login.</p>
                    <p>For enhanced security, we strongly advise you to store this information in a safe and secure location. Consider using a password manager or other secure methods for storing sensitive data. Additionally, for optimal security of your account, we recommend deleting this email once you have securely recorded your Block ID and other pertinent details.</p>
                    <p>Should you have any questions, require assistance, or encounter any issues, our support team is readily available to assist you. You can reach out to us anytime, and we will be more than happy to help.</p>
                    <p>Thank you for choosing Data Chain as your trusted blockchain platform. We are committed to providing you with a secure and efficient service.</p>
                    <p>Warm regards,</p>
                    <p>The Data Chain Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2023 Data Chain. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
        ;


        res.status(200).json({ 
            success: true, 
            chain: blockchain.chain 
        });

        transporter.sendMail({
            from: 't9147783@gmail.com',
            to: email,
            subject: 'Important Information Regarding Your New Block',
            html: emailText,
        }, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                blockchain.chain[0]["history"].push({"Created": getCurrentDateTimeEST(), "NewBlock":blockchain.chain[blockchain.chain.length - 1].hash})
                console.log('Verification email sent:', info.response);
            }
        });
    } else {
        res.status(403).json({ error: 'Unauthorized to add block' });
    }

})

const PORT = 3023;
const listener = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

