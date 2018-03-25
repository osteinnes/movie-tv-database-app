'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;

    function determineMedia(){
      if (item.media_type == 'tv') {
        return item.name;
      } else if(item.media_type == 'movie'){
        return item.title;
      } else {
        return 'No title'
      }
    };
   
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}
                numberOfLines={1}>{determineMedia()}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component {
  static navigationOptions = {
    title: 'Results',
    headerStyle: {
      backgroundColor: '#22425F',
    },
    headerTintColor: '#FFFFFF',
  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
  <ListItem
    item={item}
    index={index}
    onPressItem={this._onPressItem}
  />
) ;

_onPressItem = (index) => {
  const { navigate, state } = this.props.navigation;
  navigate('Property', {property: state.params.listings[index]});
};

  render() {
  const {params} = this.props.navigation.state;
  return (
    <FlatList
      data={params.listings}
      keyExtractor ={this._keyExtractor}
      renderItem={this._renderItem}
    />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});