import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import * as fromClient from './client/client.reducer';
import * as fromSteps from './steps/steps.reducer';
import * as fromComments from './comments/comments.reducer';
import { GlobalActionTypes, Reset, SetRootState } from './global.actions';

export interface GlobalState {
    client: fromClient.ClientStateInterface;
    steps: fromSteps.StepsState;
    comments: fromComments.CommentsState;
}

export const reducers: ActionReducerMap<GlobalState> = {
    client: fromClient.reducer,
    steps: fromSteps.reducer,
    comments: fromComments.reducer,
};

export function stateSetter(reducer: ActionReducer<GlobalState>): ActionReducer<GlobalState> {
    return (state: GlobalState, action: SetRootState) => {
        if (action.type === GlobalActionTypes.SET_ROOT_STATE) {
            return action.payload;
        }

        return reducer(state, action);
    };
}

export function stateReset(reducer: ActionReducer<GlobalState>): ActionReducer<GlobalState> {
    return (state: GlobalState, action: Reset) => {
        if (action.type === GlobalActionTypes.RESET_STATE) {
            state = undefined;
        }

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<GlobalState>[] = !environment.production
    ? [stateSetter, storeFreeze, stateReset]
    : [stateReset];
