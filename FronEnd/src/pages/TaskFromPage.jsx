
import {useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import { NavBar } from '../components/NavBar';
import Sidebar from '../components/SideBar';
import { useEffect } from 'react';


function TaskFromPage() {

    const {register, handleSubmit, setValue,} = useForm()
    const {createTask, getTask, updateTask} = useTasks()
    const navigate = useNavigate();
    const params = useParams();



    useEffect(() => {
      async function loadTask(){
        if (params.id) {
          const task = await getTask(params.id);
          console.log(task)
          setValue('title', task.title)
          setValue('description', task.description)
        }
      }
      loadTask();
    }, [])


    const onSubmit = handleSubmit((data) => {
        if (params.id) {
          updateTask(params.id, data);
        } else {
          createTask(data);
        }
        navigate('/tasks')
    });


    return (
      <div>
        <NavBar/>
        <div className="main-container">
        <Sidebar/>
        <div className='custom-container'>
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder='Title' 
            {...register('title')}
            className='custom-input'
            autoFocus
          />
          <textarea 
            rows="3" 
            placeholder='Description'
            {...register("description")}
            className='custom-textarea'
          >
          </textarea>
          <button className='custom-button'>
            Save
          </button>
        </form>
      </div>
    </div>
    </div>
      )
}

export default TaskFromPage;