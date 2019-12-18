import { combineReducers } from 'redux'
import dirReducer, {dirInitialState} from './dir'
import fileReducer, {fileInitialState} from './file'

const initialState = {
    dir: dirInitialState,
    file: fileInitialState
}

const reducers = combineReducers({
    dir: dirReducer,
    file: fileReducer
})

export {
    reducers as default,
    initialState
}

