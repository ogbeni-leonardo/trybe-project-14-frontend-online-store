import React, { Component } from 'react';
import { shape, string, number, bool, arrayOf } from 'prop-types';

import './EvaluationCard.css';

class EvaluationCard extends Component {
  render() {
    const { evaluation: { email, stars, description } } = this.props;

    return (
      <div className="evaluationCard">
        <div className="evaluationCardEmailContainer">
          <p className="evaluationCardEmail">{ email }</p>

          { stars.map((star) => (
            <button
              className={ `evaluationCardStar ${star.active ? '--active' : ''}` }
              key={ star.id }
              type="button"
            >
              <i className="fa-solid fa-star" />
            </button>
          )) }
        </div>

        <p className="evaluationCardDescription">{ description }</p>
      </div>
    );
  }
}

EvaluationCard.propTypes = {
  evaluation: shape({
    id: string,
    email: string,
    stars: arrayOf(shape({ id: number, active: bool })),
    description: string,
  }).isRequired,
};

export default EvaluationCard;
