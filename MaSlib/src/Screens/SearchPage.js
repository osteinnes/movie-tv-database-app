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
  TouchableHighlight,
  ImageBackground,
} from 'react-native'

import config from '../config.js';

function urlForQueryAndPage(key, value, pageNumber) {
  
  var querystring = encodeURIComponent(value.trim())
  const API_KEY = config.API_KEY;

  console.log(API_KEY);

  return 'https://api.themoviedb.org/3/search/multi?api_key=' + API_KEY + '&language=en-US&query=' + querystring + '&page=1&include_adult=false';
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

    const imgUrl = 'https://www.themoviedb.org/static_cache/v4/logos/312x276-primary-green-74212f6247252a023be0f02a5a45794925c3689117da9d20ffe47742a665c518.png';

    console.log('SearchPage.render')
    return (
      <ImageBackground source={require('../assets/529113.jpg')} style={styles.container}>
        <Image
          style={{width: 312, height: 276}}
          source = {{uri: imgUrl}} />
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Type here.'
            placeholderTextColor='#ffffff'
        />
    
        <TouchableHighlight onPress={this._onSearchPressed} underlayColor={'#643e4044'}>
          <Image
            style={{width: 50, height: 44}}
            source={{uri: imgUrl}}
          />
        </TouchableHighlight>
      </View>
      {spinner}
      <Text style={styles.description}>{this.state.message}</Text>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    //color: '#656565',
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    //justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
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
    borderColor: '#01d277',
    borderRadius: 8,
    color: '#FFFFFF',

  },
  image: {
    height: 217,
    width: 138,
  },
  
});