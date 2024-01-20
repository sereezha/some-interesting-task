import { StorageType } from '@/types/storage';
import Storage from '@/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type IContext = Storage | null;

export const StorageContext = createContext<IContext>(null);

export const useStorageContext = () => {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useStorageContext must be used within a StorageProvider');
  }

  return context;
};

interface Props {
  children: React.ReactNode;
  storageType?: StorageType;
}

export const StorageProvider: React.FC<Props> = ({
  children,
  storageType = StorageType.SESSION,
}) => {
  const [storage, setStorage] = useState<Storage | null>(null);

  useEffect(() => {
    const Storages = {
      [StorageType.SESSION]: sessionStorage,
      [StorageType.LOCAL]: localStorage,
    };

    setStorage(new Storage(Storages[storageType]));
  }, [storageType]);

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};
