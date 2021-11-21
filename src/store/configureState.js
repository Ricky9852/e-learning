import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  { adminReducer, loggedReducer } from '../reducers/adminReducer'
import { adminStudentReducer } from '../reducers/adminStudentsReducer'
import { studentReducer } from '../reducers/studentReducer'

const configureState = () => {
    const store = createStore(combineReducers({
        admin: adminReducer,
        isLoggedIn: loggedReducer,
        students: adminStudentReducer,
        student: studentReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureState