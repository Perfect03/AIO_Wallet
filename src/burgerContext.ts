import React from 'react';

export type ContextType = {
  status: boolean;
};

export const Context = React.createContext<ContextType | null>(null);
