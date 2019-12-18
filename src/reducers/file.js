const SET_CURRENT_DIR = 'lexuemao/SET_CURRENT_DIR'
const SET_CURRENT_FILE = 'lexuemao/SET_CURRENT_FILE'

const initialState = {
    dir_id: 0,
    file_id: 0
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState
    switch (action.type) {
    case SET_CURRENT_DIR:
        return {
            dir_id: action.dir_id
        }
    case SET_CURRENT_FILE:
        return {
            file_id: action.file_id
        }
    default:
        return state
    }
}

const setCurrentDir = function (dir_id) {
    return {
        type: SET_CURRENT_DIR,
        dir_id
    }
}

const setCurrentFile = function (file_id) {
    return {
        type: SET_CURRENT_FILE,
        file_id
    }
}

export {
    reducer as default,
    initialState as fileInitialState,
    setCurrentDir,
    setCurrentFile
}
