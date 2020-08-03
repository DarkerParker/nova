import React, {Component} from 'react'
import Photo from './Photo'
import Comments from './Comments'

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
            return( <div className="single-photo">
                    <Photo post={posts[postIndex]} key={id} index={postIndex} {...this.props}/>
                    <Comments postId={id} comments={comments} startAddingComment={this.props.startAddingComment}/>
                </div> )
        }else{
            return(<h1>No Post Found.</h1>)
        }
        
    }
    
}

export default Single