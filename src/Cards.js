import React, { Component } from "react";

class Cards extends Component {
  state = { selectedCard: undefined };

  selectCard = card => {
    this.props.publishPlayCardEvent(card);
    this.setState({ selectedCard: card });
  };

  render() {
    if (!this.props.showCards) {
      return null;
    }

    const cardValues = [1, 2, 3, 5, 8, 11];
    const boundedSelectCards = cardValues.map(card => this.selectCard.bind(this, card));

    return (
      <ul className="col-12 list-inline">
        {cardValues.map((cardValue, index) => (
          <li className="list-inline-item">
            <input
              type="button"
              className={`btn ${this.state.selectedCard == cardValue ? "btn-danger" : "btn-primary"}`}
              onClick={boundedSelectCards[index]}
              value={cardValue}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Cards;
