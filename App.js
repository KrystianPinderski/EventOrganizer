import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import AppRouter from './App/Router/AppRouter';
EStyleSheet.build(
  {
    $backgroundColor: '#FFF',
    $padding: 4,
    $buttonColor:'#00BE2A',
    $inputUnderlineColor:'#00BE2A',
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
