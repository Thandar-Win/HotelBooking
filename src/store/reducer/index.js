import WishList from './wishlist'
import UserList from './booking'
import Qty from './qty'
import WListQty from './wListQty'
import Review from './review'
import UserName from './username'
import UserEmail from './useremail'
import SignCount from './signcount'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    WishList,
    UserList,
    Qty,
    WListQty,
    Review,
    UserName,
    UserEmail,
    SignCount
})

export default rootReducer