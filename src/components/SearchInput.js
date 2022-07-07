import React from 'react';

class SearchInput extends React.Component {
  render() {
    return (
      <form>
        <input
          type="text"
        />
        <button
          type="submit"
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default SearchInput;
