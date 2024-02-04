let elliptic = require('elliptic');
let ec = new elliptic.ec('secp256k1');
const cryptoHash = require("./crypto-hash");

const verifySign = ({publicKey, data, signature}) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');
    return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = {ec, verifySign, cryptoHash};