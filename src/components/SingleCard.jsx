export const SingleCard = ({ card , handleChoice , flipped , disabled }) => {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }
    }

  return (
    <>
      <div className="card" >
        <div className={flipped ? "flipped" : ""}>
          <img src={card.src} alt="card front" className="front" />
          <img src="cover.png" onClick={handleClick} alt="card back" className="back" />
        </div>
      </div>
    </>
  );
};
