import { countRoles } from './tools';

export function userIsAuthorizedPage(roles, keys) {

  if (countRoles(roles, keys) <= 0) {
    return window.location.replace("/");
  }

  return true;

}

export function userIsAuthorized(roles, keys) {

  if (countRoles(roles, keys) <= 0) {
    sessionStorage.clear();
    return window.location.replace("/login");
  }

  return true;

}

export function isRoleUser(roles, keys) {

  if (countRoles(roles, keys) > 0) {
    return true;
  }

  return false;

}
