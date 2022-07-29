let fakeBanco = [];

const pegarBanco = () => JSON.parse(localStorage.getItem("listaTarefas")) ?? [];

const setarBanco = (fakeBanco) =>
  localStorage.setItem("listaTarefas", JSON.stringify(fakeBanco));

const criarItem = (tarefa, status, indice) => {
  const label = document.createElement("label");
  label.classList.add("label-container");
  label.setAttribute("for", indice);
  label.innerHTML = `
    <div class="inputAndText">
        <input type="checkbox" id="${indice}" ${status} data-indice=${indice}>
        <span class="textTarefa">${tarefa}</span>
    </div>
    <div>
        <button type="submit" class="btnAcao" id="btnRemove" data-indice=${indice}>
        <i class="fa-solid fa-trash-can"></i>
        </button>
    </div>
    `;
  document.getElementById("listaTarefas").appendChild(label);
};

const resetRender = () => {
  const divPaiDaLabel = document.getElementById("listaTarefas");
  while (divPaiDaLabel.firstChild) {
    divPaiDaLabel.removeChild(divPaiDaLabel.lastChild);
  }
};

const renderTela = () => {
  resetRender();
  const fakeBanco = pegarBanco();
  fakeBanco.forEach((itemDoBanco, indice) =>
    criarItem(itemDoBanco.tarefa, itemDoBanco.status, indice)
  );
};

const inserirTarefa = (e) => {
  const tecla = e.key;
  const textoDoInput = e.target.value;
  if (tecla === "Enter") {
    const fakeBanco = pegarBanco();
    fakeBanco.push({ tarefa: textoDoInput, status: "" });
    setarBanco(fakeBanco);
    renderTela();
    e.target.value = "";
  }
};

const removerItem = (indice) => {
  const fakeBanco = pegarBanco();
  fakeBanco.splice(indice, 1);
  setarBanco(fakeBanco);
  renderTela();
};

const atualizarItem = (indice) => {
  const fakeBanco = pegarBanco();
  fakeBanco[indice].status = fakeBanco[indice].status == "" ? "checked" : "";
  setarBanco(fakeBanco);
  renderTela();
};

const captureClickItem = (e) => {
  const elemento = e.target;
  if (
    elemento.id == "btnRemove" ||
    elemento.className == "fa-solid fa-trash-can"
  ) {
    const indice = elemento.dataset.indice;
    removerItem(indice);
  } else if (elemento.type === "checkbox") {
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
};

const inserirTarefaPorClick = (e) => {
  const textoDoInput = document.getElementById("novaTarefa");
  const fakeBanco = pegarBanco();
  fakeBanco.push({ tarefa: textoDoInput.value, status: "" });
  setarBanco(fakeBanco);
  renderTela();
  textoDoInput.value = "";
};

document
  .getElementById("novaTarefa")
  .addEventListener("keypress", inserirTarefa);
document
  .getElementById("listaTarefas")
  .addEventListener("click", captureClickItem);
document
  .getElementById("btnAddTarefa")
  .addEventListener("click", inserirTarefaPorClick);

renderTela();
