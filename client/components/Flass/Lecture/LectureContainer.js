import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lecture from './Lecture';
import {
  FETCH_LECTURE,
  unmountLecture
} from '../../../modules/Flass/Lecture/actions';
import { REQUEST_ON_ENDED } from '../../../modules/Flass/Lecture/Video/actions';
import withLoading from './withLoading';

function mapStateToProps(state) {
  const { lecture: { id }, isFetched } = state.flass.lecture.lecture;

  return {
    ...state.flass.lecture,
    ...state.flass.video,
    lectureIdFromReducer: id,
    isFetched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequestLectureAll: lectureId => ({
      type: FETCH_LECTURE,
      lectureId
    }),
    saveQuestionsStateOnEnded: (solvedQuestionsState, userId, isForExternal) => ({
      type: REQUEST_ON_ENDED,
      solvedQuestionsState,
      userId,
      isForExternal
    }),
    unmountLecture
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading()(Lecture));
