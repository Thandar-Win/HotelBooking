const bookingListReducer = (state = null, action) => {
    switch(action.type) {
        case 'SAVE_TO_BOOKING' : 
            return action.userList

        default : 
            return state
    }
}

export default bookingListReducer