import { IAnswer, IPrize, IQuestion } from '@/types';

export enum ActionType {
  SET_EARNED = 'SET_EARNED',
  SET_NEXT_QUESTION = 'SET_NEXT_QUESTION',
  SET_ANSWER = 'SET_ANSWER',
  SET_ANSWER_STATE = 'SET_ANSWER_STATE',
  MOVE_TO_NEXT_QUESTION = 'MOVE_TO_NEXT_QUESTION',
  RESET_GAME = 'RESET_GAME',
  SET_CONFIG = 'SET_CONFIG',
}

type ResetGame = { type: ActionType.RESET_GAME };
type MoveToNextQuestion = { type: ActionType.MOVE_TO_NEXT_QUESTION };
type SetAnswerState = {
  type: ActionType.SET_ANSWER_STATE;
  payload: {
    state: any;
  };
};
type SetAnswer = {
  type: ActionType.SET_ANSWER;
  payload: {
    answer: IAnswer;
    state: any;
  };
};
type SetNextQuestion = {
  type: ActionType.SET_NEXT_QUESTION;
  payload: { question: IQuestion };
};
type SetEarned = {
  type: ActionType.SET_EARNED;
  payload: {
    earned: number;
  };
};
type SetConfig = {
  type: ActionType.SET_CONFIG;
  payload: {
    questions: IQuestion[];
    prizes: IPrize[];
  };
};

export type Action =
  | ResetGame
  | MoveToNextQuestion
  | SetAnswerState
  | SetAnswer
  | SetNextQuestion
  | SetEarned
  | SetConfig;
