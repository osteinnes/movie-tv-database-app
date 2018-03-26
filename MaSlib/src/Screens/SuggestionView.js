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

import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Footer,
  FooterTab,
  Title
} from 'native-base';

import config from '../config.js';


export default class SuggestionView extends Component {
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
        similar: '',
      };
  }

  componentWillMount() {

    const { params } = this.props.navigation.state;
    var imgUrl = 'https://image.tmdb.org/t/p/w500' + params.property.poster_path;

    var title = this._determineMediaType(params.media_type, params.property);

    console.log(title);

    this.setState({
      media_type: params.media_type,
      title: title,
      country: params.property.origin_country,
      summary: params.property.overview,
      titleText: this._determineTitleText(params.property.origin_country, this._determineMediaType(params.media_type, params)),
      imgurl: imgUrl,
    })
console.log(params.media_type);
    var recommended = _urlRecommendedMedia(params.property.id, params.media_type);
    console.log(recommended);
    fetch(recommended)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
     console.log(error)
   );

  }

  _handleResponse = (response) => {

    if(response.total_results >= 4) {
       this.setState({
         rFi: response.results[1],
         rSe: response.results[2],
         rTh: response.results[3],
         rFo: response.results[4],
         rFiTitle: this._determinemediaTypeRec(this.state.media_type, response.results[1]),
         rSeTitle: this._determinemediaTypeRec(this.state.media_type, response.results[2]),
         rThTitle: this._determinemediaTypeRec(this.state.media_type, response.results[3]),
         rFoTitle: this._determinemediaTypeRec(this.state.media_type, response.results[4]),
         similar: true,
       });
       console.log('similar skal være trye')
    } else {
      this.setState({
        similar: false,
      })
    }


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
      var title = params.name;
    } else if (media_type == 'movie') {
      var title = params.title;
    }
    return title;
  };

  _determinemediaTypeRec = (media_type, params) => {
    if (media_type == 'tv') {
      var title = params.name;
    } else if (media_type == 'movie') {
      var title = params.title;
    }
    return title;
  };

  onPress = () => {
   this.props.navigation.navigate('Property', {property: this.state.rFi});
 };

  render() {

    console.log(this.state.Similar);

    return (
    <HeaderImageScrollView
      maxHeight={500}
      minHeight={80}
      fadeOutForeground
      headerImage={{uri: this.state.imgurl}}

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
      <View style={{ minHeight: 251,backgroundColor: '#3e4144' }}>
        <TriggeringView onHide={() => console.log('text hidden')}>
          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.text}>{this.state.summary}</Text>
          {doDrawTextIfSimilar(this.state.similar)}

        </TriggeringView>

      </View>
      {doDrawSimilar(this.state.similar, this.state, this.props)}
      </HeaderImageScrollView>


  );
  }
}

//////////////////////////////////////////////////////////

function _urlRecommendedMedia(id, mediaType) {

  const API_KEY = config.API_KEY;

  if (mediaType == "movie") {
    var queryString = 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + API_KEY; //+ '&language=en-US&page=1'
  } else if (mediaType == "tv") {
    var queryString = 'https://api.themoviedb.org/3/tv/' + id + '/similar?api_key=' + API_KEY;
  } else {
    var queryString = null;
  }

  return queryString;
};

function doDrawTextIfSimilar(similar){
  if (similar == true) {
    return(<Text style={styles.title}>Similar</Text>);
  } else {
    return null;
  }
}

function doDrawSimilar(similar, state, props) {
  if (similar == true) {
    return(<Content>
    <Grid style={{backgroundColor: '#3e4144'}}>
      <Col style={{paddingLeft: 5}}>
        <TouchableHighlight onPress={() =>
          props.navigation.navigate(
            'Suggestion', {property: state.rFi, media_type: state.media_type}
          )
        }>
          <Row>
              <Card>
                <CardItem header style={styles.cardItems}>
                    <Text style ={styles.headerText}>
                      {state.rFiTitle}
                    </Text>
                </CardItem>
                  <CardItem>
                  <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + state.rFi.poster_path}}/>
                  </CardItem>
              </Card>
          </Row>
        </TouchableHighlight>

        <TouchableHighlight onPress={() =>
          props.navigation.navigate(
            'Suggestion', {property: state.rSe, media_type: state.media_type}
          )
        }>
          <Row>
              <Card>
                <CardItem header style={styles.cardItems}>
                    <Text style ={styles.headerText}>
                      {state.rSeTitle}
                    </Text>
                </CardItem>
                  <CardItem>
                  <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + state.rSe.poster_path}}/>
                  </CardItem>
              </Card>
          </Row>
        </TouchableHighlight>
      </Col>

      <Col style={{paddingRight: 5}}>
      <TouchableHighlight onPress={() =>
        props.navigation.navigate(
          'Suggestion', {property: state.rTh, media_type: state.media_type}
        )
      }>
        <Row>
            <Card>
              <CardItem header style={styles.cardItems}>
                  <Text style ={styles.headerText}>
                    {state.rThTitle}
                  </Text>
              </CardItem>
                <CardItem>
                <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + state.rTh.poster_path}}/>
                </CardItem>
            </Card>
        </Row>
      </TouchableHighlight>

      <TouchableHighlight onPress={() =>
        props.navigation.navigate(
          'Suggestion', {property: state.rFo, media_type: state.media_type}
        )
      }>
        <Row>
            <Card>
              <CardItem header style={styles.cardItems}>
                  <Text style ={styles.headerText}>
                    {state.rFoTitle}
                  </Text>
              </CardItem>
                <CardItem>
                <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w500' + state.rFo.poster_path}}/>
                </CardItem>
            </Card>
        </Row>
      </TouchableHighlight>
      </Col>
    </Grid>
</Content>);

} else {
  return null;
}
}






//////////////////////////////////////////////////////////



const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
