import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import keydown from 'react-keydown';
import classNames from 'classnames';

import VideoCustomBarComponent from './VideoCustomBarComponent';
import VideoCustomQuizBarComponent from './VideoCustomQuizBarComponent';

import './VideoCustomProgressBarStyle.scss';

const { func, number, string } = PropTypes;

const propTypes = {
  VideoProgressBarClassName: string,
  onCustomSeekBarMouseDown: func.isRequired,
  onCustomSeekBarChange: func.isRequired,
  onCustomSeekBarMouseUp: func.isRequired,
  onCustomSeekBarClick: func.isRequired,
  onArrowKeyPressed: func.isRequired,
  duration: number,
  playedPercentage: number,
  loadedPercentage: number
};

const defaultProps = {
  VideoProgressBarClassName: '',
  duration: 1,
  playedPercentage: 0,
  loadedPercentage: 0
};

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 100;
const SHIFT_AMOUNT_PERCENTAGE = 0.15;

class VideoCustomProgressBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1,
      duration: 1,
      played: 0,
      loaded: 0,
      isDragging: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { duration, playedPercentage, loadedPercentage } = nextProps;

    this.setState({
      duration,
      played: playedPercentage * 100,
      loaded: loadedPercentage * 100
    });
  }

  render() {
    const { played, loaded, duration } = this.state;
    const { VideoProgressBarClassName } = this.props;

    return (
      <div
        className={ classNames('player-progress-bar', VideoProgressBarClassName) }
        onMouseDown={ this.onCustomSeekBarMouseDown }
        onMouseMove={ this.onCustomSeekBarChange }
        onMouseUp={ this.onCustomSeekBarMouseUp }
        onClick={ this.onCustomSeekBarClick }>
        <VideoCustomBarComponent
          played={ played }
          loaded={ loaded } />
        <VideoCustomQuizBarComponent
          duration={ duration } />
      </div>
    );
  }

  @autobind
  onCustomSeekBarMouseDown(e)  {
    this.setState({ isDragging: true });
    this.props.onCustomSeekBarMouseDown();
    e.stopPropagation();
    e.preventDefault;
  }

  @autobind
  onCustomSeekBarChange(e) {
    if (this.state.isDragging) {
      const movedPosition = this.calculateMovedPosition(e);
      this.setState({ played: movedPosition });
      this.props.onCustomSeekBarChange(movedPosition);
    }
    e.stopPropagation();
    e.preventDefault;
  }

  @autobind
  onCustomSeekBarMouseUp(e) {
    this.setState({ isDragging: false });
    this.props.onCustomSeekBarMouseUp(this.state.played);
    e.stopPropagation();
    e.preventDefault;
  }

  @autobind
  onCustomSeekBarClick(e) {
    if (!this.state.isDragging) {
      const movedPosition = this.calculateMovedPosition(e);
      this.setState({ played: movedPosition });
      this.props.onCustomSeekBarClick(movedPosition);
    }
  }

  calculateMovedPosition(e) {
    const { left, right } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const rLeft = left - document.body.getBoundingClientRect().left;

    let movedPosition = ((e.clientX - rLeft) / (right - rLeft)) * 100;
    if (movedPosition < PROGRESS_MIN) {
      movedPosition = min;
    }
    if (movedPosition > PROGRESS_MAX) {
      movedPosition = max;
    }

    return movedPosition;
  }

  @autobind
  @keydown('left')
  onLeftArrowKeyPressed() {
    const changedPlayed = this.state.played - SHIFT_AMOUNT_PERCENTAGE;
    this.props.onArrowKeyPressed(changedPlayed);
  }

  @autobind
  @keydown('right')
  onRightArrowKeyPressed() {
    const changedPlayed = this.state.played + SHIFT_AMOUNT_PERCENTAGE;
    this.props.onArrowKeyPressed(changedPlayed);
  }
}

VideoCustomProgressBarComponent.propTypes = propTypes;
VideoCustomProgressBarComponent.defaultProps = defaultProps;

export { VideoCustomProgressBarComponent };
