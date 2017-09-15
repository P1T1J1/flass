import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import styled from 'styled-components';
import color from '../common/colors.scss';
import Badge from './Badge/BadgeContainer';

import {
  LogoutIcon
} from './icons';

const { func, shape, number, string } = PropTypes;

const FlassUserAppBarView = styled.div`
  overflow: auto;
  vertical-align: center;
`;

const UserName = styled.span`
  font-family: NotoSansCJKkr;
  letter-spacing: 0.3571rem;
  font-size: 1.38rem;;
  font-weight: 500;
  color: #5F7477;
  color: ${color['slate-grey-two']};
`;

const LogoutBtn = styled.span`
  position: relative;
  width: 1.19rem;
  height: 1.19rem;
  margin-left: 1.2rem;
`;

const LogoutBtnIcon = styled.img`
  width: 1.19rem;
  height: 1.19rem;
  cursor: pointer;
`;

const Divider = styled.span`
  width: 1px;
  border-left: solid 0.1428rem #afbfc1;
  margin: 0 2rem;
`;

const propTypes = {
  user: shape({
    id: number.isRequired,
    userName: string.isRequired,
    email: string.isRequired,
  }).isRequired,
  onClickLogoutBtn: func.isRequired
};

const defaultProps = {};

class UserAppBar extends Component {
  componentDidMount() {}

  render() {
    const { user } = this.props;

    return (
      <FlassUserAppBarView>
        <UserName>{user.userName}</UserName>
        <LogoutBtn>
          <LogoutBtnIcon
            src={ LogoutIcon }
            alt="logout button"
            onClick={ this.onClickLogoutBtn } />
        </LogoutBtn>
      </FlassUserAppBarView>
    );
  }

  @autobind
  onClickLogoutBtn() {
    this.props.onClickLogoutBtn();
  }
}

UserAppBar.propTypes = propTypes;
UserAppBar.defaultProps = defaultProps;

export default UserAppBar;
