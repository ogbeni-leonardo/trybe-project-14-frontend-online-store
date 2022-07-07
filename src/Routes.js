import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

class Content extends React.Component {
  render() {
    return (
      <Route path="/" component={ Home } />
    );
  }
}

export default Content;