import React, {Component} from 'react'
// import Title from './Title'
import PhotoWall from './PhotoWall'
import AddPhoto from './AddPhoto'
import NavBar from './NavBar'
import AudioSource from './AudioSource'
import Single from './Single'
import {Route} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {darkTheme} from '../theme';


class Main extends Component{

    constructor(){
        super();
        this.selectTrack = this.selectTrack.bind(this)
    }

    state = { 
        loading:true,
        selectedTrack: null,
    }

    selectTrack(track){
        // console.log(track.id)
        // console.log(track.url)
        // console.log(track.title)
        this.setState({selectedTrack:track.url})
    }

    componentDidMount(){
        this.props.loadVolume()
        this.props.startLoadingPosts().then(() =>{
            this.setState({loading:false})
        })
        this.props.startLoadingComments()
    }

    render(){
        return (<div className="main-div">
                    <ThemeProvider theme={darkTheme}><CssBaseline />
                        <NavBar selectTrack={this.selectTrack} selectedTrack={this.state.selectedTrack} volume={this.props.player.volume}/>

                        

                        <Route exact path="/" render={() => (

                            
                            <PhotoWall selectTrack={this.selectTrack} {...this.props}/>
                            

                        )}/>           
                        
                        <Route path="/AddPhoto" render={({history}) => 
                            <AddPhoto {...this.props} onHistory={history}/>
                        }/>

                        <Route path="/single/:id" render={(params) => 
                            <Single selectTrack={this.selectTrack} loading={this.state.loading} {...this.props} {...params}/>
                        }/>

                        
                        

                    </ThemeProvider>
                </div>)
    }
}

export default Main