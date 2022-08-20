const countSignReducer = (state = null,action) => {
    switch(action.type){
        case 'SET_COUNT_SCREEN' :
            return action.countSrc

        default :
            return state
    }
}

export default countSignReducer