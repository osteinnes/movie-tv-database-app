'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';

export default class PropertyView extends Component {
  static navigationOptions = {
    //title: 'Details',
    headerStyle: {
      backgroundColor: '#22425F',
    },
    headerTintColor: '#FFFFFF',
  };

  render() {
    const { params } = this.props.navigation.state;
    var media_type = params.property.media_type;
    if (media_type == 'tv') {
      var title = params.property.name;
    } else if (media_type == 'movie') {
      var title = params.property.title;
    }

    var imgurl = 'https://image.tmdb.org/t/p/w500' + params.property.poster_path;

    console.log(media_type)
    

    return (
      <View style={styles.container}>
        <Image style={styles.image}
            source={{uri: imgurl}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{media_type}</Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.separator}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 500,
    height: 600
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  sivert: {
    fontSize: 33,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: '#0a4096',

  }
});