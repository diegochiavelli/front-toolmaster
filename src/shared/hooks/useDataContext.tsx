import { createContext, useContext, useState } from 'react';

import { CollaboratorType } from '../../modules/collaborator/types/CollaboratorType';

interface DataContext {
  collaborators?: CollaboratorType[];
}

interface DataContextProps {
  data: DataContext;
  setData: (data: DataContext) => void;
}

const DataContext = createContext({} as DataContextProps);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataContext>({});

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const { data, setData } = useContext(DataContext);

  const setCollaborators = (collaborators: CollaboratorType[]) => {
    setData({
      ...data,
      collaborators,
    });
  };

  return {
    collaborators: data?.collaborators || [],
    setCollaborators,
  };
};
