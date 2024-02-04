const {ec, cryptoHash} = require('./ellipitic');

class Wallet {
    constructor(username, password, email) {
        this.tokens = [];
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode("hex");
        this.username = username;
        this.password = password;
        this.email = email;
        this.history = []
    }

    addWallet(blockchain) {
        blockchain.wallets.push(this);
        return [this.keyPair, this.publicKey];
    }
}

module.exports = Wallet;
