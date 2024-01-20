import { extend, shuffleArray } from '@/utils/common';
import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { AnswerState, IAnswer } from '@/types/game';
import { fetchConfig } from '@/api/config';
import { StorageItems } from '@/constants/storage';
import {
  IState,
  ActionType,
  SetConfig,
  RestoreGame,
  Action,
  IHashMapPrizes,
} from './types';
import { StorageContext } from '../storage/StorageProvider';

interface IContext {
  state: IState;
  dispatch: Dispatch<Action>;
  handleResetGame: () => void;
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
  handleResetGame: () => {},
};

export const GameContext = createContext<IContext>(initialValue);

interface IGameActionCreator {
  [key: string]: (arg?: any) => Action;
}

export const GameActionCreator: IGameActionCreator = {
  setAnswerState: (state: AnswerState) => ({
    type: ActionType.SET_ANSWER_STATE,
    payload: {
      state,
    },
  }),
  setAnswer: (answer: IAnswer) => ({
    type: ActionType.SET_ANSWER,
    payload: {
      answer,
      state: AnswerState.SELECTED,
    },
  }),
  setConfig: (payload: SetConfig['payload']) => ({
    type: ActionType.SET_CONFIG,
    payload,
  }),
  moveToNextQuestion: () => ({
    type: ActionType.MOVE_TO_NEXT_QUESTION,
  }),
  resetGame: () => ({
    type: ActionType.RESET_GAME,
  }),
  restoreGame: (payload: RestoreGame['payload']) => ({
    type: ActionType.RESTORE_GAME,
    payload,
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
      const questions = shuffleArray(initialQuestions).slice(0, prizes.length);
      const question = questions[state.currentQuestion - 1];

      return extend(state, {
        prizes: reversedPrizes,
        hashMapPrizes,
        questions,
        question,
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
      const currentQuestion = state.currentQuestion + 1;
      const earned = state.hashMapPrizes[currentQuestion - 1]!.amount;
      const question = state.questions[currentQuestion - 1];

      return extend(state, {
        answerState: AnswerState.IDLE,
        currentQuestion,
        earned,
        question,
      });
    }
    case ActionType.RESET_GAME: {
      return initialState;
    }
    case ActionType.RESTORE_GAME: {
      return extend(state, {
        ...action.payload,
      });
    }
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

const GameProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storage = useContext(StorageContext);

  useEffect(() => {
    if (state.questions.length !== 0 || !storage) return;

    const handler = async () => {
      const { questions, prizes } = await fetchConfig();
      dispatch(
        GameActionCreator.setConfig({
          questions,
          prizes,
        })
      );
    };

    const storedData = storage.get<IState>(StorageItems.gameState);

    if (storedData?.questions.length) {
      dispatch(GameActionCreator.restoreGame(storedData));
    } else {
      handler();
    }
  }, [state.questions.length, storage]);

  useEffect(() => {
    if (!state.questions.length || !storage) return;
    storage.set(StorageItems.gameState, state);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentQuestion, state.questions.length, storage]);

  const handleResetGame = useCallback(() => {
    if (!storage) return;

    dispatch(GameActionCreator.resetGame());
    storage.removeItem(StorageItems.gameState);
  }, [storage]);

  const value = useMemo(
    () => ({ state, dispatch, handleResetGame }),
    [handleResetGame, state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
