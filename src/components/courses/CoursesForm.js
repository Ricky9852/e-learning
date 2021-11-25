import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startAddCourses } from "../../actions/adminCoursesActions";

const CoursesForm = props => {
    const { handleSubmit } = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [category, setCategory] = useState('')
    const [validity, setValidity] = useState('')
    const [level, setLevel] = useState('')
    const [author, setAuthor] = useState('')

    // const storeErrors = useSelector((state) => {
    //     return state.user.errors
    // })
    const dispatch = useDispatch()

    const errors = {}

    // const runValidations = () => {
    //     if(name.trim().length === 0){
    //         errors['name'] = 'name cannot be blank'
    //     }else if(name.length < 5){
    //         errors['name'] = 'name length should be at least 5'
    //     }
    //     if(email.trim().length === 0){
    //         errors['email'] = 'email cannot be blank'
    //     }else if(!validator.isEmail(email)){
    //         errors['email'] = 'invalid email format'
    //     }
    //     if(password.length === 0){
    //         errors['password'] = 'password cannot be blank'
    //     }else if(password.length < 6){
    //         errors['password'] = 'password length should be at least 6'
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        // runValidations()
        const redirect = () => {
            // props.history.push('/courses')
        }
        if(Object.keys(errors).length === 0){
            const formData = {
                name: name,
                description,
                duration,
                releaseDate,
                category,
                validity,
                level,
                author
            }
            handleSubmit(formData)
        }else{
            alert(`There are following errors :
            ${Boolean(errors['name']) ? errors['name'] : ''}
            ${Boolean(errors['email']) ? errors['email'] : ''}
            ${Boolean(errors['password']) ? errors['password'] : ''}`)
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'name'){
            setName(e.target.value)
        }else if(attr === 'description'){
            setDescription(e.target.value)
        }else if(attr === 'duration'){
            setDuration(e.target.value)
        }else if(attr === 'releaseDate'){
            setReleaseDate(e.target.value)
        }else if(attr === 'category'){
            setCategory(e.target.value)
        }else if(attr === 'validity'){
            setValidity(e.target.value)
        }else if(attr === 'level'){
            setLevel(e.target.value)
        }else if(attr === 'author'){
            setAuthor(e.target.value)
        }
    }

    return (
        <div style={{textAlign:'center'}}>
            <h1>Add New Course</h1>
            <form onSubmit = {handleSubmit} className = 'g-col-4'>
                <div className = 'mb-3' >
                    <input type = "text" value = {name} placeholder = 'enter course name*' name = 'name' onChange = {handleChange} /> 
                </div>

                <div className = 'mb-3' >
                    <input type value = {description} placeholder = 'enter course description*' name = 'description' onChange = {handleChange} /> 
                </div>

                <div className = 'mb-3' >
                    <input type = "number" value = {duration} name = 'duration' onChange = {handleChange} placeholder = "enter course duration(months)*"/>
                </div>

                <div className = 'mb-3' >
                    <input type = "date" value = {releaseDate} name = 'releaseDate' onChange = {handleChange} placeholder = "enter course release date"/>
                </div>

                <div className = 'mb-3' >
                    {/* <input type = "text" value = {category} placeholder = 'course category(change it to dropdown)*' name = 'category' onChange = {handleChange} /> */}
                    <select value={category} name='category' onChange={handleChange}>
                        <option value=""> select course category*</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="javascript">javascript</option>
                        <option value="reactjs">reactjs</option>
                        <option value="nodejs">nodejs</option>
                        <option value="expressjs">expressjs</option>
                        <option value="mongodb">mongodb</option>
                    </select> 
                </div>

                <div className = 'mb-3' >
                    <input type = "number" value = {validity} placeholder = 'enter course validity(years)*' name = 'validity' onChange = {handleChange} /> 
                </div>

                <div className = 'mb-3' >
                    {/* <input type = "text" value = {level} name = 'level' onChange = {handleChange} placeholder = "enter course level(change it to dropdown)*"/> */}

                    <select value={level} name='level' onChange={handleChange}>
                        <option value="">select course level*</option>
                        <option value="beginner">beginner</option>
                        <option value="intermediate">intermediate</option>
                        <option value="expert">expert</option>
                    </select>
                    
                </div>

                <div className = 'mb-3' >
                    <input type = "text" value = {author} name = 'author' onChange = {handleChange} placeholder = "enter course author*"/>
                </div>

                <input type = "submit" value = "Add" />
            </form>
        </div>
    )
}

export default CoursesForm;