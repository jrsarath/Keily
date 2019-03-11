import React, {Component} from 'react';
import moment from "moment";
import {Dimensions, StyleSheet, TouchableOpacity, View, ScrollView, WebView,ActivityIndicator} from 'react-native';
import { Text } from 'react-native-elements';
import { Html, Heading, Card, Overlay, Row, Tile, Title, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import HTMLView from 'react-native-htmlview';
import {HorizontalWrapper, ParallaxBackground} from 'react-native-parallax-background';
import Config from './../../Config';
function formatDate(d){
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}


export class SinglePost extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  };
  constructor() {
    super();
    this.state = {
      posts: [],
      mainPost: {
        title: "",
        date: "",
        post_link: "",
        img: "",
        content: ""
      },
      status: null,
      key: 1
    }
  }
  componentDidMount() {
      const { navigation } = this.props;
      console.log(navigation.getParam('masterid'));
      if (navigation.getParam('masterid') != undefined ) {
        fetch(Config.endpoint+"posts/"+navigation.getParam('masterid'))
          .then(response => response.json())
          .then(response => {
            this.setState({
              mainPost: {
                title: response.title.rendered,
                date: formatDate(response.date),
                post_link: response.link,
                img: response.better_featured_image.source_url,
                content: response.content.rendered
              },
            })
            let category = response.categories;
            const get = "posts?categories=" + category + "&per_page=5";
            fetch(Config.endpoint + get)
              .then(response => response.json())
              .then(response => {
                this.setState({
                  posts: response,
                  status: "true"
                })
              })
          })
          //console.log(this.state.mainPost);
      } else {
        this.setState({
          mainPost: {
            title: navigation.getParam('post_title'),
            date: navigation.getParam('post_date'),
            post_link: navigation.getParam('post_link'),
            img: navigation.getParam('post_image'),
            content: navigation.getParam('post_content')
          },
        });
        let category = navigation.getParam('post_catagoty');
        const get = "posts?categories=" + category + "&per_page=5";
        fetch(Config.endpoint + get)
          .then(response => response.json())
          .then(response => {
            this.setState({
              posts: response,
              status: "true"
            })
          })
      }
  }

  render() {
      const { navigation } = this.props;
      const PageName = navigation.getParam('parent', 'News');
      let posts = this.state.posts.map((post, index) => {
        return (
            <TouchableOpacity key={post.id} styleName="flexible"
              onPress={() =>
                  this.props.navigation.push('Article',
                  {
                    post_title: post.title.rendered,
                    post_link: post.guid.rendered,
                    post_content: post.content.rendered,
                    post_image: Config.website+"wp-content/uploads/"+post.better_featured_image.media_details.file,
                    post_date: formatDate(post.date),
                    post_catagoty: post.categories,
                    parent: PageName,
                    id: post.id
                  })
                }>
              <Row>
                <Image
                  styleName="small rounded-corners"
                  source={{ uri:  Config.website+"wp-content/uploads/"+post.better_featured_image.media_details.file}}
                />
              <View style={{width:'80%'}}>
                  <Subtitle numberOfLines={2}>{post.title.rendered}</Subtitle>
                  <View styleName="horizontal">
                    <Caption>{formatDate(post.date)}</Caption>
                  </View>
                </View>
              </Row>
            </TouchableOpacity>
          );
      });
      if (!this.state.status) {
        return (
          <Screen>
            <NavigationBar
              style={{zIndex: 99}}
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
    return(
      <Screen>
        <NavigationBar
          style={{zIndex: 99}}
          leftComponent={(
            <Button onPress={() => {
              this.props.navigation.goBack();
            }}>
              <Icon name="back" />
            </Button>
          )}
          centerComponent={<Title style={{fontSize:20}}>{PageName}</Title>}
          styleName="inline"
          share={{
            link: this.state.mainPost.post_link,
            title: this.state.mainPost.title,
          }}
        />
        <HorizontalWrapper>
          <ParallaxBackground
              maxHeight={450}
              uri={this.state.mainPost.img}
              >
              <View>
                <View style={{paddingLeft:15,paddingTop:20,paddingBottom:20,paddingRight:10,textAlign:'left',width:'100%'}}>
                  <Heading>{this.state.mainPost.title}</Heading>
                  <Subtitle style={{color: '#8c8c8c'}}>{this.state.mainPost.date}</Subtitle>
                </View>
                <Html
                  body={this.state.mainPost.content}
                />
              </View>
              <View>
                <Title style={{paddingLeft:15,paddingBottom:10}}>Related Articles</Title>
                {posts}
              </View>
            </ParallaxBackground>
        </HorizontalWrapper>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});
