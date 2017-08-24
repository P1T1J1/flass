import * as actions from './Actions';
import { STEP_1, NO_URL, METHOD_NOT_SELECTED, INIT } from '../Constants';

const initialState = {
  step: STEP_1,
  title: '',
  subject: '',
  textbook: '',
  description: '',
  videoURL: '',
  urlStatus: NO_URL,
  thumbURL: '',
  method: METHOD_NOT_SELECTED,
  isGoogleAuth: INIT
};

const UploadReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_STEP:
      return {
        ...state,
        step: action.step
      };
    case actions.SET_UPLOAD_METHOD:
      return {
        ...state,
        method: action.method
      };
    case actions.SET_VIDEO_INFO:
      return {
        ...state,
        title: action.title,
        subject: action.subject,
        textbook: action.textbook,
        description: action.description
      };
    case actions.SET_URL_STATUS:
      return {
        ...state,
        urlStatus: action.urlStatus
      };
    case actions.SET_VIDEO_URL:
      return {
        ...state,
        videoURL: action.videoURL
      };
    case actions.SET_THUMB_URL:
      return {
        ...state,
        thumbURL: action.thumbURL
      };
    case actions.SET_GOOGLE_AUTH_STATUS:
      return {
        ...state,
        isGoogleAuth: action.isGoogleAuth
      };
    default:
      return state;
  }
};

export default UploadReducer;
