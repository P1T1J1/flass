import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid as GridView, Row } from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../common/colors.scss';
import GridItem from './GridItem';
import Header from '../Header';
import './Grid.scss';
import '../../../css/base/_row.scss';

const propTypes = {
  user: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  fetchRequestMyChannelItems: PropTypes.func.isRequired
};

const defaultProps = {
};

const NUM_OF_ITEMS_PER_COLS = 4;

class Grid extends Component {
  componentDidMount() {
    const { user } = this.props;

    if (user.id !== -1) {
      this.props.fetchRequestMyChannelItems();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps::Grid');
    const { user } = this.props;
    const nextUser = nextProps.user;
    if (user.id !== nextUser.id) {
      this.props.fetchRequestMyChannelItems();
    }
  }

  render() {
    const { items } = this.props;
    const renderAllItems = this.renderRowsAndCols(items);
    return (
      <div>
        <Header title="Home Channel" />
        <GridView>
          {renderAllItems}
        </GridView>
      </div>
    );
  }

  renderRowsAndCols(items) {
    let chunkIndex = 0;
    return _.chunk(items, NUM_OF_ITEMS_PER_COLS).map(splitItems => {
      chunkIndex += 1;
      return (
        <Row key={ `row${chunkIndex}` } bsClass="Row">
          {this.renderChildren(splitItems)}
        </Row>
      );
    });
  }
  renderChildren(items) {
    const { user } = this.props;
    return items.map(item => (
      <div key={ item.id } className="Col__grid">
        <GridItem { ...item } userName={ user.userName } />
      </div>
    ));
  }
}

Grid.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
