import React from 'react'
import {connect} from 'react-redux'
import Waveform from './Waveform'

class TrackInfo extends React.Component {

    render(){
        const post = this.props.post;

        return( <><div className={"track-container"}>
                        <div className={'track-info'}>
                            <img className={'track-img'} src={post.imageLink} alt={post.description}/>
                            
                            <div className={'track-title-desc'}>
                                <h1 className="track-title">{post.description}</h1>
                                <h1 className="track-artist">{post.artist}</h1>
                            </div>

                            
                        </div>
                        <Waveform audioRef={this.props.audioRef} selected={post.selected} id={post.id} peaks={post.peaks} src={post.file}/>
                        
                        
                </div> </>)
    }
}

const mapStateToProps = (state, props) => ({
    post: state.posts[props.index]
  });

  export default connect(mapStateToProps)(TrackInfo);
