const Card = ({ player }) => {
  return (
    <div className="card">
        <img src={player.image} alt={player.name} />
        <p>{player.name}</p>
      </div>
  );
};

export default Card;
