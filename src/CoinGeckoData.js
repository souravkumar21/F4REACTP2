import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./currency.css"

function CoinGeckoData() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        setCoins(response.data);
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      
      <table>
        {coins.map(coin => (
          <tr key={coin.id}>
             <td className="img-name-td"><img src={coin.image} alt={coin.name} /><strong> {coin.name}</strong></td>
            <td className="symbol">{coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td style={coin.price_change_percentage_24h<0 ? {color:"red"}: {color:"green"}}> {coin.price_change_percentage_24h }% </td>
            <td>Mkt Cap: ${coin.market_cap}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default CoinGeckoData;