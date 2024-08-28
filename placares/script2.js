let setsA = 0;
let setsB = 0;
let jogoEncerrado = false;

function incrementarPonto(pontosId, setsId) {
    if (jogoEncerrado) return;

    let pontos = document.getElementById(pontosId);
    let sets = document.getElementById(setsId);
    let pontosAdversarioId = pontosId === 'pontosA' ? 'pontosB' : 'pontosA';
    let setsAdversarioId = setsId === 'setsA' ? 'setsB' : 'setsA';
    let pontosAdversario = document.getElementById(pontosAdversarioId);
    let setsAdversario = document.getElementById(setsAdversarioId);

    pontos.textContent = parseInt(pontos.textContent) + 1;

    let pontosParaVencer = (setsA === 2 && setsB === 2) ? 15 : 25;
    
    if (pontos.textContent >= pontosParaVencer && (pontos.textContent - parseInt(pontosAdversario.textContent)) >= 2) {
        pontos.textContent = 0;
        pontosAdversario.textContent = 0;

        sets.textContent = parseInt(sets.textContent) + 1;

        if (setsId === 'setsA') {
            setsA++;
        } else {
            setsB++;
        }

        if (setsA === 3 || setsB === 3) {
            alert(`O jogo acabou! ${setsA === 3 ? 'Time A' : 'Time B'} venceu!`);
            jogoEncerrado = true;
        }
    }
}

function decrementarPonto(pontosId) {
    if (jogoEncerrado) return;

    let pontos = document.getElementById(pontosId);
    if (pontos.textContent > 0) {
        pontos.textContent = parseInt(pontos.textContent) - 1;
    }
}
