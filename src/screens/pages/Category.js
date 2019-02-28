import React, {Component} from 'react';
import moment from "moment";
import {StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import LikePost from '../../LikedHandler';
import { Card, Tile, Title, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import Config from './../../Config';

function formatDate(d){
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}

export default class CategoryView extends Component {
  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      posts: null
    }
  }
  componentDidMount() {
      const id = this.props.navigation.getParam('categories', this.props.categories)
      const get = "posts?categories="+id+"&per_page=50";
      let dataURL = Config.endpoint+get;
      fetch(dataURL)
        .then(response => response.json())
        .then(response => {
          this.setState({
            posts: response
          })
        })
    }
    
    renderRow(rowData, sectionId, index){
      const PageName = this.props.navigation.getParam('pagename', this.props.pagename);
      if (index === '0') {
        return (
          <View>
            <TouchableOpacity key={rowData[0].id} onPress={() =>
                this.props.navigation.navigate('Article',
                {
                  post_title: rowData[0].title.rendered,
                  post_link: rowData[0].guid.rendered,
                  post_content: rowData[0].content.rendered,
                  post_image: Config.website+"wp-content/uploads/"+rowData[0].better_featured_image.media_details.file,
                  post_date: formatDate(rowData[0].date),
                  post_catagoty: rowData[0].categories,
                  parent: PageName,
                  id: rowData[0].id
                })
              }>
              <ImageBackground
                styleName="large"
                source={{ uri: Config.website+"wp-content/uploads/"+rowData[0].better_featured_image.media_details.file }}
              >
                <Tile>
                  <Title styleName="md-gutter-bottom">{rowData[0].title.rendered}</Title>
                  <Subtitle styleName="sm-gutter-horizontal" numberOfLines={3}>{formatDate(rowData[0].date)}</Subtitle>
                </Tile>
              </ImageBackground>
              <Divider styleName="line" />
            </TouchableOpacity>
            <Title style={{paddingTop:15,paddingBottom:15,width:'100%', textAlign:'center'}}>More {PageName} News</Title>
          </View>
        );
      }
      const cellViews = rowData.map((post, id) => {
       return (
         <TouchableOpacity key={post.id} styleName="flexible"
           onPress={() =>
               this.props.navigation.navigate('Article',
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
           <Card styleName="flexible" style={{backgroundColor: 'rgba(255, 255, 255, 0)',padding:4}}>
             <View style={styles.imgcont}>
               <Image
                style={styles.newsImage}
                source={{ uri: Config.website+"wp-content/uploads/"+post.better_featured_image.media_details.file }}
              />
              <LikePost post={post.id} />
             </View>
              <View styleName="content" style={{padding:10}}>
               <Subtitle numberOfLines={2}>{post.title.rendered}</Subtitle>
               <View styleName="horizontal">
                <Caption styleName="collapsible">{formatDate(post.date)}</Caption>
               </View>
             </View>
           </Card>
         </TouchableOpacity>
       );
     });
      return (
        <GridRow columns={2}>
          {cellViews}
        </GridRow>
      );
    }

    render() {
        const nav = this.props.nav;
        const PageName = this.props.navigation.getParam('pagename', this.props.pagename);
        const posts = this.state.posts;
        let isFirstArticle = true;
        const groupedData = GridRow.groupByRows(posts, 2, () => {
          if (isFirstArticle) {
            isFirstArticle = false;
            return 2;
          }
          return 1;
        });
        if (!this.state.posts) {
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
            <ListView
              data={groupedData}
              renderRow={this.renderRow}
              style={{paddingHorizontal:4}}
            />
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
  newsImage: {
    width: '100%',
    height: (Dimensions.get('window').width / 3) + 10
  },
  imgcont: {
    width: '100%',
    height: (Dimensions.get('window').width / 3) + 10,
    overflow:'hidden',
    borderRadius:5,
  }
});
