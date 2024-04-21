interface MatchingTasksTableData {
  key: string;
  name: string;
  picture: string;
  title: string;
  languages: string[];
  team: string;
  story_points: number;
  actions: string[];
  matchingTasksIds: number[];
}

export type {MatchingTasksTableData};