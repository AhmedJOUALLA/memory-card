import { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./components/CardList";


const names = [
  "Cristiano Ronaldo",
  "Lionel Messi",
  "Erling Haaland",
  "Neymar",
  "Kylian Mbappe",
  "Mohamed Salah",
  "Kevin De Bruyne",
  "Vinicius Junior",
  "Jude Bellingham",
  "Harry Kane",
  "Robert Lewandowski",
  "Achraf Hakimi",
];
function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const requests = names.map((name) =>
      axios.get(
        `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${encodeURIComponent(name)}`,
      ),
    );
    Promise.all(requests)
      .then((responses) => {
        const result = responses
          .map((response) => response.data.player?.[0])
          .filter(Boolean)
          .map((p) => ({
            id: p.idPlayer,
            name: p.strPlayer,
            image: p.strThumb,
          }));
        setPlayers(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
            <h1>Memory Card Game</h1>
      <CardList players={players} />
    </div>
  );
}

export default App;
