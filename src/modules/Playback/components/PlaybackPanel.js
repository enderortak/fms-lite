import React from "react";
import propTypes from "prop-types";
import { PlayButton, PauseButton, ProgressBar, VolumeSlider, ControlDirection } from "react-player-controls";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import Cluster from "./../../Vehicle/components/Cluster";
import "./PlaybackPanel.scss";

const PlaybackPanel = ({
  isPlaying, currentTime, currentPoint, totalPoints, onSeek, onSeekStart, onSeekEnd,
  speed, vehicleSpeed, onSpeedChange, onExit, onPlay, onPause, onTogglePath, isPathVisible,
}) =>
  (
    <Menu
      color="grey"
      compact
      inverted
      icon
      style={{
    bottom: "20px",
    height: "70px",
    width: "50%",
    position: "fixed",
    left: "25%",
    opacity: "0.9",
}}
    >
      <Cluster speed={vehicleSpeed} />
      <Menu.Item>
        { !isPlaying && <PlayButton isEnabled onClick={onPlay} /> }
        { isPlaying && <PauseButton isEnabled onClick={onPause} /> }
      </Menu.Item>
      <Menu.Item style={{ flexDirection: "column", justifyContent: "space-around" }}>
        <div>{currentTime.format("DD.MM.YYYY ddd")}</div>
        <div>{currentTime.format("HH:mm")}</div>
      </Menu.Item>
      <Menu.Item
        style={{ flex: "1", paddingBottom: "0.5em", alignItems: "flex-end" }}
        content={
          <ProgressBar
            totalTime={totalPoints}
            currentTime={currentPoint}
            isSeekable
            onSeek={onSeek}
            onSeekStart={onSeekStart}
            onSeekEnd={onSeekEnd}
          />
            }
      />
      <Dropdown item icon="ellipsis horizontal" upward inline>
        <Dropdown.Menu>
          <Dropdown.Header style={{ textAlign: "center" }}>HIZ</Dropdown.Header>
          <Dropdown.Header style={{ textAlign: "center" }}>
            <VolumeSlider
              style={{ display: "inline-block" }}
              direction={ControlDirection.HORIZONTAL}
              isEnabled
              volume={speed}
              onVolumeChange={onSpeedChange}
            />
          </Dropdown.Header>
          <Dropdown.Item
            onClick={onTogglePath}
            active={isPathVisible}
            icon={isPathVisible ? "checkmark" : ""}
            content="GPS harita izi"
          />
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item>
        <Button
          icon="window close"
          basic
          color="red"
          inverted
          size="massive"
          onClick={onExit}
          style={{ fontSize: "3em", padding: "0", border: "none" }}
        />
      </Menu.Item>
    </Menu>
  );
PlaybackPanel.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  currentTime: propTypes.number.isRequired,
  currentPoint: propTypes.number.isRequired,
  totalPoints: propTypes.number.isRequired,
  speed: propTypes.number.isRequired,
  vehicleSpeed: propTypes.number.isRequired,
  isPathVisible: propTypes.bool.isRequired,
  onSeek: propTypes.func.isRequired,
  onSeekStart: propTypes.func.isRequired,
  onSeekEnd: propTypes.func.isRequired,
  onPlay: propTypes.func.isRequired,
  onPause: propTypes.func.isRequired,
  onSpeedChange: propTypes.func.isRequired,
  onTogglePath: propTypes.func.isRequired,
  onExit: propTypes.func.isRequired,
};
export default PlaybackPanel;
