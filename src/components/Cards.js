import React, { useState } from "react";

function Cards(props) {
  const [selectedCard, setSelectedCard] = useState();

  const selectCard = card => {
    props.handlePlayCard(card);
    setSelectedCard(card);
  };

  const { disabled } = props;
  const cardValues = [1, 2, 3, 5, 8, 13, 21, "∞"];
  const boundedSelectCards = cardValues.map(card => selectCard.bind(this, card));

  return (
    <div className="row">
      <ul className="col-12 list-inline">
        {cardValues.map((cardValue, index) => (
          <li key={index} className="list-inline-item">
            <input
              type="button"
              className={`btn mb-2 ${selectedCard === cardValue ? "btn-danger" : "btn-primary"}`}
              onClick={boundedSelectCards[index]}
              value={cardValue}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
    </div>
  );

}

export default Cards;
