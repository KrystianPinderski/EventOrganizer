import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import AppRouter from './App/Router/AppRouter';
EStyleSheet.build(
  {
    $backgroundColor: '#FFF',
    $padding: 12,
    $buttonColor:'#FFFF00',
    $inputUnderlineColor:'#FF00FF'
  }
);
export default class App extends Component {
  render() {
    return (
      <AppRouter/>
    );
  }
}
