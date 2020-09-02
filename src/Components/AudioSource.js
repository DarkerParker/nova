import React from "react";
import {connect} from 'react-redux'

// function getTime(time) {
//   if (!isNaN(time)) {
//     return (
//       Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
//     );
//   }
// }

class AudioSource extends React.Component {
  state = {
    player: "stopped",
    currentTime: null,
    duration: null
  };
  constructor(){
      super();
      this.player = React.createRef();
      this.volumeChanged = this.volumeChanged.bind(this);
      this.tryNext = this.tryNext.bind(this);
  }

  volumeChanged(){
    localStorage.setItem('vol', this.refs.player.volume)
  }

  tryNext(){
    const post = this.props.posts.find((post) => post.id === this.props.player.id - 1)
    const index = this.props.posts.findIndex((post) => post.id === this.props.player.id - 1)
    if (post){
        this.props.setTrack(post.file, post.id, index);
    }
  }

  componentWillUnmount() {
    // this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidMount(){
    this.props.addAudioRef(this.refs.player)
    // this.player.addEventListener("timeupdate", e => {

    //   var progress = e.target.currentTime / e.target.duration * 100;

    //   if(!progress){
    //     progress = 0;
    //   }

    //   console.log(progress);
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.player.track !== prevProps.player.track) {
      const track = this.props.player.track;
      if (track) {
        this.refs.player.src = track;
        if(prevProps.player.track){
          this.refs.player.play();
        }
        // this.props.player.volume = 0.1;
        this.refs.player.volume = this.props.player.volume;
        // this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    // if (this.state.player !== prevState.player) {
    //   if (this.state.player === "paused") {
    //     this.player.pause();
    //   } else if (this.state.player === "stopped") {
    //     this.player.pause();
    //     this.player.currentTime = 0;
    //     // this.setState({ selectedTrack: null });
    //   } else if (
    //     this.state.player === "playing" &&
    //     prevState.player === "paused"
    //   ) {
    //     // this.player.play();
    //   }
    // }
  }

  render() {

    return (<audio 
              id={"audio-element"} 
              onEnded={this.tryNext} 
              onVolumeChange={this.volumeChanged} 
              className="player" 
              ref="player" 
              controls 
            />
    );
  }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    player:state.player
  });
  
export default connect(mapStateToProps)(AudioSource);