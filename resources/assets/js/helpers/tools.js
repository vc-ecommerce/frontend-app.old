export function cleanRole(roles) {
  return roles ? roles.filter(function (role) {
    delete role["_id"];
    delete role["default"];
    delete role["privileges"];
    delete role["updated_at"];
    delete role["created_at"];
    return role;
  }) : [];
}

export function forcePassword(password) {

  let force = 0;

  let regLettersMa = /[A-Z]/;
  let regLettersMi = /[a-z]/;
  let regNumber = /[0-9]/;
  let regEspecial = /[!@#$%&*?]/;

  let size = false;
  let sizeM = false;
  let lettersMa = false;
  let lettersMi = false;
  let number = false;
  let especial = false;

  //    console.clear();
  //    console.log('password: '+password);

  if (password.length >= 6) size = true;
  if (password.length >= 10) sizeM = true;
  if (regLettersMa.exec(password)) lettersMa = true;
  if (regLettersMi.exec(password)) lettersMi = true;
  if (regNumber.exec(password)) number = true;
  if (regEspecial.exec(password)) especial = true;

  if (size) force += 10;
  if (sizeM) force += 10;
  if (lettersMa) force += 10;
  if (lettersMi) force += 10;
  if (lettersMa && lettersMi) force += 20;
  if (number) force += 20;
  if (especial) force += 20;

  //console.log('força: '+force);
  return force;

}

export function swalErrorUnauthorized(obj) {

  if (!obj) return '';

  if (obj.data.status === 401
    && obj.data.statusText === "Unauthorized") {

    swal({
      title: "Atenção!!!",
      text: "Acesso não autorizado ou negado pelo servidor.",
      type: "error",
      showCancelButton: false,
      cancelButtonClass: "btn-default",
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Fazer login",
      closeOnConfirm: false
    },
      function () {
        sessionStorage.clear();
        window.location.replace("/login");
      });

  }

}

export function cleanDataApi(data) {

  if (!data) return '';
  data = data.toString();
  return data.replace(["[", "]"], '');

}

export function strSlug(str, separator='-') {
  str = String(str);
  str = str.trim();
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaaaeeeeiiiioooouuuunc------";

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  return str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, "") // trim - from end of text
    .replace(/-/g, separator);
}

export function strRandon() {
  return Math.floor(Math.random() * 1000000 + 1);
}
