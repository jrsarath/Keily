import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@shoutem/ui'
import Icon from 'react-native-vector-icons/FontAwesome';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({name: 'db', createFromLocation : "~posts.sqlite"});

export default class LikePost extends Component {
    constructor(){
        super()
        this.state = {
            color: '#fff',
            icon: 'heart-o'
        }
    }
    componentDidMount(){
        const post = this.props.post;
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM posts WHERE id="'+post+'"', [], (tx, results) => {
                //console.log(results.rows.item(0));
                if (results.rows.item(0) != undefined) {
                    this.setState({
                        color: '#f44336',
                        icon: 'heart'
                    })
                } else {
                    this.setState({
                        color: '#ffffff',
                        icon: 'heart-o'
                    })
                }
            });
        });
    }
    toggleLike(l){
        const post = this.props.post;
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM posts WHERE id="'+post+'"', [], (tx, results) => {
                console.log(results.rows.item(0));
                if (results.rows.item(0) == undefined) {
                    // NOT EXISTS
                    db.transaction((tx) => {
                        tx.executeSql('INSERT INTO posts(id) VALUES("'+post+'")', [], (tx, results) => {
                            console.log(results);
                            //console.log(tx);
                            this.setState({
                                color: '#f44336',
                                icon: 'heart'
                            });
                        })
                    });
                } else {
                    // EXIST
                    db.transaction((tx) => {
                        tx.executeSql('DELETE FROM posts WHERE id="'+post+'"', [], (tx, results) => {
                            console.log(results);
                            //console.log(tx);
                            this.setState({
                                color: '#ffffff',
                                icon: 'heart-o'
                            });
                        })
                    });
                }
            });
        });
    }
    render() {
        return(
            <Button styleName="clear"
                style={styles.btn}
                onPress={() => {this.toggleLike(this.props.post) }}>
                <Icon style={styles.icon} name={this.state.icon} size={25} color={this.state.color} />
            </Button>
        );
    }
}
const styles = StyleSheet.create({
    btn: {
        padding:0, 
        position: 'absolute',
        zIndex: 5,
        right:10,
        top:10
    },
    icon: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    }
});
