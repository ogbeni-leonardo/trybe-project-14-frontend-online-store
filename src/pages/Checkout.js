import React from "react";

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="fullName">Nome Completo</label>
          <input
            type="text"
            data-testid="checkout-fullname"
            id="fullName"
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            data-testid="checkout-email"
            id="email"
          />

          <label htmlFor="cpf">CPF</label>
          <input
          // Para considerar os pontos e traços
            type="text"
            data-testid="checkout-cpf"
            id="cpf"
          />

          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            data-testid="checkout-phone"
            id="phone"
          />

          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            data-testid="checkout-cep"
            id="cep"
          />

          <label htmlFor="address">Endereço</label>
          <input 
            type="text"
            data-testid="checkout-address"
            id="address"
          />
        </form>
      </div>
    );
  }
}

export default Checkout;