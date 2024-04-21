import {ProjectItem} from "../project-entry/project-entry.types";

const ProjectEntry = ({project}: {project: ProjectItem}) => {
  return (
      <div className={'flex flex-row'}>
        <div className={'flex flex-row items-center gap-1 mr-2'}>
          <p className={'text-sm'}>{project.title}</p>
          <p className={'text-gray-400 text-xs'}>~ Managed by <span
              className={'font-medium'}>{project.managerName}</span></p>
        </div>
        <p className={'text-sm mr-auto'}>[{project.entriesCount} tasks]</p>
      </div>
  )
}

export default ProjectEntry;