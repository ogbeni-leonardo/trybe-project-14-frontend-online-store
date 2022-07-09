import React, { Component } from 'react';
import { func } from 'prop-types';

import { getCategories } from '../services/api';

import './CategorySideBar.css';

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
      <aside className="categoriesSideBar">
        <nav>
          <ul className="categoriesList">
            { categories.map(({ id, name }) => (
              <li key={ id }>
                <button
                  className="categoryButton"
                  data-testid="category"
                  onClick={ () => fetchProducts(id, '') }
                  type="button"
                >
                  { name }
                </button>
              </li>
            )) }
          </ul>
        </nav>
      </aside>
    );
  }
}

CategorySideBar.propTypes = {
  fetchProducts: func.isRequired,
};

export default CategorySideBar;
