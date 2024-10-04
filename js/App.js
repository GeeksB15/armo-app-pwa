
var Usuario = JSON.parse(localStorage.getItem("Usuario"));
var dbName = localStorage.getItem("dbName");
var CodigoClienteSistema = localStorage.getItem("CodigoClienteSistema");
var app = {}
var db = {}

$(document).ready(function () {
  //Se não tem Usuário Logado 
  if (Usuario) {
    IniciaScriptBasico("basico");
  } else {
    app = new kendo.mobile.Application(document.body, { skin: "nova" });
    //app = new kendo.mobile.Application(document.body, { skin: "material-light"});
  };
});

//Inicia Script Basico
IniciaScriptBasico = function () {
  var tmp = JSON.parse(localStorage.getItem('CodigoPersonalizado'));
  IniciaScript("CodigoPersonalizado", tmp)
}

IniciaScript = function (id, script) {

  if (!$("#" + id)[0]) {
    //debugger
    if (id) {
      $("body").append('<script id="' + id + '">' + script + '</script>')
    } else {
      $("body").append('<script>' + script + '</script>')
    }
  }
}

//Iniciou tela Login
objLogin_init = function () {

  //Login 
  //$("#objLogin_itnUsuario").kendoMaskedTextBox({ mask: "000.000.000-00" });  //Coloca mascara do CPF   
  //Preenche usuário e senha guardado no Storage
  $("#objLogin_itnUsuario").val(localStorage.getItem("objLogin_itnUsuario"))
  $("#objLogin_itnSenha").val(localStorage.getItem("objLogin_itnSenha"))
  $("#objLogin_itnApi").val(localStorage.getItem("objLogin_itnApi"))

  //Clicou em faser Login
  $("#objLogin_itnLogin").click(function () {

    var usr = $("#objLogin_itnUsuario").val().trim()
    var senha = $("#objLogin_itnSenha").val().trim()
    var api = $("#objLogin_itnApi").val().trim()

    if (usr == "") {
      alert("Você deve informar o usuário!", "Atenção");
      return;
    }

    if (senha == "") {
      alert("Você deve informar uma Senha", "Atenção")
      return
    }

    localStorage.setItem("objLogin_itnUsuario", usr)
    localStorage.setItem("objLogin_itnSenha", senha)
    localStorage.setItem("objLogin_itnApi", api)

    var tmp = Geeks.Plat.Sql("Select o.CodigoPersonalizado from Objeto o where CodigoObjeto=173").Records[0].CodigoPersonalizado;
    localStorage.setItem('CodigoPersonalizado', JSON.stringify(tmp));
    IniciaScriptBasico()
  })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration)
    })
    .catch(error => {
      console.log('Falha ao registrar o Service Worker:', error)
    })
}




