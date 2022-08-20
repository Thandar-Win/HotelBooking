export const saveToReview = (review) => {
    return{
        type: 'SAVE_TO_REVIEW',
        review
    }
}

export default{
    saveToReview
}