import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import screenfull from 'screenfull';

import {
  VideoPlayerComponent,
  VideoButtonComponent,
  VideoVolumeBarComponent,
  VideoCustomProgressBarComponent,
  VideoControllerWrapperComponent,
  VideoModalComponent
} from '../../../Video';

import {
  convertPercentageToSecs,
  convertSecsToPercentage
} from '../../../Video/VideoUtils';

// 팝업 테스트를 위한 더미 action
import * as actions from '../../../../modules/Quiz/quiz';

import PlayBtnIcon from '../../../../../public/play_arrow_24dp_1x.png';
import PauseBtnIcon from '../../../../../public/pause_24dp_1x.png';
import VolumeOnBtnIcon from '../../../../../public/volume_up_24dp_1x.png';
import VolumeOffBtnIcon from '../../../../../public/volume_off_24dp_1x.png';
import FullscreenBtnIcon from '../../../../../public/web_asset_24dp_1x.png';

const { string, oneOfType, arrayOf, func, number } = PropTypes;

const propTypes = {
  VideoContainerClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayerClassName: oneOfType([string, arrayOf(string)]),
  VideoProgressBarClassName: oneOfType([string, arrayOf(string)]),
  VideoControllerBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayPauseBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoFullscreenBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoModalClassName: oneOfType([string, arrayOf(string)]),
  VideoModalQuestionClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBarClassName: oneOfType([string, arrayOf(string)]),

  // 팝업 테스트를 위한 더미 action
  loadQuizs: func.isRequired,
  quizTimeArrayForPopupTest: arrayOf(number)
};

