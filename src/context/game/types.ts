import { AnswerState, IAnswer, IPrize, IQuestion } from '@/types/game';

export interface IHashMapPrizes {
  [key: string]: IPrize;
}

export interface IState {
  earned: number;
  selectedAnswer: IAnswer | null;
  currentQuestion: number;
  question: IQuestion | null;
  answerState: AnswerState;
  questions: IQuestion[];
  prizes: IPrize[];
  hashMapPrizes: IHashMapPrizes;
}

export enum ActionType {
  SET_EARNED = 'SET_EARNED',
  SET_ANSWER = 'SET_ANSWER',
  SET_ANSWER_STATE = 'SET_ANSWER_STATE',
  MOVE_TO_NEXT_QUESTION = 'MOVE_TO_NEXT_QUESTION',
  RESET_GAME = 'RESET_GAME',
  SET_CONFIG = 'SET_CONFIG',
  RESTORE_GAME = 'RESTORE_GAME',
}

export type ResetGame = { type: ActionType.RESET_GAME };
type MoveToNextQuestion = { type: ActionType.MOVE_TO_NEXT_QUESTION };
type SetAnswerState = {
  type: ActionType.SET_ANSWER_STATE;
  payload: {
    state: AnswerState;
  };
};
type SetAnswer = {
  type: ActionType.SET_ANSWER;
  payload: {
    answer: IAnswer;
    state: AnswerState;
  };
};
export type SetConfig = {
  type: ActionType.SET_CONFIG;
  payload: {
    questions: IQuestion[];
    prizes: IPrize[];
  };
};
export type RestoreGame = {
  type: ActionType.RESTORE_GAME;
  payload: IState;
};

export type Action =
  | ResetGame
  | MoveToNextQuestion
  | SetAnswerState
  | SetAnswer
  | SetConfig
  | RestoreGame;
