import { StorageType } from '@/types/storage';
import Storage from '@/utils/storage';
import React, { createContext, useEffect, useState } from 'react';

type IContext = Storage | null;

export const StorageContext = createContext<IContext>(null);

interface Props {
  children: React.ReactNode;
  storageType?: StorageType;
}

const StorageProvider: React.FC<Props> = ({
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

export default StorageProvider;
