const dino = document.getElementById("skate-dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let score = 0;
let isJumping = false;
let gameInterval;
const obstacleSpeed = 20; // Velocidade do movimento do obstáculo
const maxScore = 10; // Pontuação máxima para vitória

window.onload = function () {
  var audio = document.getElementById("myAudio");
  audio.play();

  // Função que detecta o pressionamento da tecla de seta para cima
  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.code === "Space") {
      var audio = document.getElementById("myAudio");
      audio.play(); // Inicia a reprodução do áudio
    }
  });
};

// Função para fazer o dinossauro pular
function jump() {
  if (isJumping) return;
  isJumping = true;
  dino.style.animation = "jump 0.6s ease";
  setTimeout(() => {
    dino.style.animation = "";
    isJumping = false;
  }, 600);
}

// Função para mover o obstáculo de forma contínua
function moveObstacle() {
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).right);

  // Se o obstáculo saiu da tela (passou totalmente pelo dinossauro)
  if (obstacleLeft >= 800) {
    score++;
    scoreDisplay.textContent = score;

    // Verificar se o jogador atingiu a pontuação máxima
    if (score === maxScore) {
      clearInterval(gameInterval);
      alert("Parabéns! Você venceu com 10 pontos!");
      pauseAudio(); // Pausar o áudio após vencer
      location.reload();
    }

    // Reposiciona o obstáculo para o lado direito fora da tela
    obstacle.style.right = "-50px";
  } else {
    // Move o obstáculo para a esquerda
    obstacle.style.right = `${obstacleLeft + 10}px`;
  }
}
// Função para pausar o áudio
function pauseAudio() {
  var audio = document.getElementById("myAudio");
  audio.pause();
}
// Função para detectar colisão
function checkCollision() {
  const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
  const obstacleLeft = parseInt(window.getComputedStyle(obstacle).right);

  // Verificar se o dinossauro colidiu com o obstáculo
  if (obstacleLeft > 650 && obstacleLeft < 760 && dinoBottom < 50) {
    clearInterval(gameInterval);
    alert("Game Over! Pontuação final: " + score);
    pauseAudio(); // Pausar o áudio após o game over
    location.reload(); // Recarregar a página
  }
}

// Iniciar o jogo
function startGame() {
  gameInterval = setInterval(() => {
    moveObstacle();
    checkCollision();
  }, obstacleSpeed);
}

// Controle para teclas (espaço, seta para cima)
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === " " || e.key === "ArrowUp") {
    jump();
  }
});

// Controle para clique do mouse
document.addEventListener("click", () => {
  jump();
});

// Controle para toque em dispositivos móveis
document.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault(); // Evita o comportamento padrão (como o scroll)
    jump();
  },
  { passive: false }
); // Define o evento como não passivo para permitir o preventDefault()

// Inicializa o jogo
startGame();
