const reviewReducer = (state = null, action) => {
    switch(action.type){
        case "SAVE_TO_REVIEW" : 
            return action.review

        default : 
            return state
    }
}

export default reviewReducer