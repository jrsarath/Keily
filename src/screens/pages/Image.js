import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator,Text } from 'react-native';
import { Card, Heading, Tile, Title, Overlay, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import ImageBrowser from 'react-native-interactive-image-gallery';
import { DrawerActions } from "react-navigation";

import Config from './../../Config';
const PageName = "Images";

export class ImageScreen extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            status: null
        }
    }
    componentDidMount() {
        const get = "media?media_type=image&per_page=50";
        let dataURL = Config.endpoint+get;

        fetch(dataURL)
        .then(response => response.json())
        .then(response => {
            this.setState({
                images: response,
                status: "true"
            })
        })
    }
    render() {
        const imageURLs = this.state.images.map(
            (img, index) => ({
                id: String(index),
                thumbnail: "https:"+img.media_details.sizes.thumbnail.source_url,
                URI: "https:"+img.guid.rendered
            })
        )
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
               <ImageBrowser images={imageURLs} />
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
