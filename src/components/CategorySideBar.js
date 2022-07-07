import React from 'react';
import { getCategories } from '../services/api';

class CategorySideBar extends React.Component {
  constructor() {
    super();
    this.categoryFetcher = this.categoryFetcher.bind(this);
    this.createListFromCategories = this.createListFromCategories.bind(this);
    this.state = { categories: [] };
  }

  componentDidMount() {
    this.categoryFetcher();
  }

  async categoryFetcher() {
    const listOfCategories = await getCategories();
    this.setState({
      categories: [...listOfCategories],
    });
  }

  createListFromCategories() {
    const { categories } = this.state;
    return categories.map((category) => (
      <li data-testid="category" key={ category.id }>
        <input type="radio" id={ category.id } />
        <label htmlFor={ category.id }>{category.name}</label>
      </li>));
  }

  render() {
    return (
      <aside>
        <ul>
          { this.createListFromCategories() }
        </ul>
      </aside>
    );
  }
}

export default CategorySideBar;
