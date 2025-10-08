import { useState, useEffect } from "react";
import coinImg from "./assets/coin.png";
import "./App.css";

const fallbackCoins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "btc", current_price: 48390 },
  { id: "ethereum", name: "Ethereum", symbol: "eth", current_price: 3200 },
  { id: "tether", name: "Tether", symbol: "usdt", current_price: 9 },
  { id: "binancecoin", name: "Binance Coin", symbol: "bnb", current_price: 410 },
  { id: "ripple", name: "XRP", symbol: "xrp", current_price: 0.75 },
  { id: "cardano", name: "Cardano", symbol: "ada", current_price: 2.15 },
  { id: "solana", name: "Solana", symbol: "sol", current_price: 150 },
  { id: "polkadot", name: "Polkadot", symbol: "dot", current_price: 28 },
  { id: "dogecoin", name: "Dogecoin", symbol: "doge", current_price: 0.25 },
  { id: "usd-coin", name: "USD Coin", symbol: "usdc", current_price: 1 },
];

function App() {
  const [coins, setCoins] = useState([]);
  const [q, setQ] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    fetch(url)
      .then((r) => r.json())
      .then((response) => {
        setCoins(response);
      })
      .catch(() => setCoins(fallbackCoins));
  }, []);

  const match = q.trim()
    ? coins.find(
      (c) =>
        c.name.toLowerCase() === q.trim().toLowerCase() ||
        c.symbol.toLowerCase() === q.trim().toLowerCase()
    )
    : null;

  return (
    <div className="App">
      <header className="title">
        <div className="title-left">
          <img src={coinImg} alt="Coin" className="title-icon" />
          <h1>Cryptocurrency Prices</h1>
        </div>
      </header>

      <section className="middle search-card">
        <input
          className="middle-input"
          type="text"
          placeholder="Search for a Coin!"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="middle-price">
          {q &&
            (match
              ? `$${match.current_price.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}`
              : "Not found")}
        </div>
      </section>

      <div className="card">
        <div className="scrollable">
          <table className="prices">
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Current Price</th>
              </tr>
            </thead>
            <tbody>
              {coins &&
                coins.map((coin) => (
                  <tr
                    key={coin.id}
                    onClick={() => setSelectedCoin(coin)}
                    style={{ backgroundColor: selectedCoin?.id === coin.id ? '#000000ff' : 'transparent' }}
                  >
                    <td>{coin.name}</td>
                    <td>{coin.symbol}</td>
                    <td>${coin.current_price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {selectedCoin && (
          <div className="details">
            <h2>{selectedCoin.name} Details</h2>
            <div className ="container">
              <div>
                <span>Market Cap: </span>
                <span>{selectedCoin.market_cap?.toLocaleString()}$</span>
              </div>
              <div>
                <span>24h High: </span>
                <span>${selectedCoin.high_24h?.toLocaleString()}</span>
              </div>
              <div>
                <span>24h Low: </span>
                <span>${selectedCoin.low_24h?.toLocaleString()}</span>
              </div>
              <div>
                <span>Price Change 24h: </span>
                <span className={selectedCoin.price_change_24h > 0 ? 'positive' : 'negative'}>
                  {selectedCoin.price_change_24h?.toFixed(2)}%
                </span>
              </div>
              <div style={{gridColumn: 'span 2'}}>
                <span>All time High: </span>
                <span>${selectedCoin.ath?.toLocaleString()}</span>
              </div>
              </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <span>Created By: Stanley & Justin</span>
        </div>
      </footer>
    </div>
  );
}

export default App;