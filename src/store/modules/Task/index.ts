import { combineReducers } from "redux";
import deleteFormLogs from "./deleteTaskLogs";
import getFormLogs from "./getTaskLogs";
import postFormLogs from "./postTaskLogs";
import updateFormLogs from "./updateTaskLogs";

const TaskReducer = combineReducers({
  postFormLogs,
  getFormLogs,
  updateFormLogs,
  deleteFormLogs,
});

export default TaskReducer;