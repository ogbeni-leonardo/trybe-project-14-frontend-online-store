import React, { Component } from 'react';

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

    return (
      <aside>
        <ul>
          { categories.map(({ id, name }) => (
            <li data-testid="category" key={ id }>
              <label htmlFor={ id }>
                <input type="radio" id={ id } name="category" />
                { name }
              </label>
            </li>
          )) }
        </ul>
      </aside>
    );
  }
}

export default CategorySideBar;
