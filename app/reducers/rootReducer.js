import { combineReducers } from 'redux'

import leadReducer from './leadReducer'
import loginReducer from './loginReducer'
import colorReducer from './colorReducer'
import contractReducer from './contractReducer'
import ingredientReducer from './ingredientReducer'
import patternReducer from './patternReducer'
import systemReducer from './systemReducer'
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
    leadReducer,
    loginReducer,
    colorReducer,
    contractReducer,
    ingredientReducer,
    patternReducer,
    systemReducer,
    projectReducer
})
 
export default rootReducer;
