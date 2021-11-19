import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  { adminReducer, loggedReducer } from '../reducers/adminReducer'

const configureState = () => {
    const store = createStore(combineReducers({
        admin: adminReducer,
        isLoggedIn: loggedReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureState