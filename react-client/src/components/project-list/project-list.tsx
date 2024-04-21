import {ProjectItem} from "../project-entry/project-entry.types";
import {ProjectEntry} from "../project-entry/project-entry";

const ProjectList = ({projects}: {projects: ProjectItem[]}) => {

  return (
      <div className={'flex flex-col'}>
        {projects.map((project) => <ProjectEntry project={project} />)}
      </div>

  )
}

export default ProjectList;