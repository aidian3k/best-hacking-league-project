type SingleEmployeeDetailedResponse = {
  projectDetailedTaskInformation: ProjectDetailedTaskInformation;
  singleMatchingTaskDetail: SingleMatchingTaskDetail[];
}

type ProjectDetailedTaskInformation = {
  projectName: string;
  totalNumberOfTasks: number;
  totalNumberOfStoryPoints: number;
}

type SingleMatchingTaskDetail = {
  taskId: number;
  storyPoints: number;
  taskTitle: string;
  taskDescription: string; // should be only one matched from the task
  taskStatus: string;
  taskUrl: string;
  changedDate: Date;
  taskTags: string;
  otherLinks: any;
}

type SimpleEmployeeDetailsRequest = { matchingTasksIds: number[] }

export type {
  SingleEmployeeDetailedResponse,
  ProjectDetailedTaskInformation,
  SingleMatchingTaskDetail,
  SimpleEmployeeDetailsRequest
};