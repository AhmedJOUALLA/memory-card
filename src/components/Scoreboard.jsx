const Scoreboard = ({score , bestScore}) => {
  return (
    <div>
      <p>Score : {score}</p>
      <p>Best score: {bestScore}</p>
    </div>
  );
};

export default Scoreboard;