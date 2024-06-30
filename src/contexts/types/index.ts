import type React from 'react';

export type State = {
    query: string,
    forChild: boolean,
    ordering: string
};

type SetQueryActionType = {
    type: 'SET_QUERY';
    payload: string;
};

type SetForChildActionType = {
    type: 'SET_FOR_CHILD';
    payload: boolean;
};

type SetOrderingType = {
    type: 'SET_ORDERING';
    payload: string;
};

export type Action =
    | SetQueryActionType
    | SetForChildActionType
    | SetOrderingType

export type Dispatch = (action: Action) => void;

export type StateContextProviderProps = { children: React.ReactNode };
