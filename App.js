import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import AppRouter from './App/Router/AppRouter';
EStyleSheet.build(
  {
    $backgroundColor: '#FFF',
    $padding: 4,
    $buttonColor:'#30D5C8',
    $inputUnderlineColor:'#FF00FF',
    $inputWidth:180
  }
);
export default class App extends Component {
  render() {
    return (
      <AppRouter/>
    );
  }
}
