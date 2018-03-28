import React, { Component } from 'react';

import {
  StackNavigator,
} from 'react-navigation'

import SearchPage from './Screens/SearchPage';
import SearchResults from './Screens/SearchResults';
import SuggestionView from './Screens/SuggestionView';
import PersonView from './Screens/PersonView';

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results : { screen: SearchResults },
  Suggestion: { screen: SuggestionView },
  Person: {screen: PersonView},
});

export default App;
