import { useEffect, useState } from "react";
import "./App.css";
import { SingleCard } from "./components/SingleCard";

const cardsImage = [
  { src: "helmet-1.png", matched: false },
  { src: "potion-1.png", matched: false },
  { src: "ring-1.png", matched: false },
  { src: "scroll-1.png", matched: false },
  { src: "shield-1.png", matched: false },
  { src: "sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCard = () => {
    const shuffledCards = [...cardsImage, ...cardsImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //Handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCard();
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <>
      <div className="container">
        <div className="App">
          <h1>Magic Match</h1>
          <button onClick={shuffleCard}>New Game</button>
        </div>

        <p>Turns: {turns}</p>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}

          
        </div>
      </div>
    </>
  );
}

export default App;
