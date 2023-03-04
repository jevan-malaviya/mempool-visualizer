import './App.css';
import { Alchemy, AlchemySubscription } from "alchemy-sdk";
import { useEffect, useState } from 'react';

const alchemy = new Alchemy({
  apiKey: 'sp8CRkb8K-I8By11GTiCMuuoteqGNfNY'
});

function App() {
  const [pendingTxList, setPendingTxList] = useState([]);
  const [minedTxList, setMinedTxList] = useState([]);
  const [latestBlock, setLatestBlock] = useState('');
  useEffect(() => {
    console.log("listening");
    alchemy.ws.on({
      method: AlchemySubscription.PENDING_TRANSACTIONS,
      toAddress: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B',
      fromAddress: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B',
      hashesOnly: false,
    },
      (tx) => {
      console.log(tx);
      setPendingTxList(prev => [...prev, tx.hash]);
      });

    alchemy.ws.on({
      method: AlchemySubscription.MINED_TRANSACTIONS,
      addresses: [
        {from: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B'},
        {to: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B'}
      ],
      hashesOnly: false,
    },
    (tx) => {
    console.log(tx);
    setMinedTxList(prev => [...prev, tx.transaction.hash]);
    });

    alchemy.ws.on(
      "block",
      (block) => {
      console.log(block);
      setLatestBlock(block => block);
      });

      return () => {
        console.log("Stopped listening");
        stopTx();
      }
    },[]);

  function stopTx() {
  alchemy.ws.removeAllListeners();
}


  return (
    <div className="App">
      <h1>Watching Uniswap at: {'0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B'}</h1>
      <button onClick={stopTx}>Ermagerd Stahp</button>
      <h1>Latest Block: {latestBlock}</h1>
      <div className='transactions-wrapper'>
        <div className='pending'>
          <h1>Pending Transactions</h1>
          <ul>
          {
            pendingTxList.map((tx) => {
              return (
                <li key={tx}>
                <p>{tx}</p>
              </li>
              )
            })
          }
          </ul>
        </div>
        <div className='mined'>
          <h1>Mined Transactions</h1>
          <ul>
          {
            minedTxList.map((tx) => {
              return (
                <li key={tx}>
                <p>{tx}</p>
              </li>
              )
            })
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
