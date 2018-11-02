export function cleanRole(roles) {
  return roles ? roles.filter(function(role) {
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

  let regLettersMa     = /[A-Z]/;
  let regLettersMi     = /[a-z]/;
  let regNumber       = /[0-9]/;
  let regEspecial     = /[!@#$%&*?]/;

  let size         = false;
  let sizeM        = false;
  let lettersMa    = false;
  let lettersMi    = false;
  let number      = false;
  let especial    = false;

//    console.clear();
//    console.log('password: '+password);

  if(password.length >= 6) size = true;
  if(password.length >= 10) sizeM = true;
  if(regLettersMa.exec(password)) lettersMa = true;
  if(regLettersMi.exec(password)) lettersMi = true;
  if(regNumber.exec(password)) number = true;
  if(regEspecial.exec(password)) especial = true;

  if(size) force += 10;
  if(sizeM) force += 10;
  if(lettersMa) force += 10;
  if(lettersMi) force += 10;
  if(lettersMa && lettersMi) force += 20;
  if(number) force += 20;
  if(especial) force += 20;

  //console.log('força: '+force);
  return force;

}

export function swalError(obj) {

  if (obj.data.status === 401) {

    if(obj.data.statusText==="Unauthorized") {

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
      function(){
        sessionStorage.clear();
        window.location.replace("/login");
      });

    }

  }

}
