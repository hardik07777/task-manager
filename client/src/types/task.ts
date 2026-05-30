export interface Task {
  _id: string;
  title: string;
  description: string;
  stage: "todo" | "in-progress" | "done";
}