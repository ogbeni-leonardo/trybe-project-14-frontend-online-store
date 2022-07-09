import React, { Component } from 'react';
import { string } from 'prop-types';

import EvaluationCard from './EvaluationCard';
import './EvaluationForm.css';

class EvaluationForm extends Component {
  constructor() {
    super();

    this.getEvaluationToThisProduct = this.getEvaluationToThisProduct.bind(this);
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
    if (!localStorage.getItem('thylEvaluations')) {
      localStorage.setItem('thylEvaluations', JSON.stringify([]));
    }

    /* Atualize a lista de avaliações. */
    this.getEvaluationToThisProduct();
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
    const allEvaluations = JSON.parse(localStorage.getItem('thylEvaluations'));

    const { productID } = this.props;

    /* Adicione o produto e sua avaliação. */
    const { startsEvaluationButton, emailInput, descriptionInput } = this.state;

    allEvaluations.push({
      id: productID,
      email: emailInput.trim(),
      stars: startsEvaluationButton,
      description: descriptionInput.trim(),
    });

    localStorage.setItem('thylEvaluations', JSON.stringify(allEvaluations));

    /* Atualize a lista de avaliações logo após limpar as informações do formulário. */
    this.setState({ ...this.initialState() }, () => this.getEvaluationToThisProduct());
  }

  getEvaluationToThisProduct() {
    const allEvaluations = JSON.parse(localStorage.getItem('thylEvaluations'));

    /* Filter as avaliações para que somente as desse produto sejam retornadas */
    const { productID } = this.props;
    const evaluationsToThisOne = allEvaluations.filter(({ id }) => id === productID);
    this.setState({ evaluations: evaluationsToThisOne });
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
      evaluations: [],
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
      evaluations,
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
          { evaluations.length > 0 && evaluations.map((review, index) => (
            <EvaluationCard key={ index } evaluation={ review } />
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
