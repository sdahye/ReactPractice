import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCost, setSelectedCost] = useState(0);
  const [money, setMoney] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response => response.json()))
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])
  const onSelect = (event) => {
    setSelectedCost(event.target.value);
  }
  const handleInput = (event) => {
    setMoney(event.target.value);
  }
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (<strong>Loading...</strong>) : (
        <select onChange={onSelect}>
          <option key="">Select coin</option>
          {coins.map((coin) => 
            <option
              key={coin.id}
              value={(coin.quotes.USD.price).toFixed(5)}
              symbol={coin.symbol}
            >
              {coin.name}({coin.symbol}) : ${(coin.quotes.USD.price).toFixed(5)} USD
            </option>)}
        </select>
      )}
      <br />
      <label>Dollars: </label>
      <input
        onChange={handleInput}
        type="number"
        placeholder="Enter your USD dollars..."
      ></input>
      <hr />
      {(selectedCost !== 0)&&(money !== 0) ? <h3>You can buy {(money/selectedCost).toFixed(5)} coins</h3> : null}
    </div>
  );
}

export default App;