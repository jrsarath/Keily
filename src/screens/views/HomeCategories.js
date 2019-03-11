import React, {Component} from 'react';
import moment from "moment";
import {StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import LikePost from '../../LikedHandler';
import { Card, Tile, Row, Title, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import Config from './../../Config';

function formatDate(d) {
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}

export default class HomeCategoriesListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            flash: this.props.flash,
            cinema: this.props.cinema,
            politics: this.props.politics,
            health: this.props.health
        }
    }
    render(){
        let flash = this.props.flash.map((post, index) => {
            return(
                <TouchableOpacity key={post.id} styleName="flexible"
                  onPress={() =>
                    this.props.navigation.navigate('Article',
                      {
                        post_title: post.title.rendered,
                        post_link: post.link,
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
        });
        let cinema = this.props.cinema.map((post, index) => {
            return(
                <TouchableOpacity key={post.id} styleName="flexible"
                  onPress={() =>
                    this.props.navigation.navigate('Article',
                      {
                        post_title: post.title.rendered,
                        post_link: post.link,
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
        });
        let politics = this.props.politics.map((post, index) => {
            return(
                <TouchableOpacity key={post.id} styleName="flexible"
                  onPress={() =>
                    this.props.navigation.navigate('Article',
                      {
                        post_title: post.title.rendered,
                        post_link: post.link,
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
        });
        let health = this.props.health.map((post, index) => {
            return(
                <TouchableOpacity key={post.id} styleName="flexible"
                  onPress={() =>
                    this.props.navigation.navigate('Article',
                      {
                        post_title: post.title.rendered,
                        post_link: post.link,
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
        });

        return(
            <View>
                <Title style={{textAlign:'left', width: '100%', paddingLeft:15 }}>Flash News</Title>
                    <View>{flash}</View>
                <Title style={{textAlign:'left', width: '100%', paddingLeft:15 }}>Cinema News</Title>
                    <View>{cinema}</View>
                <Title style={{textAlign:'left', width: '100%', paddingLeft:15 }}>Politics News</Title>
                    <View>{politics}</View>
                <Title style={{textAlign:'left', width: '100%', paddingLeft:15 }}>Health News</Title>
                    <View>{health}</View>
            </View>
        );
    }
    
}