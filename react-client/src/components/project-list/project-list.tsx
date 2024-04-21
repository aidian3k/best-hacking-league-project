import {ProjectItem} from "../project-entry/project-entry.types";
import {Avatar, Menu, MenuProps} from "antd";
import {FileTextOutlined} from "@ant-design/icons";
import {getItem} from "./item-helper";
import TaskEntry from "./task-entry";
import ProjectEntry from "./project-entry";

const ProjectList = ({projects}: { projects: ProjectItem[] }) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const mapItems = () => {
    return projects.map((projectItem) =>
        getItem(
            <ProjectEntry project={projectItem}/>,
            projectItem.id,
            <Avatar shape="square" size={'small'} src={projectItem.icon}/>,
            projectItem.tasks.map(task =>
                getItem(<TaskEntry task={task}/>, task.id, <FileTextOutlined/>)
            )
        )
    )
  }

  // const items: MenuProps['items'] = projects.map((projectItem) => getItem(
  //     <ProjectEntry project={projectItem}/>,
  //     projectItem.id,
  //     <Avatar shape="square" size={'small'} src={projectItem.icon}/>,
  //     projectItem.tasks.map(task =>
  //         getItem(<TaskEntry task={task}/>, task.id, <FileTextOutlined/>)
  // )));

  return (
      <div className={'flex flex-col'}>
        <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={mapItems()}
        />
      </div>

  )
}

export default ProjectList;