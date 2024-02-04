# Block-Chain
It uses a combination of Blockchain and Database ideas. It acts like a blockchain with security, but the function act more like a database.

## Table of Contents
- [Overview](#overview)
- [Demo](#demo)
- [To-Do's](#ToDos)


**Overview:**

Welcome to Block-Chain, a unique type of blockchain(at least to my knowledge) implementation in JavaScript that 
facilitates transactions through the use of tokens from the blocks. This project leverages the following modules:

- `Blockchain`: Manages the core functionality of the blockchain, ensuring integrity and security.
- `Blocks`: Each blocks have their own power to create and transact tokens. The block are validated and the block which are invalid lose their power.
- `Token`: Facilitates the creation, transfer, and validation of tokens within the blockchain. Invalid tokens are removed from the block. Transfers from wallet-to-wallet depends on the Transferable in the token.
- `Wallet`: Provides a storage mechanism for transferred tokens. The wallet security will be better in the future. 
- `TransactionBtoW`: Handles transactions from a block to a wallet. The Transaction will definetly will be more secure in the future.
- `TransactionWtoW`: Manages wallet-to-wallet transactions of tokens between users. The Transaction will definetly will be more secure in the future.

**Demo:**
If you would like to see a full demo, this video goes over the concepts: https://youtu.be/yp0gISwGmio

**To-Do's:**
- Improve UI
- Make secure, make it encryption, https, prevent attacks
- Create forgot passwords/username, or update email
- Fix alerts style
- Create a token search
- Send email when block sends token
- Instead of using nested Dictonarys, create a database using Docker or SQL.

Please note that this code is a demonstration and may require additional security measures and optimizations for a production environment. 
Feel free to explore and contribute to enhance the functionality and security of this blockchain implementation.
