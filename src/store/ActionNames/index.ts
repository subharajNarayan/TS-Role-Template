export enum RequestMethod {
  GET = "GET",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  PURGE = "PURGE",
  LINK = "LINK",
  UNLINK = "UNLINK",
}

export enum RequestBodyType {
  /**If request id in application/x-www-form-urlencoded as string*/
  QUERYSTRING = "QUERY-STRING",
  /**If request is in formdata*/
  FORMDATA = "FORM-DATA",
  /**If request requires Bearer*/
  AUTH = "AUTH",
  /**If request is open*/
  NOAUTH = "NO-AUTH",
}

export interface apiDetailType {
  /**Redux Action Name */
  actionName: string;
  /**Request API URI */
  controllerName: string;
  /**Request Method; Defaults as GET */
  requestMethod?: RequestMethod;
  /**Request Body Type */
  requestBodyType?: RequestBodyType;
}


const apiDetails = {
  local: {
    i18n: {
      controllerName: "",
      actionName: "I18N"
    },
  },
  oauth: {
    login: {
      controllerName: "api/signin/",
      // controllerName: "/api/login/",
      actionName: "LOGIN",
      requestMethod: RequestMethod.POST,
      requestBodyType: RequestBodyType.NOAUTH
    },
    register: {
      controllerName: "/api/signup/",
      actionName: "REGISTER",
      requestMethod: RequestMethod.POST,
      requestBodyType: RequestBodyType.NOAUTH
    },
    init: {
      controllerName: "/oauth/user/init/data",
      actionName: "INIT",
      requestMethod: RequestMethod.GET
    },
  },
  FormLog: {
    postTaskLogs: {
      controllerName: "/api/tasks/",
      actionName: "POST_TASK",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getTaskLogs: {
      controllerName: "/api/tasks/",
      actionName: "GET_TASK",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateTaskLogs: {
      controllerName: "/api/tasks/{id}",
      actionName: "UPDATE_TASK",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteTaskLogs: {
      controllerName: "/api/tasks/{id}",
      actionName: "DELETE_TASK",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  StudentLog: {
    postStudentLogs: {
      controllerName: "/api/student",
      actionName: "POST_STUDENT",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getStudentLogs: {
      controllerName: "/api/student",
      actionName: "GET_STUDENT",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateStudentLogs: {
      controllerName: "/api/student/{id}",
      actionName: "UPDATE_STUDENT",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteStudentLogs: {
      controllerName: "/api/student/{id}",
      actionName: "DELETE_STUDENT",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
}

type ApiList = typeof apiDetails;
export const apiList: ApiList = apiDetails;