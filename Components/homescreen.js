import { StyleSheet, View, Text, Image, ScrollView, Linking, Button, Pressable } from 'react-native'
import React, {Component} from 'react'
import  axios  from 'axios'
import {Card, Title, Paragraph} from 'react-native-paper'
import Header from './navbar'
import styles from './styles'

export default class Homescreen extends Component {
    state ={
        articles:[],
        isLoading: true,
        errors:null,
    };
  
    getArticles(){
        axios
            .get(
                "https://newsapi.org/v2/top-headlines?country=za&category=technology&apiKey=155c9dca8824406f9945a0e8c6cc054b"
            )
            .then(response =>
            
                response.data.articles.map(article =>({
                    date : `${article.publishedAt}`,
                    title : `${article.title}`,
                    url : `${article.url}`,
                    description : `${article.description}`,
                    urlToImage : `${article.urlToImage}`,
                    author:`${article.author}`
                }))
            )
            .then((articles)=>{
                console.log(articles)
                this.setState({
                    articles,
                    isLoading:false
                });
              
            })
            .catch((error)=>{
                console.log(error.message)
                this.setState({error, isLoading:false})

            })
            
    }
    componentDidMount(){  
        this.getArticles();
        
    }
   
    render(){
        const { isLoading, articles} = this.state;
        return (
            <View style={{backgroundColor:'#EFEFEF'}}>
                <Header stickyHeaderIndices={[0]}/>
                <ScrollView >
                
                {
                    isLoading? (
                        <Text style={{justifyContent:'center', alignItems:'center'}}>Loading....</Text>      
                    ):(
        articles.map(article =>{
            const {date,title,url,description,urlToImage,author} = article
            return (
                <Card 
                key={article.url}
                style={{marginTop:10,borderColor:'gray',borderRadius:5, borderWidth:1, backgroundColor:'#fffff'}}
                onPress={()=>{Linking.openURL(`${url}`)}}

               >
                    <View style={{flexDirection:'row'}}>
                        {/* image */}
                        <View style={{justifyContent:'space-around', flex:1/3, margin:10}}>
                           
                            <Image style={{width:120, height:120}} source={{uri:urlToImage}}/>
                        </View>
                        {/* text */}
                        <View style={{flex:2/3, margin:10}}>
 
                            <Title>{title}</Title>
                        </View>
                    </View>
                    <View style={{margin:10}}>
                        {/* <Paragraph>{description}</Paragraph> */}
                        <Text>{author}</Text>
                        <Text>Published At: {date.substr(0,10)}</Text>
                        <Pressable style={styles.fixToText} >
                            <Text style={{color:'white', fontWeight:900}}>View More</Text>
                        </Pressable>
                      
                    </View>
                </Card>
            );
        })
                    )
                }
                </ScrollView>
            </View>
        )
    }
}

 
