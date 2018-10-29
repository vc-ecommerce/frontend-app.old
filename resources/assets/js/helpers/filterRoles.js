export default function filterRoles(roles) {
  return roles ? roles.filter(function(role) {
    delete role["_id"];
    delete role["default"];
    delete role["privileges"];
    delete role["updated_at"];
    delete role["created_at"];
    return role;
  }) : [];
}
