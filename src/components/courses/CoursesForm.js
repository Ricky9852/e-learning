import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startAddCourses, startCoursesSetErrors } from "../../actions/adminCoursesAction";

const CoursesForm = props => {
    const { handleSubmit,id: _id, name: cName, description: cDescription, duration: cDuration, releaseDate: cReleaseDate, category: cCategory, validity: cValidity, level: cLevel, author: cAuthor, isDelete: cIsDelete} = props
    const [name, setName] = useState( cName ? cName : '' )
    const [description, setDescription] = useState( cDescription ? cDescription : '' )
    const [duration, setDuration] = useState( cDuration ? cDuration : '' )
    const [releaseDate, setReleaseDate] = useState( '' )
    const [category, setCategory] = useState( cCategory ? cCategory : '' )
    const [validity, setValidity] = useState( cValidity ? cValidity : '' )
    const [level, setLevel] = useState( cLevel ? cLevel : '' )
    const [author, setAuthor] = useState( cAuthor ? cAuthor : '' )
    const [isDelete,setIsDelete] = useState( cIsDelete ? cIsDelete : false )
    console.log("id",_id)

    const coursesErrors = useSelector((state) => {
        return state.adminCourses.errors
    })
    const dispatch = useDispatch()

    const errors = {}

    const runValidations = () => {
        if(name.trim().length === 0){
            errors['name'] = 'course name cannot be blank'
        }
        if(description.length === 0){
            errors['description'] = 'course description cannot be blank'
        }
        if(duration.length === 0){
            errors['duration'] = 'course duration cannot be blank'
        }
        if(category.length === 0){
            errors['category'] = 'course category cannot be blank'
        }
        if(validity.length === 0){
            errors['validity'] = 'course validity cannot be blank'
        }
        if(level.length === 0){
            errors['level'] = 'course level cannot be blank'
        }
        if(author.length === 0){
            errors['author'] = 'course author cannot be blank'
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        runValidations()
        // const redirect = () => {
        //     props.history.push('/courses')
        // }
        if(Object.keys(errors).length === 0){
            dispatch(startCoursesSetErrors({}))
            const formData = {
                _id,
                isDelete,
                name,
                description,
                duration,
                releaseDate,
                category,
                validity,
                level,
                author
            }
            // console.log('form data in course',formData)
            handleSubmit(formData, _id)
        }else{
            dispatch(startCoursesSetErrors(errors))
            // alert(`There are following errors :
            // ${Boolean(errors['name']) ? errors['name'] : ''}
            // ${Boolean(errors['email']) ? errors['email'] : ''}
            // ${Boolean(errors['password']) ? errors['password'] : ''}`)
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
        }else if(attr === 'isDelete'){
            setIsDelete(e.target.value)
        }
    }

    return (
        <div style={{textAlign:'center'}}>
            <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                <div className="card-body" >
                    <form className = 'g-col-4'>
                    <div className = 'mb-3' >
                        <input type = "text" value = {name} placeholder = 'enter course name*' name = 'name' onChange = {handleChange} /> <br/>
                        { coursesErrors.name && <span style={{color:'red'}}>{coursesErrors.name}</span> }
                    </div>

                    <div className = 'mb-3' >
                        <input type="text" value = {description} placeholder = 'enter course description*' name = 'description' onChange = {handleChange} /> <br/>
                        { coursesErrors.description && <span style={{color:'red'}}>{coursesErrors.description}</span> }
                    </div>

                    <div className = 'mb-3' >
                        <input type = "number" value = {duration} name = 'duration' onChange = {handleChange} placeholder = "enter course duration(months)*"/><br/>
                        { coursesErrors.duration && <span style={{color:'red'}}>{coursesErrors.duration}</span> }
                    </div>

                    <div className = 'mb-3' >
                        <label>Release Date :</label>
                        <input type = "date" value = {releaseDate} name = 'releaseDate' onChange = {handleChange} placeholder = "enter course release date"/>
                    </div>
                    
                    <div className = 'mb-3' >
                        <label>Deletable : </label>
                        <input type="radio" value="true" name="isDelete" checked={isDelete==true} onChange={handleChange} />  Yes
                        <input type="radio" value="false" name="isDelete" checked={isDelete==false} onChange={handleChange} />  No
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
                        </select> <br/>
                        { coursesErrors.category && <span style={{color:'red'}}>{coursesErrors.category}</span> }
                    </div>

                    <div className = 'mb-3' >
                        <input type = "number" value = {validity} placeholder = 'enter course validity(years)*' name = 'validity' onChange = {handleChange} /> <br/>
                        { coursesErrors.validity && <span style={{color:'red'}}>{coursesErrors.validity}</span> }
                    </div>

                    <div className = 'mb-3' >
                        {/* <input type = "text" value = {level} name = 'level' onChange = {handleChange} placeholder = "enter course level(change it to dropdown)*"/> */}

                        <select value={level} name='level' onChange={handleChange}>
                            <option value="">select course level*</option>
                            <option value="beginner">beginner</option>
                            <option value="intermediate">intermediate</option>
                            <option value="expert">expert</option>
                        </select><br/>
                        { coursesErrors.level && <span style={{color:'red'}}>{coursesErrors.level}</span> }
                        
                    </div>

                    <div className = 'mb-3' >
                        <input type = "text" value = {author} name = 'author' onChange = {handleChange} placeholder = "enter course author*"/><br/>
                        { coursesErrors.author && <span style={{color:'red'}}>{coursesErrors.author}</span> }
                    </div>

                    <button className="btn btn-outline-success" onClick={handleFormSubmit}>Save</button>
                </form>
                </div>
            </div>
            
        </div>
    )
}

export default CoursesForm;