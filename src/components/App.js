import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, x: 0, y: 0 };
    this.startTimer = this.startTimer.bind(this);
    this.timerId = null;
    this.stopTimer = this.stopTimer.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.startGame = false;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.endGame = false;
  }
  startTimer() {
    this.timerId = setInterval(() => {
      let second = this.state.time;
      this.setState({ time: second + 1 });
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  handleStart() {
    if (this.endGame) return;
    if (this.startGame) return;
    this.startGame = true;
    this.startTimer();
  }

  handleKeyDown(event) {
    if (!this.startGame) return;
    if (this.endGame) return;

    let newX = this.state.x;
    let newY = this.state.y;

    if (newX === 250 && newY === 250) {
      this.stopTimer();
      this.endGame = true;
      return;
    }
    if (event.keyCode === 39) {
      newX += 5;
    } else if (event.keyCode === 37) {
      newX -= 5;
    } else if (event.keyCode === 40) {
      newY += 5;
    } else if (event.keyCode === 38) {
      newY -= 5;
    }
    this.setState({ x: newX, y: newY });

    newX = this.state.x;
    newY = this.state.y;

    if (newX === 250 && newY === 250) {
      this.stopTimer();
      this.endGame = true;
      return;
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <>
        <div className="heading-timer">{this.state.time}</div>
        <button className="start" onClick={this.handleStart}>
          start
        </button>
        <div
          style={{ left: `${this.state.x}px`, top: `${this.state.y}px` }}
          className="ball"
        ></div>
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
