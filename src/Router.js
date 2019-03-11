import React, {Component} from 'react';
import { ScrollView,View,Text } from 'react-native';
import { Image,ImageBackground } from '@shoutem/ui';
import { createBottomTabNavigator, createStackNavigator, createAppContainer,createDrawerNavigator,DrawerNavigator, DrawerItems, StackNavigator, SafeAreaView } from "react-navigation";
import HomeScreen from './screens/pages/Home';
import {LikedScreen} from './screens/pages/Liked';
import { SinglePost } from './screens/pages/SinglePost';
import Icon from 'react-native-vector-icons/Feather';
import CategoryView from './screens/pages/Category';
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <View style={{flex:1,alignItems:'center',paddingBottom:10,paddingTop:20}}>
      <ImageBackground
        styleName="medium-square"
        source={require('./img/logo.png')}
      >
      </ImageBackground>
    </View>

    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems  {...props} style={{fontSize:20}} />
    </SafeAreaView>
  </ScrollView>
);

const DrawerNav = createDrawerNavigator({
    Home: { screen: HomeScreen,
            navigationOptions: {
              drawerLabel: 'Home',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="home" size={24}/>
              ),
            }},
    CateFlash: { screen: (props) => <CategoryView {...props} categories={56} pagename="Flash News" />,
            navigationOptions: {
              drawerLabel: 'Flash News',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="rss" size={24}/>
              ),
            }},
    CateCinema: { screen: (props) => <CategoryView {...props} categories={52} pagename="Cinema News" />,
            navigationOptions: {
              drawerLabel: 'Cinema News',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="video" size={24}/>
              ),
            }},
    CatePolitics: { screen: (props) => <CategoryView {...props} categories={53} pagename="Politics News" />,
            navigationOptions: {
              drawerLabel: 'Political News',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="users" size={24}/>
              ),
            }},
    CateFeatures: { screen: (props) => <CategoryView {...props} categories={57} pagename="Featured News" />,
            navigationOptions: {
              drawerLabel: 'Featured News',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="award" size={24}/>
              ),
            }},
    CateHealth: { screen: (props) => <CategoryView {...props} categories={55} pagename="Health News" />,
            navigationOptions: {
              drawerLabel: 'Health News',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="plus-circle" size={24}/>
              ),
            }},
  },  {
    initialRouteName: "Home",
    activeTintColor: 'dodgerblue',
    inactiveTintColor: 'grey',
    contentOptions: {
      labelStyle: {
        fontSize:18,
        fontWeight: 'normal'
      }
    },
    contentComponent: CustomDrawerContentComponent
  }
)

const BaseStack = createStackNavigator({
      DrawerNav: { screen: DrawerNav },
      Home: { screen: HomeScreen },
      Category: { screen: CategoryView },
      Article: {
        screen: SinglePost,
        path: 'article/:masterid',
      },
      Liked: { screen: LikedScreen }
  },{
    headerMode: 'none'
});

export const AppContainer = createAppContainer(BaseStack);