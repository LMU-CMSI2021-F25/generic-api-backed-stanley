import { useState, useEffect } from "react";
import coinImg from "./assets/coin.png";
import "./App.css";

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
      });
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

      <section className="search-card">
        <input
          className="input"
          style={{ borderRadius: "8px", backgroundColor: 'rgb(125, 255, 255)' }}
          type="text"
          placeholder="Search for a Coin!"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="price">
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
                    style={{
                      backgroundColor:
                        selectedCoin.id === coin.id
                          ? "rgba(247, 53, 53, 1)"
                          : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <td>{coin.name}</td>
                    <td>{coin.symbol.toUpperCase()}</td>
                    <td>${coin.current_price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
