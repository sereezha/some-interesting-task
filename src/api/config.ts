import { ApiRoute } from '@/constants/api-routes';
import { IApiConfigData } from '@/types/api';
import makeRequest from './makeRequest';

export const fetchConfig = async (): Promise<IApiConfigData> => {
  const response = await makeRequest(ApiRoute.config);
  const configData: IApiConfigData = await response.json();
  return configData;
};
