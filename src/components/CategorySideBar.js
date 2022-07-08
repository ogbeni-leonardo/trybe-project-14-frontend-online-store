import React, { Component } from 'react';
import { func } from 'prop-types';

import { getCategories } from '../services/api';

class CategorySideBar extends Component {
  constructor() {
    super();

    this.categoryFetcher = this.categoryFetcher.bind(this);
    this.state = { categories: [] };
  }

  componentDidMount() { this.categoryFetcher(); }

  async categoryFetcher() {
    const listOfCategories = await getCategories();
    this.setState({ categories: [...listOfCategories] });
  }

  render() {
    const { categories } = this.state;
    const { fetchProducts } = this.props;

    return (
      <aside>
        <ul>
          { categories.map(({ id, name }) => (
            <li key={ id }>
              <label htmlFor={ id } data-testid="category">
                <input
                  type="radio"
                  id={ id }
                  name="category"
                  value={ id }
                  onChange={ ({ target: { value } }) => fetchProducts(value, '') }
                />
                { name }
              </label>
            </li>
          )) }
        </ul>
      </aside>
    );
  }
}

CategorySideBar.propTypes = {
  fetchProducts: func.isRequired,
};

export default CategorySideBar;
