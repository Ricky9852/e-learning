import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { adminCoursesReducer } from '../reducers/adminCoursesReducer'
import { adminLecturesReducer } from '../reducers/adminLecturesReducer'
import  { adminReducer, loggedReducer } from '../reducers/adminReducer'
import { adminStudentReducer } from '../reducers/adminStudentsReducer'
import { studentCoursesReducer } from '../reducers/studentCoursesReducer'
import { studentLecturesReducer } from '../reducers/studentLecturesReducer'
import { studentLoggedReducer, studentReducer } from '../reducers/studentReducer'

const configureState = () => {
    const store = createStore(combineReducers({
        admin: adminReducer,
        isLoggedIn: loggedReducer,
        students: adminStudentReducer,
        student: studentReducer,
        studentIsLoggedIn: studentLoggedReducer,
        adminCourses: adminCoursesReducer,
        studentCourses: studentCoursesReducer,
        adminLectures: adminLecturesReducer,
        studentLectures: studentLecturesReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureState