import React, {Component} from 'react';
import {Dimensions, Modal, Alert, TouchableHighlight, StyleSheet, TouchableOpacity, View, ScrollView, WebView,ActivityIndicator} from 'react-native';
import moment from 'moment';
import { DrawerActions } from "react-navigation";
import { Html, Heading, Card, Overlay, Row, Tile, Text, Title, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import Config from '../../Config';
import RecentListLeft from './RecentListLeft';
import RecentListRight from './RecentListRight';
import RecentCard from './RecentCard';
import RecentGrid from './RecentGrid';
import RecentThreeCards from './RecentThreeCards';
const PageName = 'News App'
function formatDate(d) {
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}

export class HomeView extends Component {
    constructor() {
      super();
      this.state = {
        posts: [],
        status: null,
        layout: RecentGrid,
        modalVisible: false,
      }
    }
    componentDidMount() {
        let dataURL = Config.endpoint;
        fetch(dataURL+"posts?per_page=15")
          .then(response => response.json())
          .then(response => {
            this.setState({
              posts: response,
              status: true
            })
          })
      }

    changeLayout(l) {
      this.setState({
        layout: l
      });
      this.setModalVisible(!this.state.modalVisible);
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});

    }
    render() {
        if (!this.state.status) {
          return (
            <Screen>
              <NavigationBar
                style={{zIndex: 99}}
                leftComponent={
                  <Button onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name="sidebar" />
                  </Button>
                }
                centerComponent={<Title style={{fontSize:20,width:170}}>{PageName}</Title>}
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
        let featured = this.state.posts.map((post, index) => {
          if (index == 1) {
            return (
                <View>
                  <TouchableOpacity key={post.id} onPress={() =>
                      this.props.navigation.navigate('Article',
                      {
                        post_title: post.title.rendered,
                        post_link: post.guid.rendered,
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
        const Layout = this.state.layout;
        return (
          <Screen>
            <NavigationBar
              leftComponent={
                <Button onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                  <Icon name="sidebar" />
                </Button>
              }
              centerComponent={<Title style={{fontSize:20,width:170}}>{PageName}</Title>}
              styleName="inline"
            />
            <ScrollView style={{flex:1}}>
              {featured}
              <Row>
                <Title style={{textAlign:'left', width: '60%' }}>Latest News</Title>
                <Button styleName="clear" onPress={() => {this.setModalVisible(true)}}>
                  <Icon name="settings" />
                </Button>
              </Row>
              <Layout posts={this.state.posts} navigation={this.props.navigation} />
            </ScrollView>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                
              >
                  <View style={styles.mod}>
                    <View style={styles.modal}>
                        <View style={{width: '100%', textAlign: 'right', alignItems: 'flex-end'}}>
                          <Button styleName="clear"
                            style={{padding:0}}
                            onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Icon style={{padding:0,margin:0,fontSize:30}} name="clear-text" />
                          </Button>
                        </View>
                        <View style={styles.grid}>
                          <TouchableOpacity style={styles.iconCont} onPress={() => {this.changeLayout(RecentGrid)}}>
                            <Image style={styles.icon} source={require('./../../img/icons/grid.png')} />
                            <Subtitle style={{marginTop:5}}>Two Column</Subtitle>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.iconCont} onPress={() => {this.changeLayout(RecentThreeCards)}}>
                            <Image style={styles.icon} source={require('./../../img/icons/tri.png')} />
                            <Subtitle style={{marginTop:5}}>Three Column</Subtitle>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.iconCont} onPress={() => {this.changeLayout(RecentCard)}}>
                            <Image style={styles.icon} source={require('./../../img/icons/card.png')} />
                            <Subtitle style={{marginTop:5}}>Card</Subtitle>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.iconCont} onPress={() => {this.changeLayout(RecentListLeft)}}>
                            <Image style={styles.icon} source={require('./../../img/icons/list_l.png')} />
                            <Subtitle style={{marginTop:5}}>List View</Subtitle>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.iconCont} onPress={() => {this.changeLayout(RecentListRight)}}>
                            <Image style={styles.icon} source={require('./../../img/icons/list_r.png')} />
                            <Subtitle style={{marginTop:5}}>List View</Subtitle>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.iconCont}>
                            <Image style={styles.icon} />
                            <Subtitle style={{marginTop:5}}></Subtitle>
                          </TouchableOpacity>
                        </View>
                    </View>
                  </View>
                </Modal>
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
  },
  headerRow: {
    width: '100%', 
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  mod: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    overflow: 'hidden'
  },
  modal: {
    backgroundColor: '#fff',
    width: (Dimensions.get('window').width) - 20,
    padding: 10,
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  icon: {
    height: 40,
    width: 40
  },
  iconCont: {
    width: '50%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
});
