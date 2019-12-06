import { combineReducers } from 'redux'
import fileReducer, {fileInitialState} from './file'

const initialState = {
    file: fileInitialState
}

const reducers = combineReducers({
    file: fileReducer
})

export {
    reducers as default,
    initialState
}

