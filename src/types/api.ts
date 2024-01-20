import { IQuestion, IPrize } from './game';

export interface IApiConfigData {
  questions: IQuestion[];
  prizes: IPrize[];
}
