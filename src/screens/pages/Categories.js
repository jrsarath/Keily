import React, {Component} from 'react';
import { DrawerActions } from "react-navigation";
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator,Text } from 'react-native';
import { Card, Heading, Tile, Title, Overlay, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';

const PageName = "Catagories";
const  categories = [
    {
        name: 'Flash News',
        id: '56',
        image: require('./../../img/news.jpg')
    }, {
        name: 'Cinema News',
        id: '52',
        image: require('./../../img/film.png')
    }, {
        name: 'Health News',
        id: '55',
        image: require('./../../img/health.jpg')
    }, {
        name: 'Politics News',
        id: '53',
        image: require('./../../img/politics.jpeg')
    }];
export class MainView extends Component {
    render() {
        let categoryList = categories.map((category, index) => {
            return(
                <View style={styles.ImageCard}>
                    <TouchableOpacity style={styles.touch} onPress={() => this.props.navigation.navigate('Category', { categories: category.id, pagename: category.name })}>
                        <ImageBackground
                            source={category.image}
                            style={styles.MainImage}
                        >
                            <Tile>
                                <Heading>{category.name}</Heading>
                            </Tile>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
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
                <ScrollView style={{paddingHorizontal: 10}}>{categoryList}</ScrollView>
            </Screen>
        );
    }
}


export default CategoriesScreen = MainView;

const styles = StyleSheet.create({
    ImageCard: {
        marginVertical: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    MainImage: {
        width: '100%',
        height: 150,
    }
});