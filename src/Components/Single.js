import React, {Component} from 'react'
import Comments from './Comments'
import {connect} from 'react-redux'
import TrackInfo from './TrackInfo'


class Single extends Component{

    render(){
        const {match, posts} = this.props
        const id = Number(match.params.id)
        const post = posts.find((post) => post.id === id)
        const postIndex = posts.findIndex((post) => post.id === id)
        const comments = this.props.comments[id] || []

        if(this.props.loading){
            return(<div className="loader">loading!</div>)
        }else if(post){
            return(<div style={{color:`#${post.dominantColor}`}} className='single'>
                
                <TrackInfo audioRef={this.props.audioRef} index={postIndex}/>
                <h1 className="single-title">Comments</h1>
                <Comments postId={id} comments={comments} startAddingComment={this.props.startAddingComment}/>

                </div> )
        }else{
            return(<h1>No Post Found.</h1>)
        }
        
    }
    
}
const mapStateToProps = (state) => ({
    posts: state.posts,
  });
  
export default connect(mapStateToProps)(Single);