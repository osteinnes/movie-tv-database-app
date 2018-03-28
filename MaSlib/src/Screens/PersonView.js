
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  ImageBackground,
  DrawerLayoutAndroid,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
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
  IconNB,
  DeckSwiper,
  Left,
  Body,
  Right,
  Footer,
  FooterTab,
  Title,
  Text,
} from 'native-base';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import config from '../config.js';

export default class PersonView extends Component {

  static navigationOptions = {
    header:null,
  };

  constructor(props) {
    super(props);

    this.state = {
      details: [],
      biblography: [],
      images:  [],
    };
  }

  componentWillMount() {
    const {params} = this.props.navigation.state;

    var detailsUrl = _urlPersonDetails(params.id);
    fetch(detailsUrl)
    .then(response => response.json())
    .then(json => this._handleDetailsResponse(json))
    .catch(error =>
    console.log(error)
    );


};

componentDidMount() {
  const {params} = this.props.navigation.state;

  var biblographyUrl = _urlBiblography(params.id);
  fetch(biblographyUrl)
  .then(response => response.json())
  .then(json => this._handleBiblographyResponse(json))
  .catch(error =>
  console.log(error)
  );
  var imagesUrl = _urlImages(params.id);
  fetch(imagesUrl)
  .then(response => response.json())
  .then(json => this._handleImageResponse(json))
  .catch(error =>
  console.log(error)
  );

};

  _handleImageResponse(response) {
    this.setState({
      images: response.profiles,
    });
  };

  _handleBiblographyResponse(response) {
    this.setState({
      biblography: response.cast,
    });
  };

  _handleDetailsResponse(response) {
    this.setState({
      details: response,
    });
  };

  onSelection = (item) => {
    console.log(item.name)
    this.props.navigation.navigate('Suggestion', {property: item, media_type: item.media_type});
 }

 renderItems = ({ item }) => {

   console.log('THis is the item '+ item);
 if (item.media_type == "tv") {
   return(

     <TouchableOpacity
       onPress={() => this.onSelection(item)}>
       <View style={{backgroundColor: '#3e4144'}}>
       <Card>
         <CardItem header style={styles.cardItems}>
         <Text>
           {item.name}
         </Text>
         </CardItem>
           <CardItem style={{backgroundColor: 'transparent'}}>
           <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w185' + item.poster_path}}/>
           </CardItem>
       </Card>
       </View>
     </TouchableOpacity>
   )
 } else if (item.media_type == "movie") {
   return(

     <TouchableOpacity
       onPress={() => this.onSelection(item)}>
       <View style={{backgroundColor: '#3e4144'}}>
       <Card>
         <CardItem header style={styles.cardItems}>
         <Text>
           {item.title}
         </Text>
         </CardItem>
           <CardItem style={{backgroundColor: 'transparent'}}>
           <ImageBackground style={styles.cardImage} source={{uri: 'https://image.tmdb.org/t/p/w185' + item.poster_path}}/>
           </CardItem>
       </Card>
       </View>
     </TouchableOpacity>
   )
 } else {
   return null;
 }
 }

  render() {

    console.log('what the fuck' + this.state.biblography.toString());

    return(
      <HeaderImageScrollView
        maxHeight={500}
        minHeight={80}
        fadeOutForeground
        headerImage={{uri: 'https://image.tmdb.org/t/p/w300' + this.state.details.profile_path}}

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
            <Text style={styles.title}>{this.state.details.name}</Text>
            <Text style={styles.text}>{this.state.details.biography}</Text>

            <Text style={styles.title}>Biblography</Text>
            <FlatList
               horizontal
               data={this.state.biblography}
               renderItem={this.renderItems}
               enableEmptySections
               keyExtractor={(item, index) => index}
               ItemSeparatorComponent={this.renderSeparator}
             />

            </TriggeringView>

          </View>

      </HeaderImageScrollView>
    );
  }

}

/////////////////////////////////////////////

function _urlPersonDetails(id) {
  API_KEY = config.API_KEY;
  var queryString = 'https://api.themoviedb.org/3/person/' + id + '?api_key=' + API_KEY;
  return queryString;
}

function _urlBiblography(id) {
  API_KEY = config.API_KEY;
  var queryString = 'https://api.themoviedb.org/3/person/' + id + '/combined_credits?api_key=' + API_KEY;
  return queryString;
}

function _urlImages(id) {
  API_KEY = config.API_KEY;
  var queryString = 'https://api.themoviedb.org/3/person/' + id + '/images?api_key=' + API_KEY;
  return queryString;
}

function doDrawSimilar(state, _deckSwiper) {

    return(
      <Container style={styles.containerDeck}>
      <View style={{ flex: 1, padding: 12 }}>
          <DeckSwiper
            ref={mr => (_deckSwiper = mr)}
            dataSource={state.images}
            looping={true}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>}
            renderItem={item =>

              <Card style={{ elevation: 3 }}>

                <CardItem cardBody>
                  <Image
                    style={{
                      resizeMode: "cover",
                      width: null,
                      flex: 1,
                      height: 300
                    }}
                    source={{uri: 'https://image.tmdb.org/t/p/w500' +  item.file_path}}
                  />
                </CardItem>
              </Card>
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            position: "absolute",
            bottom: 50,
            left: 0,
            right: 0,
            justifyContent: "space-between",
            padding: 15
          }}
        >
        </View>
</Container>
    );
}

/////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  containerDeck: {
    backgroundColor: '#3e4144',
  },
  containerDeck2: {
    backgroundColor: '#3e4144',
    marginTop: -0,
  },
  cardItems: {
    alignSelf: 'center',
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  cardImage: {
    height: 185,
    width: 185,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
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
  imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        //borderTopLeftRadius: entryBorderRadius,
        //borderTopRightRadius: entryBorderRadius
  },
});
