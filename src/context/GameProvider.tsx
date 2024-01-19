import {
  AnswerState,
  IAnswer,
  IApiConfigData,
  IPrize,
  IQuestion,
} from '@/types';
import { extend, shuffleArray } from '@/utils';
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Action, ActionType } from './types';

interface IHashMapPrizes {
  [key: string]: IPrize;
}

interface IState {
  earned: number;
  selectedAnswer: IAnswer | null;
  currentQuestion: number;
  question: IQuestion | null;
  answerState: AnswerState;
  questions: IQuestion[];
  prizes: IPrize[];
  hashMapPrizes: IHashMapPrizes;
}

interface IContext {
  state: IState;
  dispatch: Dispatch<any>;
}

const initialState: IState = {
  earned: 0,
  selectedAnswer: null,
  currentQuestion: 1,
  question: null,
  answerState: AnswerState.IDLE,
  questions: [],
  prizes: [],
  hashMapPrizes: {},
};

const initialValue = {
  state: initialState,
  dispatch: () => {},
};

const GameContext = createContext<IContext>(initialValue);

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('Not in context!');
  }

  return context;
};

export const GameActionCreator = {
  setNextQuestion: (question: IQuestion) => ({
    type: ActionType.SET_NEXT_QUESTION,
    payload: { question },
  }),
  setEarned: (earned: number) => ({
    type: ActionType.SET_EARNED,
    payload: {
      earned,
    },
  }),
  setAnswer: (answer: IAnswer) => ({
    type: ActionType.SET_ANSWER,
    payload: {
      answer,
      state: AnswerState.SELECTED,
    },
  }),
  setAnswerState: (state: AnswerState) => ({
    type: ActionType.SET_ANSWER_STATE,
    payload: {
      state,
    },
  }),
  setConfig: ({
    questions,
    prizes,
  }: {
    questions: IQuestion[];
    prizes: IPrize[];
  }) => ({
    type: ActionType.SET_CONFIG,
    payload: {
      questions,
      prizes,
    },
  }),
  moveToNextQuestion: () => ({
    type: ActionType.MOVE_TO_NEXT_QUESTION,
  }),
  resetGame: () => ({
    type: ActionType.RESET_GAME,
  }),
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CONFIG: {
      const { questions: initialQuestions, prizes } = action.payload;
      const reversedPrizes = [...prizes].reverse();
      const hashMapPrizes = reversedPrizes.reduce<IHashMapPrizes>(
        (acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        },
        {}
      );
      const questions = shuffleArray(initialQuestions).slice(0, 12);

      return extend(state, {
        prizes: reversedPrizes,
        hashMapPrizes,
        questions,
      });
    }
    case ActionType.SET_EARNED: {
      return extend(state, {
        earned: action.payload.earned,
      });
    }
    case ActionType.SET_NEXT_QUESTION: {
      return extend(state, {
        question: action.payload.question,
      });
    }
    case ActionType.SET_ANSWER: {
      return extend(state, {
        selectedAnswer: action.payload.answer,
        answerState: AnswerState.SELECTED,
      });
    }
    case ActionType.SET_ANSWER_STATE: {
      return extend(state, {
        answerState: action.payload.state,
      });
    }
    case ActionType.MOVE_TO_NEXT_QUESTION: {
      return extend(state, {
        answerState: AnswerState.IDLE,
        currentQuestion: state.currentQuestion + 1,
      });
    }
    case ActionType.RESET_GAME: {
      return initialState;
    }
    default:
      return state;
  }
};

export const fetchConfig = async (): Promise<IApiConfigData> => {
  const response = await fetch('/api/config');
  const configData: IApiConfigData = await response.json();
  return configData;
};

interface Props {
  children: React.ReactNode;
}

const GameProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handler = async () => {
      const { questions, prizes } = await fetchConfig();
      // @ts-ignore
      dispatch(GameActionCreator.setConfig({ questions, prizes }));
    };
    handler();
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
