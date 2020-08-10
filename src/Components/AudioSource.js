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
  }

  volumeChanged(){
    localStorage.setItem('vol', this.player.volume)
  }

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
    //   this.setState({
    //     currentTime: e.target.currentTime,
    //     duration: e.target.duration
    //   });
    });

        
    

  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedTrack !== prevProps.selectedTrack) {
      const track = this.props.selectedTrack;
      if (track) {
        this.player.src = track;
        this.player.play();
        this.player.volume = this.props.volume;
        // this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        // this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        // this.player.play();
      }
    }
  }

  render() {

    return (
      <>
        {/* <div>
          {this.state.player === "paused" && (
            <button onClick={() => this.setState({ player: "playing" })}>
              Play
            </button>
          )}
          {this.state.player === "playing" && (
            <button onClick={() => this.setState({ player: "paused" })}>
              Pause
            </button>
          )}
          {this.state.player === "playing" || this.state.player === "paused" ? (
            <button onClick={() => this.setState({ player: "stopped" })}>
              Stop
            </button>
          ) : (
            ""
          )}
        </div> */}
        {/* {this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
          </div>
        ) : (
          ""
        )} */}
        <audio onVolumeChange={this.volumeChanged} className="player" ref={ref => (this.player = ref)} controls />
      </>
    );
  }
}

export default AudioSource