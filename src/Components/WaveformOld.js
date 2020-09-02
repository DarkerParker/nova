import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'

export default class Waveform extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  
  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave' + this.props.id)    

    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      barWidth: 2,
      cursorWidth: 1,
      height: 150,
      waveColor: 'white',
      progressColor: '#00c8e8',
      responsive: true,
      pixelRatio:2,
      cursorColor: 'transparent',
      progress: 0,
    })

      fetch(this.props.peaks)
        .then(res => res.json())
        .then(
          (result) => {
            this.wavesurfer.backend.peaks = result.data; 
            this.wavesurfer.drawBuffer();
            // this.wavesurfer.seekTo(0.5);
          },

          (error) => {
            
          }
        )

  }

  handleClick(e) {
    console.log(e.target);
  }
 
  render() {
    return (<>
      <div className="wave-container">
        <div className='waveform' >
          <div className={'wave'+ this.props.id} >

          </div>
        </div>
      </div>  
      </>
    )
  }
}

Waveform.defaultProps = {
  src: ""
}