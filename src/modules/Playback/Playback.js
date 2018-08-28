import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { exitPlaybackMode } from "./Playback.Actions";
import MapService from "./../../service/MapService";
import PlaybackPanel from "./components/PlaybackPanel";
import { Debugger } from "../../service/DebugService";


const speedAmplifier = 7;

class Playback extends React.Component {
  static propTypes = {
    historyData: propTypes.arrayOf(propTypes.object).isRequired,
    exitPlaybackMode: propTypes.func.isRequired,
    onExit: propTypes.func,
    onUpdate: propTypes.func,
  }
  static defaultProps = {
    onUpdate: null, onExit: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentPoint: 0,
      speed: 3,
      isPathVisible: true,
    };
    this.data = this.props.historyData.map((i, ind) => this.prepareData(i, ind, this.props.historyData));
    this.calculateViewport = this.calculateViewport.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.move = this.move.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleSeekStart = this.handleSeekStart.bind(this);
    this.handleSeekEnd = this.handleSeekEnd.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleTogglePath = this.handleTogglePath.bind(this);

    this.prepareData = this.prepareData.bind(this);
    this.getTimeOfPoint = this.getTimeOfPoint.bind(this);
  }
  componentDidMount() {
    this.map = new MapService();
    const { lat, long } = this.data[0];
    this.playbackMarker = this.map.addMarker([lat, long], { icon: this.map.createVehicleIcon() });
    if (this.state.isPathVisible) this.drawPath();
    this.map.setBounds(this.calculateViewport());
    this.popups = {};
  }
  getTimeOfPoint = i => this.convert2Date(this.data[i].dateTime);
  getLatLongOfPoint = i => [this.data[i].lat, this.data[i].long];
  calculateViewport() {
    const latArr = this.data.map(i => i.lat);
    const longArr = this.data.map(i => i.long);
    return [
      [Math.min(...latArr), Math.min(...longArr)],
      [Math.max(...latArr), Math.max(...longArr)],
    ];
  }

  convert2Date = dateString => moment(dateString, "YYYYMMDDHHmmss");
  convert2Unix = dateString => this.convert2Date(dateString).unix() * 1000;

  prepareData = (dataPoint, index, dataArray) => {
    const output = { ...dataPoint };
    if (dataArray[index + 1]) {
      output.waitTime = this.convert2Unix(dataArray[index + 1].dateTime) - this.convert2Unix(dataArray[index].dateTime);
    }
    output.stopped = output.speed < 10 && output.waitTime && output.waitTime > 1000 * 60 * 5;
    if (output.stopped) {
      let i = index + 1;
      while (dataArray[i] && dataArray[i].speed < 10) i += 1;
      output.stoppedUntil = i;
    }
    return output;
  }

  start = () => {
    this.setState({ isPlaying: true });
    const denumerator = this.state.speed > 0 ? this.state.speed * speedAmplifier : 1;
    const advanceToNextPoint = (i) => {
      this.move(i); // move marker
      if (i + 1 <= this.data.length - 1) { // if not last data point
        if (this.data[i].waitTime !== undefined) { // look for the wait time
          this.playback = setTimeout(() => { // if wait time is set, call next point with setTimeout
            advanceToNextPoint(i + 1);
          }, this.data[i].waitTime / denumerator);
        } else advanceToNextPoint(i + 1); // else call it directly
      } else this.stop(false); // if it is the last point, stop player
    };
    advanceToNextPoint(this.state.currentPoint);
  }
  stop = (isSeeking) => {
    if (!isSeeking) this.setState({ isPlaying: false });
    clearTimeout(this.playback);
  }

  move = (i) => {
    if (this.data[i]) {
      if (this.data[i].stopped) this.handleVehicleStopped(i);
      else this.handleVehicleMoved();
      if (this.data[i].type === "spdLimVio") this.handleSpdLimVio(i);
      this.playbackMarker.setLatLng([this.data[i].lat, this.data[i].long]);
      this.setState({ currentPoint: i });
      const dbgr = new Debugger();
      dbgr.display("Current point", this.state.currentPoint);
      // if (this.state.isPathVisible) this.path.setLatLngs(this.data.slice(i).map(p => [p.lat, p.long]));
      if (this.props.onUpdate && typeof this.props.onUpdate === "function") { this.props.onUpdate(i); }
      if (i === this.data.length - 1) {
        this.popups.endOfPlayback = this.map.addPopup(this.getLatLongOfPoint(i), "<h4>Araç geçmişinin sonu</h4>");
      } else {
        if (this.popups.endOfPlayback) this.popups.endOfPlayback.remove();
        this.popups.endOfPlayback = null;
      }
    }
  }

  handleVehicleStopped = (i) => {
    if (this.popups.stopped) this.popups.stopped.remove();
    window.movet = (p) => {
      this.handleSeekStart();
      this.handleSeek(p);
      this.handleSeekEnd();
    };
    this.popups.stopped = this.map.addPopup(
      [this.data[i].lat, this.data[i].long],
      `<h4>Araç durdu.</h4>
      <div style="margin-bottom: 1em;">
        Hareket zamanı: ${this.getTimeOfPoint(this.data[i].stoppedUntil).format("HH:mm DD.MM.YYYY")}
      </div>
      <a href="#" onclick="movet(${this.data[i].stoppedUntil + 1})">Atla</a>`,
    );
  }
  handleVehicleMoved = () => { if (this.popups.stopped) this.popups.stopped.remove(); }

  handleSpdLimVio = (i) => {
    if (this.popups.spdLimVio) this.popups.spdLimVio.remove();
    this.popups.spdLimVio = this.map.addPopup(
      [this.data[i].lat, this.data[i].long],
      `<h4>Hız limiti aşımı!</h4>
      <p>${Math.round(this.data[i].speed)} km/s</p>`,
    );
    setTimeout(() => this.popups.spdLimVio.remove(), 3000);
  }
  handlePlay = () => this.start();
  handlePause = () => this.stop(false);

  handleSeek = (currentPoint) => {
    const i = Math.floor(currentPoint);
    this.move(i);
  }
  handleSeekStart = () => this.stop(true);
  handleSeekEnd = () => { if (this.state.isPlaying) this.start(this.state.currentPoint); }

  handleSpeedChange(speed) {
    this.setState({ speed: Math.floor(speed * 10) });
    this.stop(true);
    this.start();
  }
  handleExit() {
    if (this.state.isPathVisible) this.path.remove();
    this.props.exitPlaybackMode();
    if (this.props.onExit && typeof this.props.onExit === "function") this.props.onExit();
  }
  drawPath = () => { this.path = this.map.addAntPath(this.data.map(i => [i.lat, i.long])); }
  removePath = () => { this.path.remove(); this.path = null; }
  handleTogglePath = () => {
    if (this.state.isPathVisible) this.drawPath();
    else this.removePath();

    this.setState({ isPathVisible: !this.state.isPathVisible });
  }
  render() {
    return (
      <PlaybackPanel
        isPlaying={this.state.isPlaying}
        currentTime={this.getTimeOfPoint(this.state.currentPoint)}
        currentPoint={this.state.currentPoint}
        totalPoints={this.data.length}
        speed={this.state.speed / 10}
        vehicleSpeed={this.data[this.state.currentPoint].speed}
        isPathVisible={this.state.isPathVisible}
        onSeek={this.handleSeek}
        onSeekStart={this.handleSeekStart}
        onSeekEnd={this.handleSeekEnd}
        onSpeedChange={this.handleSpeedChange}
        onPlay={this.start}
        onPause={this.stop}
        onExit={this.handleExit}
        onTogglePath={this.handleTogglePath}
      />
    );
  }
}
const state2Props = state => ({ historyData: state.playback.historyData });
const dispatch2Props = dispatch => ({
  exitPlaybackMode: () => dispatch(exitPlaybackMode()),
});
export default connect(state2Props, dispatch2Props)(Playback);
// closest(num, arr) {
//   let curr = arr[0];
//   let diff = Math.abs(num - curr);
//   for (let val = 0; val < arr.length; val += 1) {
//     const newdiff = Math.abs(num - arr[val]);
//     if (newdiff < diff) {
//       diff = newdiff;
//       curr = arr[val];
//     }
//   }
//   return curr;
// }
