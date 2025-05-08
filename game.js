const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ukuran canvas
const width = canvas.width;
const height = canvas.height;

// Monyet
const monyet = {
  x: 50,
  y: height - 80,
  width: 40,
  height: 40,
  velocityY: 0,
  gravity: 1.2,
  jumpPower: -15,
  isJumping: false,
  image: new Image()
};
monyet.image.src = "images/monyet.png"; // Pastikan file gambar ada di folder "images"

// Rintangan
const obstacles = [];
const obstacleWidth = 30;
const obstacleHeight = 40;
const obstacleSpeed = 6;
let spawnTimer = 0;
let score = 0;
let gameOver = false;

// Kontrol lompat
document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !monyet.isJumping && !gameOver) {
    monyet.velocityY = monyet.jumpPower;
    monyet.isJumping = true;
  } else if (gameOver && e.code === "Enter") {
    restartGame();
  }
});

// Loop game
function update() {
  if (gameOver) return;

  // Gravitasi & lompat
  monyet.y += monyet.velocityY;
  monyet.velocityY += monyet.gravity;

  if (monyet.y >= height - 80) {
    monyet.y = height - 80;
    monyet.isJumping = false;
  }

  // Tambah skor
  score++;

  // Spawn rintangan
  spawnTimer++;
  if (spawnTimer > 90) {
    obstacles.push({
      x: width,
      y: height - 70,
      width: obstacleWidth,
      height: obstacleHeight
    });
    spawnTimer = 0;
  }

  // Update posisi rintangan
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacleSpeed;

    // Cek tabrakan
    if (
      monyet.x < obstacles[i].x + obstacles[i].width &&
      monyet.x + monyet.width > obstacles[i].x &&
      monyet.y < obstacles[i].y + obstacles[i].height &&
      monyet.y + monyet.height > obstacles[i].y
    ) {
      gameOver = true;
    }
  }

  draw();
  requestAnimationFrame(update);
}

// Gambar semua
function draw() {
  ctx.clearRect(0, 0, width, height);

  // Gambar monyet
  ctx.drawImage(monyet.image, monyet.x, monyet.y, monyet.width, monyet.height);
  monyet.image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-YdVIcwJXspWXupaUwmAyyNNLWq1CvK50A&s";


  // Gambar rintangan
  ctx.fillStyle = "brown";
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }

  // Gambar skor
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);

  // Game over
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", width / 2 - 90, height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Tekan ENTER atau klik tombol", width / 2 - 120, height / 2 + 30);
  
    // Tampilkan tombol restart
    document.getElementById("restartBtn").style.display = "block";
  } else {
    document.getElementById("restartBtn").style.display = "none";
  }
  ;
  }

// Restart game
function restartGame() {
  obstacles.length = 0;
  monyet.y = height - 80;
  monyet.velocityY = 0;
  score = 0;
  spawnTimer = 0;
  gameOver = false;
  update();
}

update();

monyet.width = 40;
monyet.height = 40;


document.getElementById("jumpBtn").addEventListener("click", function () {
    if (!monyet.isJumping && !gameOver) {
      monyet.velocityY = monyet.jumpPower;
      monyet.isJumping = true;
    }
  });
  
  document.getElementById("restartBtn").addEventListener("click", function () {
    restartGame();
  });

document.addEventListener


  

