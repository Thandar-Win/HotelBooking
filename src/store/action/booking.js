export const saveToBooking = (userList) => {
    return{
        type : 'SAVE_TO_BOOKING',
        userList
    }
}

export default {
    saveToBooking
}