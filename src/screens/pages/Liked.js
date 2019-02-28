import React, {Component} from 'react';
import moment from 'moment';
import { DrawerActions, NavigationEvents} from "react-navigation";
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator,Text } from 'react-native';
import { Card, Row, Heading, Tile, Title, Overlay, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import { openDatabase } from 'react-native-sqlite-storage';
import Config from './../../Config';
var db = openDatabase({name: 'db', createFromLocation : "~posts.sqlite"});

const PageName = "Liked News";
function formatDate(d) {
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}

export class LikedScreen extends Component {
    constructor() {
      super()
      this.state = {
        posts: [],
        status: null,
        data: '',
        key: 1,
        noProp: true,
      }
    }
    componentDidMount(){
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM posts ', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            if (i == 0) {
              temp.push("include[]=" + results.rows.item(i).id);
            } else {
              temp.push("&include[]=" + results.rows.item(i).id);
            }
          }
          var setData = temp.toString();
          var data = setData.replace(/,/g, '');
          this.setState({
            data: data
          },
            () => this.getPosts()
          );
        });
      });
      //console.log(this.state.key)
      this._navListener = this.props.navigation.addListener('didFocus', () => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM posts ', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              if (i == 0) {
                temp.push("include[]=" + results.rows.item(i).id);
              } else {
                temp.push("&include[]=" + results.rows.item(i).id);
              }
            }
            var setData = temp.toString();
            var data = setData.replace(/,/g, '');
            this.setState({
                data: data
              },
              () => this.getPosts()
            );
          });
        });
      });
    }
    updatelist(){
      console.log("focused")
    }
    getPosts() {
      let dataURL = Config.endpoint;
      postId = this.state.data;
      //console.log(postId);
      if (postId.includes('include')) {
        fetch(dataURL + "posts?" + postId)
          .then(response => response.json())
          .then(response => {
            /*console.log(dataURL + "posts?" + postId);
            console.log(response);*/
            this.setState({
              posts: response,
              status: true,
              noProp: false
            })
          })
      } else {
        this.setState({
          status: true,
        })
      }

    }
    render() {
        if (!this.state.status) {
          return (
            <Screen>
              <NavigationBar
                leftComponent={
                  <Button onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name="sidebar" />
                  </Button>
                }
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
        if (this.state.noProp == true) {
          return (
            <Screen>
              <NavigationBar
                leftComponent={
                  <Button onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name="sidebar" />
                  </Button>
                }
                centerComponent={<Title style={{fontSize:20}}>{PageName}</Title>}
                styleName="inline"
              />
              <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}><Title>No liked posts yet</Title></View>
            </Screen>
          );
        }
        let articles = this.state.posts.map((post, index) => {
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
        return(
           <Screen>
              <NavigationBar
                leftComponent={
                  <Button onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name="sidebar" />
                  </Button>
                }
                centerComponent={<Title style={{fontSize:20}}>{PageName}</Title>}
                styleName="inline"
              />
                <ScrollView key={this.state}>
                  {articles}
                </ScrollView>
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