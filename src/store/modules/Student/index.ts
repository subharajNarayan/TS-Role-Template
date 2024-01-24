import { combineReducers } from "redux";
import deleteStudentLogs from "./deleteStudentLogs";
import getStudentLogs from "./getStudentLogs";
import postStudentLogs from "./postStudentLogs";
import updateStudentLogs from "./updateStudentLogs";

const StudentReducer = combineReducers({
  postStudentLogs,
  getStudentLogs,
  updateStudentLogs,
  deleteStudentLogs,
});

export default StudentReducer;