const favourListReducer = (state = null,action) => {
    switch(action.type){
        case  'SAVE_TO_FAVOUR' :
            return action.hotelLists

        default : 
            return state
    }
}
export default favourListReducer