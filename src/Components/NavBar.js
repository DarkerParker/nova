import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AudioSource from './AudioSource'
import {Link} from 'react-router-dom'

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 2,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>

      <ElevationScroll>
        <AppBar>
          <Toolbar style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Typography  variant="h4" >
                  <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/" >NOVA</Link>
              </Typography>

              <AudioSource selectTrack={props.selectTrack} {...props}/>
              
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
