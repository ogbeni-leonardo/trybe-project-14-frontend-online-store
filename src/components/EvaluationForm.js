import React, { Component } from 'react';
import { string } from 'prop-types';

import './EvaluationForm.css';
import EvaluationCard from './EvaluationCard';

class EvaluationForm extends Component {
  constructor() {
    super();

    this.getReviewsToThisProduct = this.getReviewsToThisProduct.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.haveValidEntries = this.haveValidEntries.bind(this);

    this.state = {
      ...this.initialState(),
    };
  }

  componentDidMount() {
    /* Ao renderizar este componente ele verifica se o localStorage foi iniciado com a chave válida.
    caso não tenha sido ele irá criá-la. */
    if (!localStorage.getItem('thylStoreReviews')) {
      localStorage.setItem('thylStoreReviews', JSON.stringify([]));
    }

    /* Atualize a lista de avaliações. */
    this.getReviewsToThisProduct();
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.haveValidEntries());
  }

  onStarClick(id) {
    const { startsEvaluationButton } = this.state;

    /* Vamos percorrer o array de estrelas do estado. */
    const newStarEvaluation = startsEvaluationButton
      .map((button) => {
        /* Primeiro adicionamos o botão à uma variável... Só assim é "permitido" manipulá-lo. */
        const updatedButton = button;
        /* O índice do botão atual é menor ou igual ao id? Se sim ele deve estar ativo (retorna true/false). */
        updatedButton.active = button.id <= id;

        return updatedButton;
      });

    this.setState({ startsEvaluationButton: newStarEvaluation });
  }

  onSubmit(event) {
    event.preventDefault();

    /* Pegue todo o conteúdo de avaliação já armazenado no localStorage */
    const allReviews = JSON.parse(localStorage.getItem('thylStoreReviews'));

    const { productID } = this.props;

    /* Adicione o produto e sua avaliação. */
    const { startsEvaluationButton, emailInput, descriptionInput } = this.state;

    allReviews.push({
      id: productID,
      email: emailInput.trim(),
      stars: startsEvaluationButton,
      description: descriptionInput.trim(),
    });

    localStorage.setItem('thylStoreReviews', JSON.stringify(allReviews));

    /* Atualize a lista de avaliações. */
    this.setState({ ...this.initialState() }, () => this.getReviewsToThisProduct());
  }

  getReviewsToThisProduct() {
    const allReviews = JSON.parse(localStorage.getItem('thylStoreReviews'));

    /* Filter as avaliações para que somente as desse produto sejam retornadas */
    const { productID } = this.props;
    const reviewsToThisProduct = allReviews.filter(({ id }) => id === productID);
    this.setState({ reviews: reviewsToThisProduct });
  }

  /* Esta função irá retornar o estado inicial deste componente. */
  initialState() {
    return ({
      startsEvaluationButton: [
        { id: 1, active: true },
        { id: 2, active: false },
        { id: 3, active: false },
        { id: 4, active: false },
        { id: 5, active: false },
      ],
      emailInput: '',
      descriptionInput: '',
      submitButtonIsDisabled: true,
      reviews: [],
    });
  }

  haveValidEntries() {
    const { emailInput } = this.state;

    /* Este Regex verifica se é um tipo de e-mail válido, embora não valide se é um e-mail real. */
    const isValidEmailType = /\S+@\S+\.\S+/.test(emailInput);

    /* Se o valor for válido será retornado false para o estado (disabled) do botão */
    this.setState({ submitButtonIsDisabled: !isValidEmailType });
  }

  render() {
    const {
      startsEvaluationButton,
      emailInput,
      descriptionInput,
      submitButtonIsDisabled,
      reviews,
    } = this.state;

    return (
      <div>
        <form className="evaluationForm">
          <div className="evaluationFormEmailContainer">
            <input
              className="evaluationFormEmail"
              data-testid="product-detail-email"
              name="emailInput"
              onChange={ this.onInputChange }
              placeholder="Digite seu email..."
              type="email"
              value={ emailInput }
            />

            { startsEvaluationButton.map((button) => (
              <button
                className={ `evaluationFormStar ${button.active ? '--active' : ''}` }
                data-testid={ `${button.id}-rating` }
                key={ button.id }
                onClick={ () => this.onStarClick(button.id) }
                type="button"
              >
                <i className="fa-solid fa-star" />
              </button>
            )) }
          </div>

          <textarea
            className="evaluationFormDescription"
            data-testid="product-detail-evaluation"
            name="descriptionInput"
            onChange={ this.onInputChange }
            placeholder="Descreva a sua avaliação (opcional)"
            value={ descriptionInput }
          />

          <button
            className="evaluationFormSubmit"
            data-testid="submit-review-btn"
            disabled={ submitButtonIsDisabled }
            onClick={ this.onSubmit }
            type="submit"
          >
            Avaliar
          </button>
        </form>
        <div>
          { reviews.length > 0 && reviews.map((review, index) => (
            <EvaluationCard key={ index } review={ review } />
          )) }
        </div>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  productID: string.isRequired,
};

export default EvaluationForm;
