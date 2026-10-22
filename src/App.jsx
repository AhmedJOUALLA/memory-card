import { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./components/CardList";
import Scoreboard from "./components/Scoreboard";


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

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function App() {
  const [players, setPlayers] = useState([]);

  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  const score = clickedIds.length;
  const hasWon = players.length > 0 && score === players.length;
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
        setPlayers(  shuffle(result));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (id) => {
    if (clickedIds.includes(id)) {
      setBestScore(Math.max(bestScore, score)) 
        setClickedIds([])
    } else {
      const newClickedIds = [...clickedIds, id]
      setClickedIds(newClickedIds) 
      if (newClickedIds.length > bestScore) {
        setBestScore(newClickedIds.length) 
      }
    }
    setPlayers(shuffle(players))
  }

  const handleRestart = () => {
    setClickedIds([]) 
    setPlayers(shuffle(players))
    
  }


  return (
    <div>
      <h1>Memory Card Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      {hasWon ?
        (
          <div>
            <h3>You win</h3>
            <p>You clicked all {players.length} cards without repeating.</p>
            <button onClick={handleRestart}>Play again</button>
          </div>
        ) : (
          <CardList players={players} onCardClick={handleClick} />
        )
      }
      
    </div>
  );
}

export default App;
