'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

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

    var country = params.property.origin_country;
    var summary = params.property.overview;

    if (country != null) {
            var titleText = title + ' ' + '(' + country + ')';
    } else {
            var titleText = title;
    }

    console.log(params.property);

    var imgurl = 'https://image.tmdb.org/t/p/w500' + params.property.poster_path;

    console.log(media_type)
    

    return (
    <HeaderImageScrollView
      maxHeight={500}
      minHeight={80}
      fadeOutForeground
      headerImage={{uri: imgurl}}
      
      overScrollMode="never"
      overlayColor="#22425F"
      maxOverlayOpacity={0.9}
      renderForeground={() => (
        <View style={styles.titleContainer}>
          <Text style={styles.imageTitle}>Cat</Text>
        </View>
      )}
      foregroundParallaxRatio={3}
    >
      <View style={{ height: 1000, backgroundColor: '#3e4144' }}>
        <TriggeringView onHide={() => console.log('text hidden')}>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={styles.text}>{summary}</Text>
        </TriggeringView>
      </View>
    </HeaderImageScrollView>
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
    fontSize: 25,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    padding: 15,
    color: '#FFFFFF',
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
});