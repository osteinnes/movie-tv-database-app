'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  ImageBackground,
  DrawerLayoutAndroid,
  TouchableHighlight,
} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import config from '../config.js';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Footer, FooterTab, Title} from 'native-base';




export default class PropertyView extends Component {
  static navigationOptions = {
    //title: 'Details',
    headerStyle: {
      backgroundColor: '#22425F',
    },
    headerTintColor: '#FFFFFF',
    header: null,
  };


  constructor(props) {
    super(props);
      this.state = {
        rFi: '',
        rSe: '',
        rTh: '',
        rFo: '',
        similar: false,
      };
  }

  _handleResponse = (response) => {

    if(response.total_results > 0) {
       this.setState({
         rFi: response.results[1],
         rSe: response.results[2],
         rTh: response.results[3],
         rFo: response.results[4],
         similar: true,
       });

    } else {
      this.setState({
        similar: false,
      });
    }

    console.log(response.status_code);

  };

  _determineTitleText = (country, title) => {
    if (country != null) {
            var titleText = title + ' ' + '(' + country + ')';
    } else {
            var titleText = title;
    }
    return titleText;
  };

  _determineMediaType = (media_type, params) => {
    if (media_type == 'tv') {
      var title = params.property.name;
    } else if (media_type == 'movie') {
      var title = params.property.title;
    }
    return title;
  };

  _determinemediaTypeRec = (params) => {
    if (params.media_type == 'tv') {
      var title = params.name;
    } else if (params.media_type == 'movie') {
      var title = params.title;
    }
    return title;
  };

  onPress = () => {
   this.props.navigation.navigate('Property', {property: this.state.rFi});
 };

  render() {
    const { params } = this.props.navigation.state;
    var media_type = params.property.media_type;
    var title = this._determineMediaType(media_type, params);
    var country = params.property.origin_country;
    var summary = params.property.overview;
    var titleText = this._determineTitleText(country, title);





    console.log('heiiiiia');


    console.log(params.property);

    var imgurl = 'https://image.tmdb.org/t/p/w500' + params.property.poster_path;

    console.log(title)

    var recommended = _urlRecommendedMedia(params.property.id, media_type);

    fetch(recommended)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
     console.log(error)
   );


    console.log(recommended)

if (this.state.similar) {
    var firstRecommendedTitle = this.state.rFi.title;
    var firstRecommendedUri = this.state.rFi.poster_path;
    var firstRecommendedDescription = this.state.rFi.overview;

    var secondRecommendedTitle = this.state.rSe.title;
    var secondRecommendedUri = this.state.rSe.poster_path;
    var secondRecommendedDescription = this.state.rSe.overview;

    var thirdRecommendedTitle = this.state.rTh.title;
    var thirdRecommendedUri = this.state.rTh.poster_path;
    var thirdRecommendedDescription = this.state.rTh.overview;

    var fourthRecommendedTitle = this.state.rFo.title;
    var fourthRecommendedUri = this.state.rFo.poster_path;
    var fourthRecommendedDescription = this.state.rFo.overview;
}
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
      <View style={{ backgroundColor: '#3e4144' }}>
        <TriggeringView onHide={() => console.log('text hidden')}>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={styles.text}>{summary}</Text>
          <Text style={styles.title}>Similar</Text>

        </TriggeringView>

      </View>
              <Content>
              {this.state.similar}
              <Grid style={{backgroundColor: '#3e4144'}}>
                <Col>
                  <TouchableHighlight onPress={this.onPress}>
                    <Row>
                        <Card>
                          <CardItem header style={styles.cardItems}>
                              <Text style ={styles.headerText}>
                                {firstRecommendedTitle}
                              </Text>
                          </CardItem>
                            <CardItem>
                            <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + firstRecommendedUri}}/>
                            </CardItem>
                        </Card>
                    </Row>
                  </TouchableHighlight>

                  <TouchableHighlight onPress={this.onPress}>
                    <Row>
                        <Card>
                          <CardItem header style={styles.cardItems}>
                              <Text style ={styles.headerText}>
                                {secondRecommendedTitle}
                              </Text>
                          </CardItem>
                            <CardItem>
                            <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + secondRecommendedUri}}/>
                            </CardItem>
                        </Card>
                    </Row>
                  </TouchableHighlight>
                </Col>

                <Col>
                <TouchableHighlight onPress={this.onPress}>
                  <Row>
                      <Card>
                        <CardItem header style={styles.cardItems}>
                            <Text style ={styles.headerText}>
                              {thirdRecommendedTitle}
                            </Text>
                        </CardItem>
                          <CardItem>
                          <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + thirdRecommendedUri}}/>
                          </CardItem>
                      </Card>
                  </Row>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.onPress}>
                  <Row>
                      <Card>
                        <CardItem header style={styles.cardItems}>
                            <Text style ={styles.headerText}>
                              {fourthRecommendedTitle}
                            </Text>
                        </CardItem>
                          <CardItem>
                          <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + fourthRecommendedUri}}/>
                          </CardItem>
                      </Card>
                  </Row>
                </TouchableHighlight>
                </Col>
              </Grid>
        </Content>
      </HeaderImageScrollView>


  );
  }
}

//////////////////////////////////////////////////////////


function _urlRecommendedMedia(id, mediaType) {

  const API_KEY = config.API_KEY;

  if (mediaType == "tv") {
    var queryString = 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + API_KEY; //+ '&language=en-US&page=1'
  } else if (mediaType == "movie") {
    var queryString = 'https://api.themoviedb.org/3/tv/' + id + '/similar?api_key=' + API_KEY;
  } else {
    var queryString = null;
  }

  return queryString;
};




//////////////////////////////////////////////////////////



const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  cardItems: {
    alignSelf: 'center',
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  cardImage: {
    height: 180,
    width: null,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3e4144',
  },
  headerText:{
    textAlign: 'center',
    alignSelf: 'center',
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
