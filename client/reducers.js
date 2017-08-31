import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flass from './modules/Flass/reducers';
import quizReducer from './modules/Quiz/quiz';
import UploadReducer from './modules/Upload/Reducer';
import quizInsertionReducer from './modules/Upload/UploadInsertion/Quiz/QuizReducers';
import signReducer from './modules/Sign/reducers';

export default combineReducers({
  flass,
  quiz: quizReducer,
  upload: UploadReducer,
  quizInsertion: quizInsertionReducer,
  form: formReducer,
  sign: signReducer
});
