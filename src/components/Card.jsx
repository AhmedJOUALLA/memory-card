const Card = ({ player, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick(player.id)}>
        <img src={player.image} alt={player.name} />
        <p>{player.name}</p>
      </div>
  );
};

export default Card;
