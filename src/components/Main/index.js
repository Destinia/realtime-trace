import React, { Component, PropTypes } from 'react';
// import { Motion, spring } from 'react-motion';
import GoogleMap from '../common/GoogleMap';
import styles from './Main.module.css';


class Main extends Component {
  render() {
    return (
      <div className={`row ${styles.main}`}>
        <div className="col-xs-4" />
        <div className="col-xs-8">
          <GoogleMap />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
};

export default Main;
