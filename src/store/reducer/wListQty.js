const wQtyReducer = (state = 0, action) => {
    switch (action.type) {
      case 'SET_FAV_QTY':
        return action.favQty
  
        default:
        return state
    }
  }
  
  export default wQtyReducer