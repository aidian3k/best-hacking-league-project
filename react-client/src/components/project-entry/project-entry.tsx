import {ProjectItem} from "./project-entry.types";
import {Button} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useState} from "react";

export const ProjectEntry = ({project}: { project: ProjectItem }) => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  }

  return (
      <div className={'flex flex-row items-center hover:bg-gray-300'}>
        <img className={'w-10 h-10 rounded-full'} src={project.icon} alt={"projectPhoto"}/>
        <p className={'text-sm'}>{project.title}</p>
        <p className={'text-gray-400 text-xs'}>~ Managed by <span
            className={'font-medium'}>{project.managerName}</span></p>
        <p className={'text-sm'}>[{project.entriesCount} tasks]</p>
        <Button
            type="primary"
            icon={<DownOutlined/>}
            loading={loadings[2]}
            onClick={() => enterLoading(2)}
        />
      </div>
  )
}

export default ProjectEntry;