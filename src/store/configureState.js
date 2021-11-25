import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { adminCoursesReducer } from '../reducers/adminCoursesReducers'
import  { adminReducer, loggedReducer } from '../reducers/adminReducer'
import { adminStudentReducer } from '../reducers/adminStudentsReducer'
import { studentLoggedReducer, studentReducer } from '../reducers/studentReducer'

const configureState = () => {
    const store = createStore(combineReducers({
        admin: adminReducer,
        isLoggedIn: loggedReducer,
        students: adminStudentReducer,
        student: studentReducer,
        studentIsLoggedIn: studentLoggedReducer,
        adminCourses: adminCoursesReducer,
    }), applyMiddleware(thunk))
    return store
}

export default configureState