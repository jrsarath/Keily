import React, {Component} from 'react';
import moment from "moment";
import { Image, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import LikePost from '../../LikedHandler';
import { Tile, Title, Subtitle, Caption, Button, Icon, Divider, Screen,  ImageBackground,NavigationBar } from '@shoutem/ui';
import Config from './../../Config';
import FastImage from 'react-native-fast-image'


function formatDate(d){
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}

export default class CategoryView extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      status: null,
      page: 1,
      loadMore: 'Load More'
    }
  }
  componentDidMount() {
      const id = this.props.navigation.getParam('categories', this.props.categories)
      const get = "posts?categories="+id+"&per_page=20";
      let dataURL = Config.endpoint+get;
      fetch(dataURL)
        .then(response => response.json())
        .then(response => {
          this.setState({
            posts: response,
            status: true
          })
        })
    }
    getNextPage(){
      const currentPage = this.state.page;
      this.setState({
        page: currentPage+1,
        loadMore: 'Loading..'
      })
      const newPage = this.state.page+1
      const id = this.props.navigation.getParam('categories', this.props.categories)
      const get = "posts?categories="+id+"&per_page=20&page="+newPage;
      //console.log(newPage)
      let dataURL = Config.endpoint+get;
      let currentPosts = this.state.posts;
      fetch(dataURL)
        .then(response => response.json())
        .then(response => {
          //console.log(currentPosts.concat(response))
          if (response.code == "rest_post_invalid_page_number") {
            this.setState({
              loadMore: "That's All"
            })
          } else {
            this.setState({
              posts: currentPosts.concat(response),
              loadMore: 'Load More'
            })
          }
          
          //console.log(currentPosts.concat(response))
        })
    }
    render() {
        const nav = this.props.nav;
        const PageName = this.props.navigation.getParam('pagename', this.props.pagename);
        let featured = this.state.posts.map((post, index) => {
          if (index == 0) {
            return (
                <View>
                  <TouchableOpacity key={index} onPress={() =>
                      this.props.navigation.navigate('Article',
                      {
                        post_title: post.title.rendered,
                        post_link: post.link,
                        post_content: post.content.rendered,
                        post_image: Config.website+"wp-content/uploads/"+post.better_featured_image.media_details.file,
                        post_date: formatDate(post.date),
                        post_catagoty: post.categories,
                        id: post.id
                      })
                    }>
                    <ImageBackground
                      styleName="large"
                      source={{ uri: Config.website+"wp-content/uploads/"+post.better_featured_image.media_details.file }}
                    >
                      <Tile>
                        <Title styleName="md-gutter-bottom">{post.title.rendered}</Title>
                        <Subtitle styleName="sm-gutter-horizontal" numberOfLines={3}>{formatDate(post.date)}</Subtitle>
                      </Tile>
                    </ImageBackground>
                    <Divider styleName="line" />
                  </TouchableOpacity>
                </View>
              );
          }
        });
        let articles = this.state.posts.map((post, index) => {
            let img = post.better_featured_image.media_details.sizes.medium_large == undefined ? Config.website+"wp-content/uploads/"+post.better_featured_image.media_details.file : "https://"+post.better_featured_image.media_details.sizes.medium_large.source_url
            // console.log(img)
            if (index != 0){
              return(
                  <TouchableOpacity key={post.id} style={styles.customCard} 
                    onPress={() =>
                        this.props.navigation.navigate('Article',
                        {
                          post_title: post.title.rendered,
                          post_link: post.link,
                          post_content: post.content.rendered,
                          post_image: Config.website+"wp-content/uploads/"+post.better_featured_image.media_details.file,
                          post_date: formatDate(post.date),
                          post_catagoty: post.categories,
                          id: post.id
                        })
                      }>
                    <View style={{padding:4}}>
                      <View style={styles.imgcont}>
                        <FastImage
                          style={styles.newsImage}
                          source={{ uri: img }}
                          resizeMethod="resize"
                        />
                        <LikePost post={post.id} />
                      </View>
                        <View styleName="content" style={{padding:10}}>
                        <Subtitle numberOfLines={2}>{post.title.rendered}</Subtitle>
                        <View styleName="horizontal">
                          <Caption styleName="collapsible">{formatDate(post.date)}</Caption>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
              );
            }
        });
        if (!this.state.status) {
          return (
            <Screen>
              <NavigationBar
                leftComponent={(
                    <Button onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Icon name="back" />
                    </Button>
                    )}
                centerComponent={<Title style={{fontSize:20}}>{PageName}</Title>}
                styleName="inline"
              />
              <ActivityIndicator
                animating={true}
                style={styles.indicator}
                size="large"
              />
            </Screen>
          );
        }
        return (
          <Screen>
            <NavigationBar
              leftComponent={(
                    <Button onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Icon name="back" />
                    </Button>
                    )}
              centerComponent={<Title style={{fontSize:20}}>{PageName}</Title>}
              styleName="inline"
            />
          <ScrollView>
            {featured}
            <Title style={{textAlign:'center', width: '100%', paddingVertical: 18}}>More {PageName}</Title>
            <View style={styles.base}>{articles}</View>
              <View style={{flex:1,justifyContent: 'center', alignItems: 'center', marginVertical:20}}>
                <TouchableOpacity style={styles.button} 
                  onPress={() => { this.getNextPage() }}>
                    <Title>{this.state.loadMore}</Title>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Screen>
        );
    }
}
const imageHeight = (Dimensions.get('window').width / 3) + 30;
const cardHeight = (Dimensions.get('window').width / 2) - 4;
const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  newsImage: {
    width: '100%',
    height: '100%'
  },
  imgcont: {
    width: '100%',
    height: imageHeight,
    overflow: 'hidden',
    borderRadius: 5,
  },
  customCard: {
    width: '50%',
  },
  button: {
    width:150,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#212121',
    borderRadius: 5,
    justifyContent: 'center', 
    alignItems: 'center'
  } 
});

