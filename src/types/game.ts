export interface IPrize {
  id: number;
  amount: number;
}

export interface IQuestion {
  id: number;
  text: string;
  answers: IAnswer[];
}

export interface IAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export enum AnswerState {
  IDLE = 'idle',
  SELECTED = 'selected',
  CORRECT = 'correct',
  WRONG = 'wrong',
}
