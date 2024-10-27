import type React from 'react';

export type State = {
    query: string,
    authUser: boolean,
    cityId: string,
    clinicQuery: string
};

type AuthUserActionType = {
    type: 'SET_AUTH_STATUS'
    payload: boolean
}

type SetQueryActionType = {
    type: 'SET_QUERY';
    payload: string;
};

type SetClinicQueryActionType = {
    type: 'SET_CLINIC_QUERY';
    payload: string;
};

type SetCityIdActionType = {
    type: 'SET_CITY_ID';
    payload: string;
};

export type Action =
    | SetQueryActionType
    | AuthUserActionType
    | SetCityIdActionType
    | SetClinicQueryActionType

export type Dispatch = (action: Action) => void;

export type StateContextProviderProps = { children: React.ReactNode };
