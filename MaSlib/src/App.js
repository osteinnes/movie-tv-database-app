import React, { Component } from 'react';

import {
  StackNavigator,
} from 'react-navigation'

import SearchPage from './Screens/SearchPage';
import SearchResults from './Screens/SearchResults';
import PropertyView from './Screens/PropertyView';
import SuggestionView from './Screens/SuggestionView';

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results : { screen: SearchResults },
  Property: { screen: PropertyView },
  Suggestion: { screen: SuggestionView },
});

export default App;
