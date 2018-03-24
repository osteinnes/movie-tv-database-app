import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation'

import SearchPage from './Screens/SearchPage';
import SearchResults from './Screens/SearchResults';
import PropertyView from './Screens/PropertyView';
  
const App = StackNavigator({
  Home: { screen: SearchPage },
  Results : { screen: SearchResults },
  Property: { screen: PropertyView},
});
export default App;