let dialogoAberto = false;
let selecionarBody = document.getElementsByTagName('body');

function mostrarDialogo(idDoDialogo) {
  ultimoFocoAntesDoDialogo = document.activeElement;
  idDoDialogoAberto = idDoDialogo;
  dialogoAberto = true;
  let todosElementosDoDialogo = document.querySelectorAll(`#${idDoDialogoAberto} *`);
  document.getElementById(idDoDialogoAberto).classList.add('dialogo_ativo');
  todosElementosDoDialogo[1].setAttribute('tabindex', '0');
  todosElementosDoDialogo[1].focus();
  selecionarBody[0].style.overflowY = 'hidden';
  let ultimoElementoDoDialogo = document.createElement('SPAN');
  document.getElementById(idDoDialogoAberto).appendChild(ultimoElementoDoDialogo);
  focusApenasNoDialogo();
}

function focusApenasNoDialogo() {
  let todosElementosDoDialogo = document.querySelectorAll(`#${idDoDialogoAberto} *`);
  todosElementosDoDialogo[todosElementosDoDialogo.length - 1].setAttribute('tabindex', '0');
  todosElementosDoDialogo[todosElementosDoDialogo.length - 1].addEventListener('focus', function() {
    todosElementosDoDialogo[1].focus();
  });
  todosElementosDoDialogo[0].setAttribute('tabindex', '0');
  document.onkeydown = function(e) {
    e = e || window.event;
    todosElementosDoDialogo[0].addEventListener('focus', function() {
      if (e.shiftKey && e.keyCode === 9) {
        todosElementosDoDialogo[1].focus();
      }
    });
    if (e.keyCode === 27) {
      fecharDialogo();
    }
  };
}

function fecharDialogo() {
  if (dialogoAberto) {
    let todosElementosDoDialogo = document.querySelectorAll(`#${idDoDialogoAberto} *`);
    document.getElementById(idDoDialogoAberto).classList.remove('dialogo_ativo');
    todosElementosDoDialogo[todosElementosDoDialogo.length - 1].remove();
    dialogoAberto = false;
    ultimoFocoAntesDoDialogo.focus();
    selecionarBody[0].style.overflowY = 'auto';
  }
}
