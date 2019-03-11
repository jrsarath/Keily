import React, {Component} from 'react';
import { ScrollView,View,Text } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer,createDrawerNavigator,DrawerNavigator, DrawerItems, StackNavigator, SafeAreaView } from "react-navigation";
import { LikedScreen, ImageScreen } from './Pages';
import CategoriesScreen from './Categories';
import Icon from 'react-native-vector-icons/Feather';
import { HomeView } from './../views/Home.js';
import CategoryView from './Category';


const Tabs = createBottomTabNavigator({
  Home: {   
            screen: HomeView,
            navigationOptions: {
              tabBarLabel: 'Home',
              tabBarIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="home" size={24}/>
              ),
            }},
  Categories: {   
            screen: CategoriesScreen,
            navigationOptions: {
              tabBarLabel: 'Categories',
              tabBarIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="grid" size={24}/>
              ),
            }},
  Image: {   
            screen: ImageScreen,
            navigationOptions: {
              tabBarLabel: 'Images',
              tabBarIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="image" size={24}/>
              ),
            }},
  Liked: {   
            screen: LikedScreen,
            navigationOptions: {
              tabBarLabel: 'Liked',
              tabBarIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="heart" size={24}/>
              ),
            }},
  },{
    animationEnabled: true
});


export default HomeScreen = Tabs;