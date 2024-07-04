import type React from 'react';

export type State = {
    query: string,
    forChild: boolean,
    ordering: string,
    authUser: boolean,
    cityId: string
};

type AuthUserActionType = {
    type: 'SET_AUTH_STATUS'
    payload: boolean
}

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

type SetCityIdActionType = {
    type: 'SET_CITY_ID';
    payload: string;
};

export type Action =
    | SetQueryActionType
    | SetForChildActionType
    | SetOrderingType
    | AuthUserActionType
    | SetCityIdActionType

export type Dispatch = (action: Action) => void;

export type StateContextProviderProps = { children: React.ReactNode };
