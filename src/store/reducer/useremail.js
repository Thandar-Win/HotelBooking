const userEmailReducer = (state = null ,action) => {
    switch(action.type){
        case 'USER_EMAIL' : 
            return action.useremail

        default : 
            return state
    }
}

export default userEmailReducer