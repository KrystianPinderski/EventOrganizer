import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MainScreen from './App/Components/MainScreen/MainScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build(
  {
    $backgroundColor:'#FFF',
    $padding:24
  }
);
export default class App extends Component {
  render() {
    return (
        <MainScreen/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
