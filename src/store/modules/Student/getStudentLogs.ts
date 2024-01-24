import { Dispatch } from "redux";
import { AppThunk } from "../../../store";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type StudentType = {
  id: number,
  stdname: string,
  gender: string,
  address: string,
  phoneno: string,
  dob: string,
  fee: number,
  section: string,
}[]

const apiDetails = Object.freeze(apiList.StudentLog.getStudentLogs);

export default function getStudentLogsReducer(state = initialState, action: DefaultAction): DefaultState<StudentType> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getStudentLogsAction = (): AppThunk<APIResponseDetail<StudentType>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: true });
};