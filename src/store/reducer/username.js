const userNameReducer = (state = null,action) => {
    switch(action.type) {
        case 'USER_NAME' : 
            return action.username

        default : 
            return state
    }
}

export default userNameReducer