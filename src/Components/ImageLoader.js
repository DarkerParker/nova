import React from "react";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ShareIcon from '@material-ui/icons/Share';
import {Link} from 'react-router-dom'

const _loaded = {};

class ImageLoader extends React.Component {
  
  //initial state: image loaded stage 
  state = {
    loaded: _loaded[this.props.src]
  };

  //define our loading and loaded image classes
  static defaultProps = {
    className: "",
    loadingClassName: "img-loading",
    loadedClassName: "img-loaded",
  };

  //image onLoad handler to update state to loaded
  onLoad = () => {
    _loaded[this.props.src] = true;
    this.setState(() => ({ loaded: true }));
  };


  render() {
  
    let { className, loadedClassName, loadingClassName} = this.props;

      className = `${className} ${this.state.loaded
        ? loadedClassName
        : loadingClassName}`;

      var backsplash={
        borderRadius: "20px",
     }

     className = `${className} ${this.props.selected
      ? 'selected'
      : 'unselect'}`;

        

     var playing = this.props.selected ? <svg fill="currentColor" id="wave" className="playing" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
        <path id="Line_1" data-name="Line 1" d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"/>
        <path id="Line_2" data-name="Line 2" d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"/>
        <path id="Line_3" data-name="Line 3" d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"/>
        <path id="Line_4" data-name="Line 4" d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"/>
        <path id="Line_5" data-name="Line 5" d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"/>
        <path id="Line_6" data-name="Line 6" d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"/>
        <path id="Line_7" data-name="Line 7" d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"/>
        <path id="Line_8" data-name="Line 8" d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"/>
        <path id="Line_9" data-name="Line 9" d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"/>
     </svg> : "";

    return (<div style={{backsplash, position: 'relative', color:`#${this.props.color}`}}><div style={backsplash} className={'animate-track'} ><img 
                src={this.props.src} 
                 
                className={`${className}`} 
                alt={this.props.alt}
                onLoad={this.onLoad} />
                {playing}
                  <div className={'controls'} >
                    <PlayCircleOutlineIcon className={'play-icon'} onClick={this.props.onClick}/>
                    <FavoriteBorderIcon className={'like-icon'}/>
                    <QueueMusicIcon className={'queue-icon'}/>
                    <ShareIcon className={'share-icon'}/>
                    <Link className="track-link" to={`/single/${this.props.id}`}></Link>
                  </div>
                </div>

                </div>);
  }
}

//I think the controls should grab all the clicks for playing etc.... underlying animations shouldnt be touched


export default ImageLoader;