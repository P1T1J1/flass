import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

import BtnLoginWithClassting from './img/btn.login_with_classting_e_600.png';
import { CLASSTING_CLIENT_ID } from 'config/Constants';
import { callValue } from '~/util/ObjectUtil';
import { API_ROOT_FRONT } from '~/config/EnvironmentConfig';
import { LOGOUT } from '~/ducks/Sign/signs';
import CustomerService from '~/components/FlassCommon/Footer/CustomerService';
import './signIn.scss';


const {
  func, bool, shape, object, string
} = PropTypes;

const propTypes = {
  sessionValid: bool,
  prevPath: string
};

const defaultProps = {
  sessionValid: false,
  prevPath: '/'
};

const CustomerServiceView = styled(CustomerService) `
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
`;

class SignIn extends Component {
  static contextTypes = {
    router: shape({
      history: object.isRequired
    })
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { sessionValid, prevPath } = nextProps;
    if (sessionValid) {
      this.context.router.history.push(prevPath);
    }
  }

  render() {
    return (
      <div className="signInBackground">
        <div className="signInContainer">
          <img
            src={require('./img/logo.png')}
            className="flassLogo"
            alt="Flass 로고" />
          <span className="signInMessage">Better interaction, Better learning</span>
          <span className="signInMessage2">
            복잡한 절차없이 클래스팅 계정으로
            <br />
            지금 바로 시작해보세요.
          </span>
          <a
            onClick={this.onClickLoginBtn}>
            <img
              className="classtingIcon"
              width="200"
              src={BtnLoginWithClassting}
              alt="Classting 아이콘" />
          </a>
        </div>
        <CustomerServiceView />
      </div>
    );
  }

  @autobind
  onClickLoginBtn() {
    console.log(this.props.location);
    const redirectUrl = callValue(() => this.props.location.state.referrer, '/');
    window.location = `https://oauth.classting.com/v1/oauth2/authorize?client_id=${CLASSTING_CLIENT_ID}&redirect_uri=${API_ROOT_FRONT}?redirect_url=${redirectUrl}&response_type=token`;
    // https://oauth.classting.com/v1/oauth2/authorize?client_id=4cb80de500c6cec9be15d59b5617085c&redirect_uri=http://localhost:4000&response_type=token
    // this.props.goToAuthPage();
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

function mapStateToProps(state) {
  const {
    isUserSignedIn, needRedirect, sessionValid, prevPath
  } = state.sign;

  return {
    isUserSignedIn,
    needRedirect,
    sessionValid,
    prevPath
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOutFlassService: () => ({
      type: LOGOUT
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
