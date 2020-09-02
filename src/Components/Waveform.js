import React from 'react'
import { Component } from 'react';
import { withResizeDetector } from 'react-resize-detector';
// import { findDOMNode } from 'react-dom'

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}


class AdaptiveComponent extends Component {
  state = {
    ctx:null,
    peaks:[],
    start:0,
    end:0,
  };


  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }

  // shouldComponentUpdate() {   
  //     const now = new Date();  
  //     var seconds = (now.getTime() - this.lastUpdateDate.getTime()) / 1000;   
  //     return seconds >= 0.1;
  // }


  drawPeaks(ctx, peaks, start, end, width){
    // Split channels
    ctx.fillStyle = ctx.params.waveColor;
    if (peaks[0] instanceof Array) {
      var channels = peaks;
      if (ctx.params.splitChannels) {
        ctx.setHeight(channels.length * ctx.params.height * ctx.params.pixelRatio);
          channels.forEach(function (channelPeaks, i) {
              return ctx.drawBars(channelPeaks, i, start, end);
          });
          return;
      }
      peaks = channels[0];
    }

    // Bar wave draws the bottom only as a reflection of the top,
    // so we don't need negative values
    var hasMinVals = [].some.call(peaks, function (val) {
        return val < 0;
    });
    // Skip every other value if there are negatives.
    var peakIndexScale = hasMinVals ? 2 : 1;

    // A half-pixel offset makes lines crisp
    var height = ctx.params.height * ctx.params.pixelRatio;
    var offsetY = height * 0 || 0;
    var halfH = height / 4;
    var length = peaks.length / peakIndexScale;
    var bar = ctx.params.barWidth * ctx.params.pixelRatio;
    var gap = Math.max(ctx.params.pixelRatio, ~~(bar / 2));
    var step = bar + gap;

    var scale = length / width;
    var i = void 0;

    for (i = start / scale; i < end / scale; i += step) {
        var peak = peaks[Math.floor(i * scale * peakIndexScale)] || 0;
        var h = Math.round(peak * halfH);
        ctx.fillRect(i + 0, halfH - h + offsetY, bar + 0, h * 2);

    }
  }

  initializeCanvas(){
    if(this.refs.canvas){
      const ctx = this.refs.canvas.getContext('2d');
      ctx.params = {
        barWidth: 2,
        cursorWidth: 1,
        height: 150,
        waveColor: 'white',
        progressColor: '#00c8e8',
        responsive: true,
        pixelRatio:2,
        cursorColor: 'transparent'
      }
      
      ctx.fillStyle = ctx.params.waveColor;
      this.setState({
        ctx: ctx,
        progressNum:0,
      });

      this.drawPeaks(ctx, this.state.peaks, 0, this.refs.canvas.getBoundingClientRect().width*2, this.refs.canvas.getBoundingClientRect().width)
    }
  }

  initializeProgress(){
    if(this.refs.progress){
      const progress = this.refs.progress.getContext('2d');
      progress.params = {
        barWidth: 2,
        cursorWidth: 1,
        height: 150,
        waveColor: '#00c8e8',
        progressColor: '#00c8e8',
        responsive: true,
        pixelRatio:2,
        cursorColor: 'transparent'
      }
      progress.fillStyle = progress.params.waveColor;
      this.setState({
        progress:progress
      });
      this.drawPeaks(progress, this.state.peaks, 0, this.refs.canvas.getBoundingClientRect().width*2, this.refs.canvas.getBoundingClientRect().width);
      this.props.audioRef.addEventListener("timeupdate", this.setMaskWidth);
    }
  }

  componentWillUnmount() {
    this.props.audioRef.removeEventListener("timeupdate", this.setMaskWidth);
  }

  setMaskWidth = e => {
    var progress = e.target.currentTime / e.target.duration * 100;

    if(!progress){
      progress = 0;
    }
    if(this.refs.progressHider){
      this.refs.progressHider.style.width = progress + "%";
    }

  }

  componentDidMount(){

    fetch(this.props.peaks)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({peaks:result.data})
            this.initializeCanvas();
            if(this.props.selected){
              this.initializeProgress();
            }
            
          },

          (error) => {
            
          }
        )
  }
 
  componentDidUpdate(prevProps) {
    const { width } = this.props;
 
    if (width !== prevProps.width && this.state.ctx) {
      this.drawPeaks(this.state.ctx, this.state.peaks, this.state.start, width * 2, width)
      if(this.props.selected){
        this.drawPeaks(this.state.progress,this.state.peaks, this.state.start, width * 2, width)
      }
    }

    if(prevProps.selected === false && this.props.selected){
      this.initializeCanvas();
      this.initializeProgress();
      // this.props.audioRef.addEventListener("timeupdate", this.setMaskWidth);

    }
    else if (prevProps.selected && !this.props.selected){
      this.initializeCanvas();
    }
  }

  handleClick(e){
    e.preventDefault();

    var clientX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
    var bbox = e.target.getBoundingClientRect();

    var nominalWidth = this.state.progress.width;
    var parentWidth = e.target.getBoundingClientRect();

    var progress = void 0;

    if (! this.state.progress.params.fillParent && nominalWidth < parentWidth) {
        progress = (clientX - bbox.left) * this.params.pixelRatio / nominalWidth || 0;

        if (progress > 1) {
            progress = 1;
        }
    } else {
        progress = (clientX - bbox.left + e.target.scrollLeft) / e.target.scrollWidth || 0;
    }


    // this.setState({progressNum:progress});

    // this.refs.progressHider.style.width = progress * 100 + "%";
    return progress;
  }
 
  render() {
    const { width } = this.props;

    // console.log(this.props.selected);
    if(!this.props.selected) {
      return(
      <div className='waveform'>
        <canvas ref="canvas" width={width} height={75}/>
      </div>
    );
      
      
    }
    else{
      return(
      <div className='waveform' onClick={this.handleClick}>
        <div className="progressHider" ref="progressHider">
          <canvas ref="progress"  className="progress" width={width} height={75}/>
        </div>
        <canvas ref="canvas" width={width} height={75}/>
      </div>
      );
    }
    
  }
}
 
const AdaptiveWithDetector = withResizeDetector(AdaptiveComponent);

export default class Waveform extends React.Component {


  handleClick(e) {
    console.log(e.target);
  }

  
 
  render() {
    return (<>
      <div className="wave-container">     
        <AdaptiveWithDetector audioRef={this.props.audioRef} selected={this.props.selected} peaks={this.props.peaks}/>
      </div> 
      </>
    )
  }
}

Waveform.defaultProps = {
  src: ""
}
