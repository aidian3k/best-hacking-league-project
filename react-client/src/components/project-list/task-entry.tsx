import { useEffect, useState } from "react";
import {TaskItem} from "../project-entry/project-entry.types";

const TaskEntry = ({task}: { task: TaskItem}) => {
  const [generatedLink, setGeneratedLink] = useState('');

  function strip(html: string){
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }

 const getDesc = (desc: string) => {
  const stripped = strip(desc);
  const descToPrint = stripped.length > 40 ? stripped.substring(0, 40) + '...' : stripped;
  if (descToPrint === 'null') {
    console.log('mamy nulla')
    return "";
  }
  return descToPrint;
 }

 const getLink = async (url: string) => {
  const data = await fetch(task.link);
  console.log(data)
  const json = await data.text();
  console.log(json)
  return "https://wp.pl"
 }

 useEffect(() => {
  getLink(task.link).then(res => setGeneratedLink(res))
 })

  return (
      <div>
        <div className={'flex flex-row gap-5'}>
          <a href={task.link} target="_blank"
             className={'font-medium text-blue-600 dark:text-blue-500 hover:underline'}>{task.title}</a>
          <p>{getDesc(task.description)}</p>
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