const defaultProps = {
  VideoContainerClassName: '',
  VideoPlayerClassName: '',
  VideoProgressBarClassName: '',
  VideoControllerBarClassName: '',
  VideoPlayedBarClassName: '',
  VideoLoadedBarClassName: '',
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',
  VideoPlayPauseBtnClassName: '',
  VideoFullscreenBtnClassName: '',
  VideoModalClassName: '',
  VideoModalQuestionClassName: '',
  VideoVolumeBtnClassName: '',
  VideoVolumeBarClassName: '',

  // 팝업 테스트를 위한 더미 array
  quizTimeArrayForPopupTest: []
};

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.youtube.com/watch?v=PTkKJI27NlE',
      playing: true,
      volume: 0.8,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      isMute: false,
      volumeBeforeMute: 0,
      isQuizSecs: false
    };
  }

  componentWillMount() {
    this.props.loadQuizs();
  }

  render() {
    const {
      url,
      playing,
      volume,
      isMute,
      played,
      loaded,
      duration,
      playbackRate,
      youtubeConfig,
      isQuizSecs
    } = this.state;
    const {
      VideoContainerClassName,
      VideoPlayerClassName,
      VideoProgressBarClassName,
      VideoControllerBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,
      VideoPlayPauseBtnClassName,
      VideoFullscreenBtnClassName,
      VideoModalClassName,
      VideoModalQuestionClassName,
      VideoVolumeBtnClassName,
      VideoVolumeBarClassName,

      // 팝업 테스트를 위한 더미 array
      quizTimeArrayForPopupTest
    } = this.props;

    return (
      <div className={ classNames(VideoContainerClassName) }>
        <VideoPlayerComponent
          VideoPlayerClassName={ VideoPlayerClassName }
          url={ url }
          playing={ playing }
          volume={ volume }
          played={ played }
          loaded={ loaded }
          duration={ duration }
          playbackRate={ playbackRate }
          youtubeConfig={ youtubeConfig }
          onProgress={ this.onProgress }
          onDuration={ this.onDuration }
          setPlayer={ this.setPlayer } />

        {
          isQuizSecs ?
            <VideoModalComponent
              VideoModalClassName={ VideoModalClassName }
              VideoModalQuestionClassName={ VideoModalQuestionClassName }
              onQuestionSolved={ this.onQuestionSolved } /> :
            null
        }

        <div className={ VideoControllerBarClassName }>
          <VideoCustomProgressBarComponent
            VideoProgressBarClassName={ VideoProgressBarClassName }
            VideoPlayedBarClassName={ VideoPlayedBarClassName }
            VideoLoadedBarClassName={ VideoLoadedBarClassName }
            VideoQuizIndicatorClassName={ VideoQuizIndicatorClassName }
            VideoQuizIndicatorBarClassName={ VideoQuizIndicatorBarClassName }

            duration={ duration }
            playedPercentage={ played }
            loadedPercentage={ loaded }
            onCustomSeekBarMouseDown={ this.onCustomSeekBarMouseDown }
            onCustomSeekBarChange={ this.onCustomSeekBarChange }
            onCustomSeekBarMouseUp={ this.onCustomSeekBarMouseUp }
            onCustomSeekBarClick={ this.onCustomSeekBarClick }
            onArrowKeyPressed={ this.onArrowKeyPressed }

            quizTimeArray={ quizTimeArrayForPopupTest }
            canChangeIsQuizSecs={ this.canChangeIsQuizSecs }
            isQuizSecs={ isQuizSecs } />

          <VideoControllerWrapperComponent>
            <VideoButtonComponent
              buttonClass={ VideoPlayPauseBtnClassName }
              srcSet={ PlayBtnIcon }
              onButtonClick={ this.onClickPlayPause } />
            <VideoButtonComponent
              buttonClass={ VideoVolumeBtnClassName }
              srcSet={ !isMute ? VolumeOnBtnIcon : VolumeOffBtnIcon }
              onButtonClick={ this.onClickVolumeBtn } />

            <VideoVolumeBarComponent
              onVolumeBarChange={ this.setVolume }
              barClass={ VideoVolumeBarClassName }
              volume={ volume } />

            <VideoButtonComponent
              buttonClass={ VideoFullscreenBtnClassName }
              srcSet={ FullscreenBtnIcon }
              onButtonClick={ this.onClickFullscreen } />
          </VideoControllerWrapperComponent>
        </div>
      </div>
    );
  }

  @autobind
  setPlayer(player) {
    this.player = player;
  }

  @autobind
  onDuration(duration) {
    this.setState({ duration });
  }

  @autobind
  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  @autobind
  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) });
  }

  @autobind
  onClickVolumeBtn() {
    if (this.state.isMute) {
      this.setState({ isMute: false, volume: this.state.volumeBeforeMute });
    } else {
      const volumeBeforeMute = this.state.volume;
      this.setState({ isMute: true, volumeBeforeMute, volume: 0 });
    }
  }

  @autobind
  onCustomSeekBarMouseDown() {
    this.setState({ seeking: true });
  }

  @autobind
  onCustomSeekBarChange(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ played: changedPlayedPercentage });
  }

  @autobind
  onCustomSeekBarMouseUp(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ seeking: false });
    this.player.seekTo(changedPlayedPercentage);
  }

  @autobind
  onCustomSeekBarClick(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ played: changedPlayedPercentage });
    this.player.seekTo(changedPlayedPercentage);
  }

  @autobind
  onArrowKeyPressed(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ played: changedPlayedPercentage });
    this.player.seekTo(changedPlayedPercentage);
  }

  @autobind
  onClickPlayPause() {
    this.setState({ playing: !this.state.playing });
  }

  @autobind
  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player));
  }

  @autobind
  canChangeIsQuizSecs(playedSecs) {
    const { quizTimeArrayForPopupTest } = this.props;

    if (this.isEqlQuizSecsWithPlayedSecs(playedSecs, quizTimeArrayForPopupTest)) {
      this.setState({ isQuizSecs: true, playing: false });
    }
  }

  isEqlQuizSecsWithPlayedSecs(playedSecs, quizSecsArray) {
    return quizSecsArray.indexOf(playedSecs) !== -1;
  }

  @autobind
  onQuestionSolved() {
    const { played, duration } = this.state;
    const solvedSecs = convertPercentageToSecs(played, duration);
    const secsAddOneFromSolvedSecs = solvedSecs + 1;
    const changedPlayedPercentage = convertSecsToPercentage(secsAddOneFromSolvedSecs, duration);
    this.setState({ isQuizSecs: false, playing: true, played: changedPlayedPercentage });
    this.player.seekTo(changedPlayedPercentage);
  }

}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { quiz: { quizTimeArrayForPopupTest } } = state;
  return { quizTimeArrayForPopupTest };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
