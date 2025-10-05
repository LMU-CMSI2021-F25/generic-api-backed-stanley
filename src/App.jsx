import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [coins, setCoins] = useState([]);
    useEffect(() => {
      const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
      fetch(url)
        .then((r) => r.json())
        .then((response) => {
          setCoins(response);
        });
    }, []);

  return (
    <div className="App">
      <h1>Cryptocurrency Prices</h1>
      <div className = "card">
        <div className = "scrollable">
          <table>
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
                  <tr key={coin.id}>
                    <td>{coin.name}</td>
                    <td>{coin.symbol}</td>
                    <td>${coin.current_price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
}

export default App


