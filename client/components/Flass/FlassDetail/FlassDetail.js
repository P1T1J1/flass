import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import Comment from './Comment/Comment';
import Analysis from './Analysis/Analysis';

/* 영상 컴포넌트 */
import Video from './Video/Video';


import './FlassDetail.scss';

const propTypes = {
  match: PropTypes.object,
  commentCount: PropTypes.number
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  },
  commentCount: 0
};

class FlassDetail extends Component {
  componentDidMount() {}

  handleChange = value => {
    switch(value) {
      case 'question' :

        break;
      case 'anaylsis' :

        break;
    }
  };

  render() {
    const { commentCount } = this.props;

    return (
      <div className="flass-detail">
        <div className="flass-detail-contents">
          <Subheader>영상제목</Subheader>
          <div>

            <Video
              VideoContainerClassName={ [
                'flass-detail-media',
                'flass-detail-media--larger-height'
              ] }
              VideoPlayerClassName="flass-detail-media__player"
              VideoControllerBarClassName="flass-detail-media__controller-bar"
              VideoPlayedBarClassName="played-bar--thinner"
              VideoLoadedBarClassName="loaded-bar--thinner"
              VideoQuizIndicatorClassName="quiz-indicator--thinner"
              VideoQuizIndicatorBarClassName="quiz-indicator--thinner"
              VideoPlayPauseBtnClassName="video-btn"
              VideoFullscreenBtnClassName={ ['video-btn', 'video-btn--right'] } />

            <List className="flass-detail-question-list-container">
              <Subheader>질문 리스트</Subheader>
              <Divider />
              <ListItem primaryText="Inbox" />
            </List>
          </div>
        </div>
        <div className="flass-detail-tabs">
          <Tabs
            onChange={ this.handleChange }>
            <Tab label={ `질문 ${commentCount}` } value="question">
              <Comment />
            </Tab>
            <Tab label="분석" value="anaylsis">
              <Analysis />
            </Tab>
          </Tabs>
        </div>
        paramId : {this.props.match.params.id}
      </div>
    );
  }
}

FlassDetail.propTypes = propTypes;
FlassDetail.defaultProps = defaultProps;

export default FlassDetail;
