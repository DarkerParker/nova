import React, {Component} from 'react'
// import Title from './Title'
import PhotoWall from './PhotoWall'
import AddPhoto from './AddPhoto'
import NavBar from './NavBar'
import Single from './Single'
import {Route} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {darkTheme} from '../theme';


class Main extends Component{

    constructor(){
        super();
        this.addAudioRef = this.addAudioRef.bind(this)
    }

    state = { 
        loading:true,
        selectedTrack: null,
        audioRef: null,
    }

    componentDidMount(){
        this.props.loadVolume()
        this.props.loadTrack()
        this.props.startLoadingPosts().then(() =>{
            this.setState({loading:false})
        })
        this.props.startLoadingComments()
    }

    addAudioRef(component){
        this.setState({
            audioRef:component
        })
    }

    render(){
        return (<div className="main-div">
                    <ThemeProvider theme={darkTheme}><CssBaseline />
                        <NavBar {...this.props} addAudioRef={this.addAudioRef}/>

                        

                        <Route exact path="/" render={() => (

                            
                            <PhotoWall audioRef={this.state.audioRef} setTrack={this.props.setTrack}/>
                            

                        )}/>           
                        
                        <Route path="/AddPhoto" render={({history}) => 
                            <AddPhoto {...this.props} onHistory={history}/>
                        }/>

                        <Route path="/single/:id" render={(params) => 
                            <Single audioRef={this.state.audioRef} loading={this.state.loading} {...this.props} {...params}/>
                        }/>

                        
                        

                    </ThemeProvider>
                </div>)
    }
}

export default Main