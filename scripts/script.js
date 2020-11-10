var tbody = document.querySelector("table tbody");
var jogador = {};
function cadastrar() {
  jogador.Username = document.querySelector("#username").value;
  jogador.Posicao = document.querySelector("#posicao").value;
  jogador.Telefone = document.querySelector("#telefone").value;
  jogador.Cpf = document.querySelector("#cpf").value;

  if (jogador.Id === undefined || jogador.Id === 0) {
    salvarCraques("POST", 0, jogador);
  } else {
    salvarCraques("PUT", jogador.Id, jogador);
  }
  carregarCraques();
}

function novoCraque() {
  var btnSalvar = document.querySelector("#btnSalvar");
  var titulo = document.querySelector("#modalLabel");
  document.querySelector("#username").value = "";
  document.querySelector("#posicao").value = "";
  document.querySelector("#telefone").value = "";
  document.querySelector("#cpf").value = "";

  jogador = {};

  btnSalvar.textContent = "Cadastrar";
  titulo.textContent = "Cadastrar Craque";
  $("#newCraqueModal").modal("show");
}
function cancelar() {
  var btnSalvar = document.querySelector("#btnSalvar");
  var titulo = document.querySelector("#modalLabel");
  document.querySelector("#username").value = "";
  document.querySelector("#posicao").value = "";
  document.querySelector("#telefone").value = "";
  document.querySelector("#cpf").value = "";

  jogador = {};

  btnSalvar.textContent = "Cadastrar";
  titulo.textContent = "Cadastrar Craque";
  $("#newCraqueModal").modal("hide");
}

function carregarCraques() {
  tbody.innerHTML = "";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", `https://localhost:44341/api/Craque`, true);

  xhr.onload = function () {
    var craques = JSON.parse(this.responseText);
    for (var indice in craques) {
      adicionarLinha(craques[indice]);
    }
  };
  xhr.send();
}

function salvarCraques(metodo, id, corpo) {
  var xhr = new XMLHttpRequest();

  if (id === undefined || id === 0) id = "";

  xhr.open(metodo, `https://localhost:44341/api/Craque/${id}`, false);

  xhr.setRequestHeader("content-type", "application/json");

  cancelar();
  xhr.send(JSON.stringify(corpo));
}

carregarCraques();

function editarCraque(craque) {
  var btnSalvar = document.querySelector("#btnSalvar");
  var titulo = document.querySelector("#modalLabel");
  document.querySelector("#username").value = craque.Username;
  document.querySelector("#posicao").value = craque.Posicao;
  document.querySelector("#telefone").value = craque.Telefone;
  document.querySelector("#cpf").value = craque.Cpf;

  btnSalvar.textContent = "Salvar";
  titulo.textContent = `Editando Craque ${craque.Username}`;
  jogador = craque;
}

function removerCraque(id) {
  var xhr = new XMLHttpRequest();

  xhr.open("DELETE", `https://localhost:44341/api/Craque/${id}`, false);

  xhr.send();
}

function excluir(craque) {
  bootbox.confirm({
    message: `Deseja remover o craque ${craque.Username}?`,
    buttons: {
      confirm: {
        label: "Sim",
        className: "btn-success",
      },
      cancel: {
        label: "Não",
        className: "btn-danger",
      },
    },
    callback: function (result) {
      if (result) {
        removerCraque(craque.Id);
        carregarCraques();
      }
    },
  });
}

function adicionarLinha(craque) {
  var tbody = document.querySelector("table tbody");

  var trow = `<tr>
                        <td>${craque.Username}</td>
                        <td>${craque.Posicao}</td>
                        <td>${craque.Telefone}</td>
                        <td>${craque.Cpf}</td>
                        <td><button class="btn btn-info" 
                        data-toggle="modal"
                        data-target="#newCraqueModal" onclick='editarCraque(${JSON.stringify(
                          craque
                        )})'>Editar</button>
                            <button class="btn btn-danger" onclick='excluir(${JSON.stringify(
                              craque
                            )})'>Remover</button></td>
                    </tr>`;
  tbody.innerHTML += trow;
  console.log(craque.Username);
}
