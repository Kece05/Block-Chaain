import './home.css';
import './main.css'
function About() {
  return (
    <div className="about-container">
      <h1>Welcome to Data-Chain</h1>
      <p>
        Welcome to Data-Chain, a pioneering blockchain implementation crafted in JavaScript. Our platform offers a hybrid approach, combining the security principles of blockchain with the functional aspects of traditional databases.
      </p>
      
      <section className="technology-overview">
        <h2>Technology Overview</h2>
        <p>
          Data-Chain introduces a unique blockchain structure that functions with the efficiency of a database. This innovation ensures robust security for transactions while maintaining the flexibility and functionality necessary for modern use cases.
        </p>
      </section>
      
      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li><strong>Blockchain:</strong> At the core of Data-Chain, our blockchain module ensures data integrity and security across the network.</li>
          <li><strong>Blocks:</strong> Individual blocks possess the ability to create and manage tokens, with validation processes in place to maintain the integrity of the entire chain.</li>
          <li><strong>Token:</strong> Our token system allows for the secure creation, transfer, and validation of tokens, serving as a ledger for authenticity.</li>
          <li><strong>Wallet:</strong> The wallet system securely stores tokens, with enhancements planned to further bolster security.</li>
          <li><strong>TransactionBtoW:</strong> This feature manages the direct transaction of tokens from blocks to wallets, with future updates aimed at increasing security.</li>
          <li><strong>TransactionWtoW:</strong> Wallet-to-wallet transactions enable users to exchange tokens securely, with continuous improvements to security on the horizon.</li>
        </ul>
      </section>
      
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Data-Chain is designed to combat counterfeit selling in any area by leveraging the trust and transparency of blockchain technology. Tokens of authenticity, representing physical items, can only be generated and distributed by verified companies, ensuring that each item is genuine.
        </p>
      </section>
    </div>
  );
}

export default About;
