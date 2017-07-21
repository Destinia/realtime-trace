import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { firebaseConnect, helpers } from 'react-redux-firebase';
import GoogleMap from '../common/GoogleMap';
import MapMarker from '../common/MapMarker';
import styles from './Main.module.css';

const { isLoaded, isEmpty, dataToJS } = helpers;


const renderDataInfo = (info) => {
  if (info) {
    const { Acc, Gyr, Mag, Alt, Lat, Lon, Spd } = info;
    return (
      <div className={styles.table}>
        <div>{`加速度（X/Y/Z）：${Acc.X.toFixed(3)}/${Acc.Y.toFixed(3)}/${Acc.Z.toFixed(3)}`}</div>
        <div>{`角加速度（X/Y/Z）：${Gyr.X.toFixed(3)}/${Gyr.Y.toFixed(3)}/${Gyr.Z.toFixed(3)}`}</div>
        <div>{`磁場（X/Y/Z）：${Mag.X.toFixed(3)}/${Mag.Y.toFixed(3)}/${Mag.Z.toFixed(3)}`}</div>
        <div>{`高度：${Alt}`}</div>
        <div>{`經度/緯度：${Lon.toFixed(5)}/${Lat.toFixed(5)}`}</div>
        <div>{`速度：${Spd.toFixed(3)}`}</div>
      </div>);
  }
  return (
    <div className={styles.table}>
      <div>{'加速度（X/Y/Z）：'}</div>
      <div>{'角加速度（X/Y/Z）：'}</div>
      <div>{'磁場（X/Y/Z）：'}</div>
      <div>{'高度：'}</div>
      <div>{'經度/緯度：'}</div>
      <div>{'速度：'}</div>
    </div>
  );
};

@firebaseConnect([
  { path: '/' }, // object notation
])
@connect(
  ({ firebase }) => ({
    // Connect todos prop to firebase todos
    data: dataToJS(firebase, '/Data'),
  })
)
class Main extends Component {

  constructor() {
    super();
    this.state = {
      hover: '',
    };
  }

  handleMarkerClick = (time) => () => {
    this.setState({ hover: time });
  }

  checkTimeInSelect = (time) => {
    if (moment(time).isBetween(moment(this.state.startTime), moment(this.state.endTime))) {
      return true;
    }
    return false;
  }

  renderMapMarker = (el, time, color) => (
    <MapMarker
      lat={el.Lat}
      lng={el.Lon}
      time={time}
      color={color}
      key={time}
      onClick={this.handleMarkerClick(time)}
    />);


  render() {
    const { data } = this.props;
    const locations = isLoaded(data) ? this.props.data : {};
    const hoverData = locations[this.state.hover];
    return (
      <div className={`row ${styles.main}`}>
        <div className="col-xs-4">
          {renderDataInfo(hoverData)}
          <div className={styles.buttonContainer}>
            <button className="btn btn-primary" onClick={this.handleAddBtnClick}>Add</button>
            <button className="btn btn-info" onClick={this.handleTestBtnClick}>Test</button>
            <button className="btn btn-warning"onClick={this.handleClearBtnClick}>Clear</button>
            <button className="btn btn-danger" onClick={this.handleResetBtnClick}>Reset</button>
          </div>
        </div>
        <div className="col-xs-8">
          <div className={styles.mapContainer}>
            <GoogleMap>
              {
                Object.keys(locations).map(key =>
                  this.renderMapMarker(locations[key], key, 'green'))
              }
            </GoogleMap>
          </div>
        </div>
      </div>
    );
  }
}



Main.propTypes = {
  data: PropTypes.object,
  firebase: PropTypes.object,
  prediction: PropTypes.object,
  createPredictionRequest: PropTypes.func,
  testPredictionRequest: PropTypes.func,
  resetPredictionRequest: PropTypes.func,
  updatePredictionDataRequest: PropTypes.func,
};

export default Main;
