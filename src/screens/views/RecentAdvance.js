import React, {Component} from 'react';
import moment from "moment";
import { DrawerActions } from "react-navigation";
import {StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import { Text } from 'react-native-elements';
import { Card, Tile, Title, Subtitle, Image, Caption, Button, Icon, Divider, GridRow, Screen, ListView, ImageBackground,NavigationBar } from '@shoutem/ui';
import Config from './../../Config';

function formatDate(d){
  var date = d.split("T")[0];
  return moment(date).format("Do MMM YYYY")
}
export class RecentAdvance extends Component {
    render(){
        return(
            
        );
    }
}