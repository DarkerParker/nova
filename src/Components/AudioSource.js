import React from "react";

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
    localStorage.setItem('vol', this.player.volume)
  }

  tryNext(){
    const post = this.props.posts.find((post) => post.id === this.props.player.id - 1)
    if (post){
        this.props.setTrack(post.file, post.id);
    }
  }

  componentWillUnmount() {
    // this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.player.track !== prevProps.player.track) {
      const track = this.props.player.track;
      if (track) {
        this.player.src = track;
        if(prevProps.player.track){
            this.player.play();
        }
        this.player.volume = this.props.player.volume;
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

    return (<audio onEnded={this.tryNext} onVolumeChange={this.volumeChanged} className="player" ref={ref => (this.player = ref)} controls />
    );
  }
}

export default AudioSource