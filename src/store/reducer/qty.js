const QtyReducer = (state = 0, action) => {
    switch (action.type) {
      case 'SET_TOTAL_QTY':
        return action.totQty
  
        default:
        return state
    }
  }
  
  export default QtyReducer