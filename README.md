# Ethereum Mempool Visualizer

Watch a small corner of the ethereum blockchain being built in real time. Reads transactions to and from the Uniswap Router Smart Contract before they are bundled into blocks, and provides information like transaction hash, amount, sender/destination, etc.

## Getting Started

In the project directory, you can run to install dependencies:

### `npm i`

A free Alchemy API key can be generated through signup here: https://www.alchemy.com/ethereum
which can then be included in a .env file in the root directory assigned to a variable called
REACT_APP_ALCHEMY_API_KEY.

You can run the app with:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Each star represents a transaction, click on it to learn more about each transaction.

## Tech Stack

Uses Alchemy Ethereum RPC on the backend, and React on the frontend. Art assets made with Inkscape and animated with Framer Motion
