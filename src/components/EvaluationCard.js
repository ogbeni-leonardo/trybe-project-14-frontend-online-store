import React, { Component } from 'react';
import { shape, string, number, bool, arrayOf } from 'prop-types';

class EvaluationCard extends Component {
  render() {
    const { review: { email, stars, description } } = this.props;

    return (
      <div>
        <p>{ email }</p>

        { stars.map((star) => (
          <i
            className={ `fa-solid fa-star ${star.active ? '--active' : ''}` }
            key={ star.id }
          />
        )) }

        <p>{ description }</p>
      </div>
    );
  }
}

EvaluationCard.propTypes = {
  review: shape({
    id: string,
    email: string,
    stars: arrayOf(shape({ id: number, active: bool })),
    description: string,
  }).isRequired,
};

export default EvaluationCard;
