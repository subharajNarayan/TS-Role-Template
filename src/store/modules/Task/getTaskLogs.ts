import { Dispatch } from "redux";
import { AppThunk  } from "../../../store";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type TaskType = {
  id: number,
  title: string,
  description: string,
  start_date: string,
  end_date: string,
  assigned_user_name: string,
  address: string,
}[]

const apiDetails = Object.freeze(apiList.FormLog.getTaskLogs);

export default function getTaskLogsReducer(state = initialState, action: DefaultAction): DefaultState<TaskType> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getTaskLogsAction = (): AppThunk<APIResponseDetail<TaskType>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: true });
};