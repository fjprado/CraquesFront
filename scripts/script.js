var tbody = document.querySelector("table tbody");
var jogador = {};
function cadastrar() {
  jogador.Username = document.querySelector("#username").value;
  jogador.Posicao = document.querySelector("#posicao").value;
  jogador.NivelAtaque = document.querySelector("#nivelAtaque").value;
  jogador.NivelDefesa = document.querySelector("#nivelDefesa").value;
  jogador.Telefone = document.querySelector("#telefone").value;
  jogador.Email = document.querySelector("#email").value;

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
  document.querySelector("#nivelAtaque").value = "";
  document.querySelector("#nivelDefesa").value = "";
  document.querySelector("#telefone").value = "";
  document.querySelector("#email").value = "";

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
  document.querySelector("#nivelAtaque").value = "";
  document.querySelector("#nivelDefesa").value = "";
  document.querySelector("#telefone").value = "";
  document.querySelector("#email").value = "";

  jogador = {};

  btnSalvar.textContent = "Cadastrar";
  titulo.textContent = "Cadastrar Craque";
  $("#newCraqueModal").modal("hide");
}

function carregarCraques() {
  tbody.innerHTML = "";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", `https://localhost:44341/api/Craque/Recuperar`, true);

  xhr.onerror = function () {
    console.log("ERRO", xhr.readyState);
  };

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var craques = JSON.parse(this.responseText);
        for (var indice in craques) {
          adicionarLinha(craques[indice]);
        }
      } else if (this.status == 500) {
        var erro = JSON.parse(this.responseText);
        console.log(erro.Message);
        console.log(erro.ExceptionMessage);
      }
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
  document.querySelector("#nivelAtaque").value = craque.NivelAtaque;
  document.querySelector("#nivelDefesa").value = craque.NivelDefesa;
  document.querySelector("#telefone").value = craque.Telefone;
  document.querySelector("#email").value = craque.Email;

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
                        <td>${craque.NivelAtaque}</td>
                        <td>${craque.NivelDefesa}</td>
                        <td>${craque.Telefone}</td>
                        <td>${craque.Email}</td>
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
