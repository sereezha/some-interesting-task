import { useContext } from 'react';
import { StorageContext } from './StorageProvider';

export const useStorageContext = () => {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useStorageContext must be used within a StorageProvider');
  }

  return context;
};
