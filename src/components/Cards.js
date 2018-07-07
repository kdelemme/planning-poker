import React, { Component } from "react";

class Cards extends Component {
  state = { selectedCard: undefined };

  selectCard = card => {
    this.props.handlePlayCard(card);
    this.setState({ selectedCard: card });
  };

  render() {
    const { show } = this.props;
    const cardValues = [1, 2, 3, 5, 8, 13, 21, "∞"];
    const boundedSelectCards = cardValues.map(card => this.selectCard.bind(this, card));

    return (
      <div className="row">
        <ul className="col-12 list-inline">
          {cardValues.map((cardValue, index) => (
            <li key={index} className="list-inline-item">
              <input
                type="button"
                className={`btn ${this.state.selectedCard == cardValue ? "btn-danger" : "btn-primary"}`}
                onClick={boundedSelectCards[index]}
                value={cardValue}
                disabled={!show}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cards;
