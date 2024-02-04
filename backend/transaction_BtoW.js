class TransactionBtoW {
    constructor({block, wallet, verify, token}) {
        this.block = block;
        this.wallet = wallet;
        this.verify = verify;
        this.token = token;
    }

    Transfer() {
        if (this.block.authority && this.block.Tokens && this.block.Tokens.length > 0) {
            if (this.verify == this.wallet.publicKey && this.block.Tokens.includes(this.token)) {
                this.wallet.tokens.push(this.token);
                const tokenIndex = this.block.Tokens.indexOf(this.token);
                if (tokenIndex !== -1) {
                    this.block.Tokens.splice(tokenIndex, 1);
                }
            }
        }
    }
}

module.exports = TransactionBtoW;