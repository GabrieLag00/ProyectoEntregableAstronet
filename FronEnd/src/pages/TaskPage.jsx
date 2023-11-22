import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { NavBar } from "../components/NavBar";
import Sidebar from "../components/SideBar";

function TaskPage() {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks()
    }, [])

    if (tasks.length === 0) return (<h1> No tasks</h1>)

    return (
        <>
        <div>
            <NavBar/>
            <div className="main-container">
            <Sidebar/>
        <div className=".contenedor-grid">
            <br /><br /><br /><br /><br />
            {
                tasks.map(task =>(
                   <TaskCard task={task} key={task._id}/>
                ))
            }
        </div>
        </div>
        </div>
        </>
      );
}

export default TaskPage;