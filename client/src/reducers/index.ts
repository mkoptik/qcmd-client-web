import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {FormStateMap} from "redux-form/lib/reducer";


export interface RootState {
    form: FormStateMap
}

export default combineReducers<RootState>({
    form: formReducer
});
