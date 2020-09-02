import React from 'react'

import LazyLoad from 'react-lazy-load';
import ImageLoader from './ImageLoader';
import {connect} from 'react-redux'
import Waveform from './Waveform'

class Photo extends React.Component {


    render(){
        const post = this.props.post


        return( <figure className="figure">
                    
                        <LazyLoad
                            // width={'100%'}
                            debounce={false}
                        >
                            <ImageLoader post={post} id={post.id} {...this.props} selected={post.selected} onClick={()=>this.props.setTrack(post.file, post.id, this.props.index)} className="photo" src={post.imageLink} alt={post.description} color={post.dominantColor}/>
                            
                        </LazyLoad>

                    {/* <div className="button-container"> */}
                        {/* <button className="remove-button" onClick={ () => {
                            props.startRemovingPost(props.index, post.id)
                            if (props.history){
                                props.history.push("/")
                            }
                        }}>Remove</button> */}
                        {/* <Link className="button" to={`/single/${post.id}`}>
                            <div className="comment-count">
                                <div className="speech-bubble"></div>
                                {props.comments[post.id] ? props.comments[post.id].length : 0}
                            </div>
                        </Link> */}
                    {/* </div> */}
                    <Waveform audioRef={this.props.audioRef} selected={post.selected} id={post.id} peaks={post.peaks} src={post.file}/>
                </figure> )
    }
}

const mapStateToProps = (state, props) => ({
    post: state.posts[props.index]
  });

  export default connect(mapStateToProps)(Photo);
