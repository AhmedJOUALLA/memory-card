import Card from "./Card";

const CardList = ({ players, onCardClick }) => {
  return (
    <div className="card-grid">
      {players.map((player) => (
        <Card  key={player.id} player={player} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardList;
