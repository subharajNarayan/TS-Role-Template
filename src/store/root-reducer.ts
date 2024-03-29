import { AnyAction, combineReducers } from "redux";
import loginReducer from "./modules/login/login";
import TokenService from "../services/jwt-token/jwt-token";
import i18nextReducer from "./modules/i18n/i18n";
import userDetails from "./modules/userDetails"
import outhReducer from "./modules/oauthservices";
import registerReducer from "./modules/register/register";
import TaskData from "./modules/Task";

export const appReducer = combineReducers({
    i18nextData: i18nextReducer,
    loginData: loginReducer,
    registerData: registerReducer,
    outhService:outhReducer,
    userDetails,
    TaskData,
});

export type RootState = ReturnType<typeof appReducer>;
type TState = ReturnType<typeof appReducer> | undefined;

export default function rootReducer(state: TState, action: AnyAction) {
    if (action.type === "USER_LOG_OUT") {
        state = undefined;
        try {
        } catch (err) {
            console.error("Logout Error", err);
        }
    }

    return appReducer(state, action);
};

export const logoutAction = () => {
    try {
        TokenService.clearToken();
    } catch (err) {
        console.error("LogOut Error", err);
    }

    return { type: "USER_LOG_OUT", payload: {} };
};
