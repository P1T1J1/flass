import {
  METHOD_NOT_SELECTED, FILE_METHOD, URL_METHOD,
  NO_URL, FAIL_URL, SUCC_URL,
  FAIL_AUTH, SUCC_AUTH
} from '../Constants';
import Google from '../Google';

export const SET_STEP = 'SET_STEP';
export const SET_UPLOAD_METHOD = 'SET_UPLOAD_METHOD';
export const SET_VIDEO_INFO = 'SET_VIDEO_INFO';
export const SET_URL_STATUS = 'SET_URL_STATUS';
export const SET_VIDEO_URL = 'SET_VIDEO_URL';
export const SET_THUMB_URL = 'SET_THUMB_URL';
export const SET_GOOGLE_AUTH_STATUS = 'SET_GOOGLE_AUTH_STATUS';

export const setStep = step => ({
  type: SET_STEP,
  step
});

export const setVideoInfo = videoInfo => ({
  type: SET_VIDEO_INFO,
  title: videoInfo.title,
  subject: videoInfo.subject,
  textbook: videoInfo.textbook,
  description: videoInfo.description
});

const setUploadMethod = method => ({
  type: SET_UPLOAD_METHOD,
  method
});

// handles upload method change and takes care of google api set up for accordingly
export const handleSetUploadMethod = method => (dispatch => {
  switch(method) {
    case FILE_METHOD:
      dispatch(initYoutubeUpload());
      break;
    case URL_METHOD:
      Google.initYoutubeThumbnail();
      break;
    default:
      break;
  }
  dispatch(setUploadMethod(method));
});

// checks URL status and retrieves thumbnail url from youtube
export const handleURLCheck = videoURL => (dispatch => {
  let youtubeVideoId = videoURL;
  if (videoURL.length != 11) {
    youtubeVideoId = parseYoutubeVideoId(videoURL);
  }
  let urlStatus = FAIL_URL;
  let thumbURL = '';
  Google.getYoutubeThumbnail(youtubeVideoId)
  .then(({ result }) => {
    if (result.pageInfo.totalResults == 1) {
      urlStatus = SUCC_URL;

      const thumbnails = result.items[0].snippet.thumbnails;
      const thumb = thumbnails.maxres || thumbnails.standard || thumbnails.high
                    || thumbnails.medium || thumbnails.default;
      thumbURL = thumb.url;
      dispatch(setVideoURL(videoURL));
      dispatch(setThumbURL(thumbURL));
    }
    dispatch(setURLStatus(urlStatus));
  });
});

const parseYoutubeVideoId = videoURL => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = videoURL.match(regExp);
  return (match && match[2].length == 11) ? match[2] : '';
};

const setVideoURL = videoURL => ({
  type: SET_VIDEO_URL,
  videoURL
});

const setThumbURL = thumbURL => ({
  type: SET_THUMB_URL,
  thumbURL
});

const setURLStatus = urlStatus => ({
  type: SET_URL_STATUS,
  urlStatus
});

export const resetVideo = () => (dispatch => {
  dispatch(setURLStatus(NO_URL));
  dispatch(setVideoURL(''));
  dispatch(setThumbURL(''));
  dispatch(setUploadMethod(METHOD_NOT_SELECTED));
});

const setGoogleAuthStatus = isGoogleAuth => ({
  type: SET_GOOGLE_AUTH_STATUS,
  isGoogleAuth
});

export const initYoutubeUpload = () => (dispatch => {
  Google.initYoutubeUpload(isGoogleAuth => {
    dispatch(setGoogleAuthStatus(isGoogleAuth ? SUCC_AUTH : FAIL_AUTH));
  });
});

export const goToGoogleAuthPage = () => (() => {
  Google.authorize();
});

export const uploadYoutubeVideo = file => (dispatch => {
  Google.uploadVideo(file, thumbURL => {
    console.log('FINISHED UPLOADING');
  });
});
