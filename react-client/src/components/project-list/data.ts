import {ProjectItem} from "../project-entry/project-entry.types";

const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'TimeCounter',
    icon: 'https://cdn-icons-png.flaticon.com/512/9912/9912615.png',
    entriesCount: 12,
    managerName: 'John Vodnicky',
    tasks: [
      {
        id: 12,
        title: 'Task 1',
        description: 'The purpose of this task is...',
        link: 'http://google.com',
        status: 'Done'
      }
    ],
  },
  {
    id: 2,
    title: 'FinanceReporter',
    icon: 'https://cdn-icons-png.freepik.com/512/2640/2640775.png',
    entriesCount: 4,
    managerName: 'Hugo Boss',
    tasks: [
      {
        id: 13,
        title: 'Task 2',
        description: 'The purpose of this task is...',
        link: 'http://google.com',
        status: 'Done'
      }
    ],
  },
  {
    id: 3,
    title: 'TrafficAnalyser',
    icon: 'https://cdn-icons-png.flaticon.com/512/6578/6578873.png',
    entriesCount: 8,
    managerName: 'Andrzej Toboła aka ATO',
    tasks: [
      {
        id: 14,
        title: 'Task 3',
        description: 'The purpose of this task is...',
        link: 'http://google.com',
        status: 'Done'
      }
    ],
  }
]

export {projects};