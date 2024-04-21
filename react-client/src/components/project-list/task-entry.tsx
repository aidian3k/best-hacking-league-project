import {TaskItem} from "../project-entry/project-entry.types";

const TaskEntry = ({task}: { task: TaskItem }) => {
  return (
      <div>
        <div className={'flex flex-row gap-5'}>
          <a href={task.link}
             className={'font-medium text-blue-600 dark:text-blue-500 hover:underline'}>{task.title}</a>
          <p>{task.description?.length > 30 ? task.description.substring(0, 30) + '...' : task.description}</p>
          <p>{mapStatus(task.status)}</p>
        </div>
      </div>
  )
}

const mapStatus = (status: string) => {
  if (status === 'To Do') {
    return '🟡' + status;
  } else if (status === 'Done') {
    return '🟢' + status;
  } else {
    return '🟠' + status;
  }
}

export default TaskEntry;