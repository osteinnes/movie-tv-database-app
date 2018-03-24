'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native'

function urlForQueryAndPage(key, value, pageNumber) {
  
  var querystring = encodeURIComponent(value.trim())

  return 'https://api.themoviedb.org/3/search/multi?api_key=f5c5a37d162f05af94479447a85ce10d&language=en-US&query=' + querystring + '&page=1&include_adult=false';
}

export default class SearchPage extends Component<{}> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
      this.state = {
        searchString: '',
        isLoading: false,
        message: '',
      };
  }
  _onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({searchString: event.nativeEvent.text});
    console.log('Current: ' +this.state.searchString+', Next: '+event.nativeEvent.text);
  };

  _executeQuery = (query) => {
    console.log(query);
    this.setState({isLoading: true});
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
  };

  _onSearchPressed = () => {
    const query = urlForQueryAndPage('title', this.state.searchString, 1);
    this._executeQuery(query);
  };

  _handleResponse = (response) => {
    this.setState({ isLoading: false, message: ''});
    if (response.total_results > 0) {
      this.props.navigation.navigate(
        'Results', {listings: response.results}
      );
    } else{
      this.setState({ message: 'Title not recognized; please try again.'});
    }
  };

  render() {
    const spinner = this.state.isLoading ?
    <ActivityIndicator size='large'/> : null;

    console.log('SearchPage.render')
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for movies and tv series!
        </Text>
        <View style={styles.flowRight}>
    <TextInput
      underlineColorAndroid={'transparent'}
      style={styles.searchInput}
      value={this.state.searchString}
      onChange={this._onSearchTextChanged}
      placeholder='Search via title'
    />
    <Button
      onPress={this._onSearchPressed}
      color='#48BBEC'
      title='Go'
    />
    </View>
    {spinner}
    <Text style={styles.description}>{this.state.message}</Text>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },

  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    height: 217,
    width: 138,
  },
  
});