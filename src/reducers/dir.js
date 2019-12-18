const SET_DIR_ISSHARE = 'lexuemao/SET_DIR_ISSHARE'

const initialState = {
    isShare: false
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState
    switch (action.type) {
    case SET_DIR_ISSHARE:
        return {
            isShare: action.isShare
        }
    default:
        return state
    }
}

const setDirIsShare = function (isShare) {
    return {
        type: SET_DIR_ISSHARE,
        isShare
    }
}

export {
    reducer as default,
    initialState as dirInitialState,
    setDirIsShare
}
