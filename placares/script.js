let scoreA = 0;
let scoreB = 0;
let timerInterval;
let gameTime;
let initialTime;
let pausedTime = null;
let isPaused = true;

function incrementScore(team) {
    if (team === 'A') {
        scoreA++;
        document.getElementById('scoreA').textContent = scoreA;
    } else if (team === 'B') {
        scoreB++;
        document.getElementById('scoreB').textContent = scoreB;
    }
}

function decrementScore(team) {
    if (team === 'A' && scoreA > 0) {
        scoreA--;
        document.getElementById('scoreA').textContent = scoreA;
    } else if (team === 'B' && scoreB > 0) {
        scoreB--;
        document.getElementById('scoreB').textContent = scoreB;
    }
}

function toggleTimer() {
    if (isPaused) {
        startTimer();
    } else {
        pauseTimer();
    }
}

function startTimer() {
    if (!pausedTime) {
        initialTime = parseInt(document.getElementById('gameTime').value) * 60;
        gameTime = initialTime;
        if (isNaN(gameTime) || gameTime <= 0) {
            alert('Por favor, insira um tempo válido.');
            return;
        }
    } else {
        gameTime = pausedTime;
    }

    clearInterval(timerInterval);
    updateProgressCircle(326); // Reseta o círculo de progresso
    timerInterval = setInterval(() => {
        if (gameTime > 0) {
            gameTime--;
            pausedTime = gameTime;
            let minutes = Math.floor(gameTime / 60);
            let seconds = gameTime % 60;
            document.getElementById('timeDisplay').textContent =
                (minutes < 10 ? '0' : '') + minutes + ':' +
                (seconds < 10 ? '0' : '') + seconds;

            // Atualiza o círculo de progresso conforme o tempo passa
            let progress = (1 - gameTime / initialTime) * 326;
            updateProgressCircle(326 - progress);
        } else {
            clearInterval(timerInterval);
            updateProgressCircle(0); // Preenche o círculo completamente quando o tempo acaba
            alert('Tempo esgotado!');
        }
    }, 1000);

    isPaused = false;
    updateToggleIcon();
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    updateToggleIcon();
}

function resetTimer() {
    clearInterval(timerInterval);
    pausedTime = null;
    isPaused = true;
    document.getElementById('timeDisplay').textContent = '00:00';
    updateProgressCircle(326); // Reseta o círculo de progresso
    updateToggleIcon();
}

function updateProgressCircle(offset) {
    document.querySelector('.progress-ring__circle').style.strokeDashoffset = offset;
}

function updateToggleIcon() {
    const toggleIcon = document.getElementById('toggleIcon');
    if (isPaused) {
        toggleIcon.setAttribute('class', 'feather feather-play-circle');
        toggleIcon.innerHTML = `
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8"/>
        `;
    } else {
        toggleIcon.setAttribute('class', 'feather feather-pause-circle');
        toggleIcon.innerHTML = `
            <circle cx="12" cy="12" r="10"/>
            <line x1="10" y1="15" x2="10" y2="9"/>
            <line x1="14" y1="15" x2="14" y2="9"/>
        `;
    }
}
