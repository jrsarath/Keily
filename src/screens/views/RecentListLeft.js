import React, {Component} from 'react';
import moment from "moment";
import {StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import { Card, Row, Tile, Title, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import Config from './../../Config';
import LikePost from '../../LikedHandler';

function formatDate(d){
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}

export default class RecentListLeft extends Component {
    render() {
       const posts = this.props.posts;
       let articles = posts.map((post, index) => {
            if (index != 1){
              return(
                <TouchableOpacity key={post.id} styleName="flexible"
                  onPress={() =>
                    this.props.navigation.navigate('Article',
                      {
                        post_title: post.title.rendered,
                        post_link: post.guid.rendered,
                        post_content: post.content.rendered,
                        post_image: Config.website + "wp-content/uploads/" + post.better_featured_image.media_details.file,
                        post_date: formatDate(post.date),
                        post_catagoty: post.categories,
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
            }
          });
        return(
            <View>{articles}</View>
        );
    }
}