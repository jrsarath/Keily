import React, {Component} from 'react';
import moment from "moment";
import { DrawerActions } from "react-navigation";
import {StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import { Text } from 'react-native-elements';
import { Card, Tile, Title, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import Config from './../../Config';
import LikePost from '../../LikedHandler';

function formatDate(d){
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}
export default class RecentThreeCards extends Component {
    render(){
      const posts = this.props.posts;
       let articles = posts.map((post, index) => {
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
                    </View>
                  </TouchableOpacity>
              );
            }
          });
        return(
            <View style={styles.base}>{articles}</View>
        );
    }
}

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
    height: (Dimensions.get('window').width / 3) + 30
  },
  imgcont: {
    width: '100%',
    height: (Dimensions.get('window').width / 3) + 30,
    overflow:'hidden',
    borderRadius:5,
  },
  customCard: {
    width: (Dimensions.get('window').width / 3) - 4,
  }
});

