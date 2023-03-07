import './App.css';
import { Alchemy, AlchemySubscription } from "alchemy-sdk";
import { useEffect, useRef, useState } from 'react';
import StarSVG from './StarSVG';
import BlockSpaceshipSVG from './BlockSpaceshipSVG';
import { motion, AnimatePresence } from 'framer-motion';
import { exit } from 'process';


const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY
});

function App() {
  const pendingContainer = useRef<HTMLDivElement>(null);
  const spaceship = useRef<HTMLDivElement>(null);
  const [pendingTxList, setPendingTxList] = useState<any[]>([]);
  const [latestBlock, setLatestBlock] = useState<string[]>(['']);

  useEffect(() => {
    console.log("listening");
    alchemy.ws.on(
      "block",
      (block) => {
      console.log(block);
      setLatestBlock([`${block}`]);
      });

    alchemy.ws.on({
      method: AlchemySubscription.PENDING_TRANSACTIONS,
      toAddress: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B',
      hashesOnly: false,
    },
      (tx) => {
      console.log(`To Uniswap: ${tx.hash}`);
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
      console.log(`Mined ${tx.transaction.hash}`);
      setPendingTxList(prev =>
        prev.filter(
          entry => entry !== tx.transaction.hash))
    });

    return () => {
        console.log("Stopped listening");
        stopTx();
      }
    },[]);

    useEffect(() => {
      console.log(`Pending Tx List: ${pendingTxList}`);
    }, [pendingTxList]);

    function stopTx() {
      alchemy.ws.removeAllListeners();
      console.log("Stopped listening");
  }

  return (
    <div className="App">
      <h1>Watching Uniswap at: {'0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B'}</h1>
      <button onClick={stopTx}>Ermagerd Stahp</button>
      <h1>Latest Block: {latestBlock}</h1>
      <div className='transactions-wrapper'>
        <div className='pending-container' ref={pendingContainer}>
          <AnimatePresence>
          {
            pendingTxList.map((tx) => {
              return (
                <motion.div
                  className='star-container'
                  layout
                  key={tx}

                  style={{
                    height: 65,
                    width: 65,
                    margin: 0,
                    padding: 0
                  }}
                  initial={{
                    opacity: 0,
                    x: -100,
                    y: -200
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 360,
                    x: 0,
                    y: 0
                  }}
                  exit={{
                    x: 650,
                    y: 784,
                    opacity: 0
                  }}
                  transition={{
                    duration: 1,
                    opacity: {duration: 1},
                    rotate: {
                      ease: "linear",
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: 0
                    }
                  }}
                  >
                  <StarSVG />
                </motion.div>
              )
              })
            }
            </AnimatePresence>
        </div>
        <div className='right-side-container'>
          <div className='transaction-data-container'>

          </div>
          <AnimatePresence>
            {
              latestBlock.map(block => {
                return (
                <motion.div
                  key={block}
                  className='spaceship-container'

                  initial={{
                    y: 100,
                    opacity: 0,

                  }}
                  animate={{
                    y: 0,
                    opacity: 1,

                  }}
                  exit={{
                    x: 500
                  }}
                  transition={{
                    delay: 1.5
                  }}
                >
                  <BlockSpaceshipSVG />
                </motion.div>
                )
              })
            }
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
