const crypto = require('crypto');
const cryptoHash = require('./crypto-hash');

const firstH = cryptoHash(crypto.randomBytes(64).toString('hex'));
const gen_name = cryptoHash(crypto.randomBytes(64).toString('hex'));

const GENESIS_DATA = {
    timestamp: '',
    hash: firstH, 
    lastHash: "",
    data: [],
    authority: true, 
    Private_Key: cryptoHash(crypto.randomBytes(64).toString('hex')) 
};

var AUTHORITIES = [                             
    { name: gen_name, hash: GENESIS_DATA.hash, SHA264_Key: GENESIS_DATA.Private_Key}  
];

function reset() {
    AUTHORITIES = [                             
        { name: gen_name, hash: GENESIS_DATA.hash, SHA264_Key: GENESIS_DATA.Private_Key}  
    ];
};

function replaceSHA256(hash) {
    const nC = cryptoHash(crypto.randomBytes(64).toString('hex'));
    for (let i = 0; i < AUTHORITIES.length; i++) {
        if (AUTHORITIES[i].hash !== hash && AUTHORITIES[i].name != "Invalid") {
            AUTHORITIES[i].SHA264_Key = nC;
        } else {
            AUTHORITIES[i].name = "Invalid";
        }
    }
    GENESIS_DATA.Private_Key = nC;
    return nC;
}
function findName_throughHash(hash) {
    for (let i = 0; i < AUTHORITIES.length; i++) {
        if (AUTHORITIES[i].hash == hash) {
            return AUTHORITIES[i].name;
        }
    }
    return null;
}

function getAuthorityHash(key, newHash, creator) {
    const checkSHA264_Key = (AUTHORITIES[AUTHORITIES.length-1].SHA264_Key == key);
    if (checkSHA264_Key) {
        AUTHORITIES.push({
            name: creator,
            hash: newHash,
            SHA264_Key: GENESIS_DATA.Private_Key
        })
    } 
    return checkSHA264_Key;
}


module.exports = { GENESIS_DATA , AUTHORITIES , getAuthorityHash, replaceSHA256, reset, findName_throughHash};