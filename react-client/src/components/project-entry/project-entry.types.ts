type ProjectItem = {
  id: number;
  title: string;
  icon: string;
  entriesCount: number;
  managerName: string;
  tasks: TaskItem[];
}

type TaskItem = {
  id: number;
  title: string;
  description: string;
  status: string;
  link: string;
}

export type {ProjectItem, TaskItem};