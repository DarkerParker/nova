import React from 'react'

import LazyLoad from 'react-lazy-load';
import ImageLoader from './ImageLoader';
import {connect} from 'react-redux'

class Photo extends React.Component {


    render(){
        const post = this.props.post

        const fullLoaded = this.props.fullLoaded ? true : false

        return( <figure className="figure">
                    
                        <LazyLoad
                            width={'100%'}
                            debounce={false}
                        >
                            <ImageLoader id={post.id} fullLoaded={fullLoaded} {...this.props} selected={post.selected} onClick={()=>this.props.setTrack(post.file, post.id, this.props.index)} className="photo" src={post.imageLink} alt={post.description} color={post.dominantColor}/>
                            
                        </LazyLoad>

                    <div className="button-container">
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
                    </div>
                </figure> )
    }
}

const mapStateToProps = (state, props) => ({
    post: state.posts[props.index]
  });

  export default connect(mapStateToProps)(Photo);
