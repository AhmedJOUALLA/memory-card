import Card from "./Card";

const CardList = ({ players }) => {
  return (
    <div className="card-grid">
      {players.map((player) => (
        <Card  key={player.id} player={player} />
      ))}
    </div>
  );
};

export default CardList;
