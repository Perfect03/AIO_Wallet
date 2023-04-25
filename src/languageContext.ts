import React, { Dispatch } from 'react';

export type ContextType = {
  language: string;
  setLanguage: Dispatch<string>;
};

export const Context = React.createContext<ContextType | null>(null);
