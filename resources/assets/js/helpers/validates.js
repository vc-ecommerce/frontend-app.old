export function userIsAuthorizedPage(roles, keys) {

  let count = 0;
  roles.filter(function (role) {
    if (keys.indexOf(role.name) > -1) {
      count++;
    }
  });

  if (count === 0) {
    return window.location.replace("/");
  }
}

export function userIsAuthorized(roles, keys) {

  let count = 0;
  roles.filter(function (role) {
    if (keys.indexOf(role.name) > -1) {
      count++;
    }
  });

  if (count === 0) {
    sessionStorage.clear();
    return window.location.replace("/login");
  }

}

export function isRoleUser(roles, keys) {

  let count = 0;
  roles.filter(function (role) {
    if (keys.indexOf(role.name) > -1) {
      count++;
    }
  });

  if (count > 0) {
    return true
  }
  return false

}
