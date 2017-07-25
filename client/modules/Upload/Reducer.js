import * as actions from './Actions';

const initialState = {
  step: 0,
  title: '',
  description: '',
  thumbURL: '',
  method: actions.URL_METHOD
};

const UploadReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_STEP:
      return {
        ...state,
        step: action.step
      };
    case actions.SET_VIDEO_DATA:
      return {
        ...state,
        title: action.title,
        description: action.description
      };
    case actions.SET_THUMB_URL:
      return {
        ...state,
        thumb: action.thumb,
        thumbURL: action.thumbURL
      };
    case actions.SET_VIDEO_URL:
      return {
        ...state,
        videoURL: action.videoURL
      };
    case actions.SET_UPLOAD_METHOD:
      return {
        ...state,
        method: action.method
      };
    default:
      return state;
  }
};

export default UploadReducer;
