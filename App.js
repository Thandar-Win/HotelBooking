import React from "react";
import MainNavigator from './src/routes/Navigators'

import rootReducer from './src/store/reducer'
import {createStore} from 'redux'
import { Provider} from "react-redux";


const Store = createStore(rootReducer)

const App = () => {
  return(
     <Provider store={Store}>
       <MainNavigator />
     </Provider>
  )
} 

export default App