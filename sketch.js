let carro, linhaChegada, inimigos = [];
let venceu = false;
let perdeu = false;
let mensagem = "";

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("game-container");

  carro = createVector(50, height / 2);
  linhaChegada = { x: 470, y: 0, w: 20, h: height };

  // inimigos (carros vermelhos)
  inimigos.push({ x: 200, y: 50, w: 30, h: 50, dir: 3 });
  inimigos.push({ x: 300, y: 250, w: 30, h: 50, dir: -3 });
  inimigos.push({ x: 400, y: 100, w: 30, h: 50, dir: 2 });
}

function draw() {
  background(100, 180, 100);

  // Estrada
  fill(50);
  rect(0, 0, width, height);

  // Faixas amarelas centrais
  stroke(255, 255, 0);
  strokeWeight(4);
  for (let i = 0; i < height; i += 40) {
    line(width / 2, i, width / 2, i + 20);
  }
  noStroke();

  // Linha de chegada
  fill(255);
  rect(linhaChegada.x, linhaChegada.y, linhaChegada.w, linhaChegada.h);

  // Desenhar o carro do jogador
  desenharCarro(carro.x, carro.y);

  // Desenhar inimigos (carros vermelhos)
  for (let e of inimigos) {
    desenharInimigo(e.x, e.y, e.w, e.h);
    e.y += e.dir;

    if (e.y < 0 || e.y + e.h > height) e.dir *= -1;

    if (colide(carro, e) && !perdeu && !venceu) {
      perdeu = true;
      mensagem = "💥 Você bateu!";
    }
  }

  // Vitória
  if (!venceu && !perdeu && carro.x + 40 > linhaChegada.x) {
    venceu = true;
    mensagem = "🏆 Você venceu a corrida!";
  }

  // Fim de jogo
  if (perdeu || venceu) {
    noLoop();
    fill(perdeu ? color(255, 0, 0) : color(0, 255, 0));
    textSize(24);
    textAlign(CENTER, CENTER);
    text(mensagem, width / 2, height / 2);
  }
}

function keyPressed() {
  if (venceu || perdeu) return;

  if (keyCode === LEFT_ARROW) carro.x -= 10;
  else if (keyCode === RIGHT_ARROW) carro.x += 10;
  else if (keyCode === UP_ARROW) carro.y -= 10;
  else if (keyCode === DOWN_ARROW) carro.y += 10;

  carro.x = constrain(carro.x, 0, width - 40);
  carro.y = constrain(carro.y, 0, height - 70);
}

function colide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + 40 > b.x &&
    a.y < b.y + b.h &&
    a.y + 70 > b.y
  );
}

// ---- DESENHO DO CARRO (Jogador) ----
function desenharCarro(x, y) {
  push();
  translate(x, y);

  // Corpo azul
  fill(0, 0, 200);
  rect(0, 0, 40, 70, 8);

  // Para-brisa
  fill(135, 206, 235);
  rect(5, 10, 30, 15, 3);

  // Rodas
  fill(20);
  rect(-5, 5, 10, 15, 3);
  rect(-5, 50, 10, 15, 3);
  rect(35, 5, 10, 15, 3);
  rect(35, 50, 10, 15, 3);

  // Faróis
  fill(255, 255, 100);
  ellipse(10, 65, 10, 5);
  ellipse(30, 65, 10, 5);

  pop();
}

// ---- DESENHO DOS INIMIGOS (Carros vermelhos) ----
function desenharInimigo(x, y, w, h) {
  push();
  translate(x, y);

  fill(200, 0, 0);
  rect(0, 0, w, h, 8);

  // Faróis
  fill(255, 255, 150);
  ellipse(5, h - 5, 8, 4);
  ellipse(w - 5, h - 5, 8, 4);

  // Para-brisa
  fill(240, 240, 240);
  rect(5, 10, w - 10, 10, 3);

  pop();
}
