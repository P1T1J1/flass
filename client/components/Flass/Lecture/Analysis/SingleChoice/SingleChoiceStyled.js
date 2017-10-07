import styled from 'styled-components';
import color from '../../../../../css/base/colors.scss';

export const SingleChoice = {
  Wrapper: styled.div`
    margin-top: 2.5625rem;
    width: 100%;
  `,
  Header: styled.div`
    margin-bottom: 1rem;
  `,
  Dot: styled.div`
    display: inline-block;
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 1.5rem;
    background-color: ${({ isCorrect }) => (isCorrect ? color['sick-green'] : '#616a6b')};
    border-radius: 50%;
    
  `,
  Title: styled.div`
    display: inline-block;
    font-size: 1.5714rem;
    font-weight: 500;
    text-align: left;
    color: ${({ isCorrect }) => (isCorrect ? color['sick-green'] : '#616a6b')};
  `,
  Body: styled.div`
    padding-left: 3rem;
  `
};
