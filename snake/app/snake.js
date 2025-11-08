// 🖼️ Canvas setup - (variable)
const canvas = document.getElementById('game'); // HTML element-ka canvas
const ctx = canvas.getContext('2d'); // context-ka 2D ah oo sawir lagu sameeyo

// 🧱 Class - (object template)
// Class-kan wuxuu abuuraa qayb kasta oo maska ah isagoo haysta (x,y)
class SnakePart {
    constructor(x, y) {
        this.x = x; // x = booska jiifka
        this.y = y; // y = booska taagan
    }
}

// 📊 Variables - xogta aasaasiga ah ee ciyaarta
let speed = 7; // (number) xawaaraha maska
let tileCount = 20; // (number) tirada blocks ee canvas-ka
let tileSize = canvas.width / tileCount - 2; // (number) cabirka hal block
let headX = 5; // (number) booska maska ee x
let headY = 12; // (number) booska maska ee y

// ⚙️ Variables - jihada uu masku u socdo
let yVelocity = 0; // (number) dhaqdhaqaaqa taagan
let xVelocity = 0; // (number) dhaqdhaqaaqa jiifka

// 🪱 Array - xogta jirka maska
const SnakeParts = []; // (array) wuxuu kaydiyaa qayb kasta oo maska ah
let tailLength = 1; // (number) dhererka maska ee bilowga

// 🍎 Variables - meeshii apple-ku ku yaal
let appleX = 4;
let appleY = 4;

// 🧮 Variables - score iyo cod
let score = 0;
const codkaMaska = new Audio("mas112"); // (object) codka marka uu masku cuno apple

// 🔁 FUNCTION: Game loop-ka ugu weyn
function drawGame() {

    // FUNCTION: beddel booska maska
    changeSnakePosition();

    // FUNCTION: hubi in ciyaartu dhamaatay
    let result = isGameOver();
    if (result) return; // haddii uu dhintay, jooji

    // FUNCTION: nadiifi shaashadda
    clearScreen();

    // FUNCTION: hubi haddii uu masku apple cunay
    checkAppleCollision();

    // FUNCTION: sawir apple-ka iyo maska
    drawApple();
    drawSnake();

    // CONDITION: kordhi xawaaraha marka score-ku bato
    if (score > 2) speed = 12;
    if (score > 5) speed = 16;

    // FUNCTION: sawir score-ka
    drawScore();

    // 🔁 LOOP: dib ugu yeer drawGame (loop game)
    setTimeout(drawGame, 1000 / speed);
}

// ⚰️ FUNCTION: Hubinta dhamaadka ciyaarta
function isGameOver() {
    let gameOver = false; // (boolean)

    // haddii masku weli dhaqaaqin, ciyaartu ma dhama
    if (yVelocity === 0 && xVelocity === 0) return false;

    // CONDITIONS: hubi haddii uu masku baxayo xadka
    if (headX < 0) gameOver = true;
    else if (headX === tileCount) gameOver = true;
    else if (headY < 0) gameOver = true;
    else if (headY === tileCount) gameOver = true;

    // 🔁 LOOP: hubi isku dhac (masku naftiisa taabtay)
    for (let i = 0; i < SnakeParts.length; i++) {
        let part = SnakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    // Haddii uu dhintay, qor “Game Over”
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        // Gradient (object) - midab isku-dar ah
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver; // (boolean)
}

// 🧾 FUNCTION: Sawir score-ka
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score: " + score, canvas.width - 60, 15);
}

// 🧹 FUNCTION: Nadiifi shaashadda
function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 🐍 FUNCTION: Sawir maska iyo madaxiisa
function drawSnake() {
    ctx.fillStyle = 'green';

    // 🔁 LOOP: sawir qayb kasta oo maska ah
    for (let i = 0; i < SnakeParts.length; i++) {
        let part = SnakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    // Array method: ku dar madaxa cusub
    SnakeParts.push(new SnakePart(headX, headY));

    // Haddii uu dhaafay tailLength, ka saar qaybta hore
    while (SnakeParts.length > tailLength) {
        SnakeParts.shift();
    }

    // Madaxa maska (midab kale)
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// ⚙️ FUNCTION: Dhaqaaji maska jihada uu u socdo
function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

// 🍎 FUNCTION: Sawir apple
function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// 💥 FUNCTION: Hubi haddii masku cunay apple
function checkAppleCollision() {
    // CONDITION: haddii madaxa maska = booska apple
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount); // random position cusub
        appleY = Math.floor(Math.random() * tileCount);

        tailLength++; // kordhi dhererka maska
        score++; // kordhi score
        codkaMaska.play(); // ciyaar codka
    }
}

// 🎮 EVENT: Dhageyso keyboard-ka
document.body.addEventListener('keydown', keyDown);

// 🕹️ FUNCTION: Xakamee jihada maska
function keyDown(event) {
    // UP (↑)
    if (event.keyCode == 38) {
        if (yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }

    // DOWN (↓)
    if (event.keyCode == 40) {
        if (yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }

    // LEFT (←)
    if (event.keyCode == 37) {
        if (xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }

    // RIGHT (→)
    if (event.keyCode == 39) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

// 🚀 FUNCTION CALL: Bilow ciyaarta
drawGame();
