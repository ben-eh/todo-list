import { TodoType } from "./Todo";

export type SortedTodos = {
  priorityTodos: TodoType[];
  normalTodos: TodoType[];
  completedTodos: TodoType[];
};