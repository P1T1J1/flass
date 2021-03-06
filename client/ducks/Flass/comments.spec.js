import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import {
  call,
  fork,
  take,
  select,
  put,
  cancel,
  takeLatest
} from 'redux-saga/effects';
import agent from '../agent';
import {
  ADD_COMMENT_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_READY_COMMENT,
  addComment,
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_SUCCESS, FETCH_READY_COMMENT,
  fetchComment
} from './comments';

describe('CommentSagas ', () => {
  it('댓글 요청하기 by 강의 ID', () => {
    const param = { lectureId: 1 };
    const gen = fetchComment(param);
    const response = {
      comments: [],
      commentchild: []
    };
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_READY_COMMENT }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.byLectureId, param.lectureId));
    expect(gen.next(response).value).to.deep.equal(put({
      type: FETCH_COMMENT_SUCCESS,
      comments: [],
      commentchild: []
    }));
    expect(gen.next().done).to.equal(true);
  });

  it('댓글 요청 실패', () => {
    const param = { lectureId: 1 };
    const gen = fetchComment(param);
    const response = {
      comments: [],
      commentchild: []
    };
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_READY_COMMENT }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.byLectureId, param.lectureId));
    expect(gen.throw({ message: 'hello' }).value).to.deep.equal(put({
      type: FETCH_COMMENT_ERROR,
      message: 'hello'
    }));
    expect(gen.next().done).to.equal(true);
  });

  it('댓글 추가하기 - 성공', () => {
    const param = {
      tempId: Date.now().toString(),
      commentId: 0,
      lectureId: 1,
      userId: 1,
      userName: 'b',
      content: 'b'
    };
    const gen = addComment(param);

    expect(gen.next().value).to.deep.equal(put({
      type: ADD_READY_COMMENT,
      parentId: param.commentId,
      comment: {
        id: param.tempId,
        lectureId: param.lectureId,
        userId: param.userId,
        userName: param.userName,
        content: param.content
      }
    }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.postComment, param.lectureId, param.content));
    expect(gen.next({ id: 2 }).value).to.deep.equal(put({
      type: ADD_COMMENT_SUCCESS,
      parentId: param.commentId,
      id: param.tempId,
      newId: 2
    }));
    expect(gen.next().done).to.equal(true);
  });

  it('대댓글 추가하기 - 성공', () => {
    const param = {
      tempId: Date.now().toString(),
      commentId: 1,
      lectureId: 1,
      userId: 1,
      userName: 'b',
      content: 'b'
    };
    const gen = addComment(param);

    expect(gen.next().value).to.deep.equal(put({
      type: ADD_READY_COMMENT,
      parentId: param.commentId,
      comment: {
        id: param.tempId,
        lectureId: param.lectureId,
        userId: param.userId,
        userName: param.userName,
        content: param.content
      }
    }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.postReplyComment, param.lectureId, param.content));
    expect(gen.next({ id: 2 }).value).to.deep.equal(put({
      type: ADD_COMMENT_SUCCESS,
      parentId: param.commentId,
      id: param.tempId,
      newId: 2
    }));
    expect(gen.next().done).to.equal(true);
  });

  it('댓글 추가하기 - 실패', () => {
    const param = {
      tempId: Date.now().toString(),
      commentId: 1,
      lectureId: 1,
      userId: 1,
      userName: 'b',
      content: 'b'
    };
    const gen = addComment(param);

    expect(gen.next().value).to.deep.equal(put({
      type: ADD_READY_COMMENT,
      parentId: param.commentId,
      comment: {
        id: param.tempId,
        lectureId: param.lectureId,
        userId: param.userId,
        userName: param.userName,
        content: param.content
      }
    }));
    expect(gen.next().value).to.deep.equal(call(agent.Comment.postReplyComment, param.lectureId, param.content));
    expect(gen.throw({ message: 'hello' }).value).to.deep.equal(put({
      type: ADD_COMMENT_ERROR,
      message: 'hello',
      id: param.tempId
    }));
    expect(gen.next().done).to.equal(true);
  });
});
