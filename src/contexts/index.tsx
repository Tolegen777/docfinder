import React, {createContext, useContext, useReducer} from 'react';
import type {Action, Dispatch, State, StateContextProviderProps,} from './types';
import {tokenService} from "@/utils/services/tokenService";
import {cityService} from "@/utils/services/cityService";

const initialState: State = {
    query: '',
    forChild: false,
    ordering: 'rating_asc',
    authUser: tokenService.getLocalAccessToken()?.length > 0,
    cityId: cityService.getCityId() ?? ''
};

const StateContext = createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
    switch (action.type) {

        case 'SET_AUTH_STATUS': {
            return {
                ...state,
                authUser: action.payload,
            }
        }

        case 'SET_QUERY': {
            return {
                ...state,
                query: action.payload,
            };
        }

        case 'SET_FOR_CHILD': {
            return {
                ...state,
                forChild: action.payload,
            };
        }

        case 'SET_ORDERING': {
            return {
                ...state,
                ordering: action.payload,
            };
        }

        case 'SET_CITY_ID': {
            return {
                ...state,
                cityId: action.payload,
            };
        }

        default: {
            throw new Error('Unhandled action type');
        }
    }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const providerValue = { state, dispatch };

    return (
        <StateContext.Provider value={providerValue}>
            {children}
        </StateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(StateContext);

    if (context) {
        return context;
    }

    throw new Error(
        'useStateContext must be used within a StateContextProvider',
    );
};

export { StateContextProvider, useStateContext };
