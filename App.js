import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import AppRouter from './App/Router/AppRouter';
EStyleSheet.build(
  {
    $backgroundColor: '#FFF',
    $padding: 24
  }
);
export default class App extends Component {
  render() {
    return (
      <AppRouter/>
    );
  }
}
