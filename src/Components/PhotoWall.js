import React from 'react'
import Photo from './Photo'
import {connect} from 'react-redux'

// import {Link} from 'react-router-dom'

class PhotoWall extends React.Component {
    render() { 
        return(<div>
                {/* <Link className="addIcon" to="/AddPhoto"></Link> */}
                {/* <button onClick={props.onNavigate} className="addIcon"></button> */}
                <div className="photo-grid">
                    {this.props.posts.sort(function(x,y){
                        return y.id - x.id
                    }).map((post,index) => <Photo key={post.id} index={index} setTrack={this.props.setTrack}/>)}
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
  });
  
export default connect(mapStateToProps)(PhotoWall);
