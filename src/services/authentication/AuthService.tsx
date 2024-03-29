import { useLocation } from "react-router-dom";

import TokenService from "../jwt-token/jwt-token";
interface AuthorizationService {
  /** Current route path */
  currentPath: string;
  /** Function that returns true if authenticated otherwise not */
  isAuthenticated: () => boolean;
  getAuthUser:() => any;
}

/**
 * Provides utilities whether the user is authenticated or not and the current path
 */
function useAuthentication(): AuthorizationService {
  const location = useLocation();
  const isAuthenticated = () =>
  // TokenService.getAccessToken()?.access?.toString()?.split(".").length>1; 
  TokenService.getAccessToken()?.access?.toString()?.split("."); 

  const getAuthUser = () => TokenService.getAccessToken();

  return {
    currentPath: location.pathname,
    isAuthenticated: isAuthenticated,
    getAuthUser: getAuthUser
  };
}

export default useAuthentication;
