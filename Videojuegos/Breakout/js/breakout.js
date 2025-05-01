/*
 * Breakout juego
 *
 * Isabela Valls
 * 2025-Apr-30
 */
"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;
// The game object
let game;
// Variable to store the times for the frames
let oldTime;

// Clases for the Breakout game
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.reset();
    }

    update(deltaTime) {
         // Update the position using a constant velocity
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
        let angle = Math.random() * Math.PI / 3 + Math.PI / 6;
        this.velocity = new Vec(Math.cos(angle), -Math.sin(angle)).times(0.4);
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight - 60);
        this.velocity = new Vec(0, 0);
    }
}

class BombBall extends GameObject {
    constructor(position, radius, speed) {
        super(position, radius, radius, "black", "bomb");
        this.velocity = new Vec(0, speed);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0, 0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > canvasWidth)
            this.position.x = canvasWidth - this.width;
    }
}

// Class that controls all the objects in the game
class Game {
    constructor() {
        // Ball that will be for the breakout game
        this.ball = new Ball(new Vec(canvasWidth / 2, canvasHeight - 60), 15, 15, "red");
        // The paddle that will be controlled by the player
        this.paddle = new Paddle(new Vec(canvasWidth / 2 - 50, canvasHeight - 30), 100, 20, "black");
        // The blocks that will be destroyed by the player
        this.blocks = [];
        this.rows = 5;
        this.columns = 8;
        this.createBlocks();

        // The destroy blocks counter 
        this.destroyedCount = 0;
        this.speedLevel = 0;
        // Total lifes of player 
        this.lives = 3;
        this.scoreLabel = new TextLabel(20, 30, "20px Arial", "black");
        this.livesLabel = new TextLabel(20, 60, "20px Arial", "black");

        // The bombs for the breakout room
        this.bombs = [];
        this.bombsActivated = false;
        this.lastBombDrop = 0;

        this.createEventListeners();
    }

    createBlocks() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                const x = 60 + col * 85;
                const y = 60 + row * 30;
                this.blocks.push(new Block(new Vec(x, y), 80, 20, getRandomColor()));
            }
        }
    }

    update(deltaTime) {
        this.paddle.update(deltaTime);
        if (this.ball.inPlay) this.ball.update(deltaTime);

        // Collisions
        if (boxOverlap(this.ball, this.paddle)) {
            this.ball.velocity.y *= -1;
            this.ball.position.y = this.paddle.position.y - this.ball.height;
        }

        if (this.ball.position.x < 0 || this.ball.position.x + this.ball.width > canvasWidth) {
            this.ball.velocity.x *= -1;
        }

        if (this.ball.position.y < 0) {
            this.ball.velocity.y *= -1;
        }

        this.blocks.forEach(block => {
            if (!block.destroyed && boxOverlap(this.ball, block)) {
                block.destroyed = true;
                this.ball.velocity.y *= -1;
                this.destroyedCount++;

                const newLevel = Math.floor(this.destroyedCount / 10);
                if (newLevel > this.speedLevel) {
                    this.ball.velocity = this.ball.velocity.times(1.5);
                    this.speedLevel = newLevel;
                }
            }
        });

        // Activate bombs if 10 blocks are left 
        if (!this.bombsActivated && this.blocks.length - this.destroyedCount <= 10) {
            this.bombsActivated = true;
            this.lastBombDrop = performance.now();
        }

        // Drop a bomb every 2 seconds
        if (this.bombsActivated && performance.now() - this.lastBombDrop >= 2000) {
            this.dropBomb();
            this.lastBombDrop = performance.now();
        }

        // update bombs 
        this.bombs.forEach(bomb => bomb.update(deltaTime));

        // bomb paddle Collisions
        this.bombs.forEach(bomb => {
            if (boxOverlap(bomb, this.paddle)) {
                this.lives--;
                bomb.position.y = canvasHeight + 100;
                if (this.lives <= 0) {
                    alert("💣 GAME OVER");
                    this.resetGame();
                }
            }
        });

        // Lose life if ball lost
        if (this.ball.position.y > canvasHeight) {
            this.lives--;
            if (this.lives === 0) {
                alert("GAME OVER");
                this.resetGame();
            } else {
                this.ball.reset();
            }
        }

        // Win
        if (this.destroyedCount === this.blocks.length) {
            alert("¡Ganaste!");
            this.resetGame();
        }
    }

    draw(ctx) {
        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.blocks.forEach(b => b.draw(ctx));
        this.bombs.forEach(bomb => bomb.draw(ctx));
        this.scoreLabel.draw(ctx, `Bloques: ${this.destroyedCount}`);
        this.livesLabel.draw(ctx, `Vidas: ${this.lives}`);
    }

    dropBomb() {
        const x = 100 + Math.random() * (canvasWidth - 200);
        this.bombs.push(new BombBall(new Vec(x, -30), 20, 0.25));
    }

    resetGame() {
        this.destroyedCount = 0;
        this.lives = 3;
        this.speedLevel = 0;
        this.blocks = [];
        this.bombs = [];
        this.bombsActivated = false;
        this.createBlocks();
        this.ball.reset();
    }

    createEventListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.paddle.velocity = new Vec(-1.0, 0);
            else if (e.key === 'ArrowRight') this.paddle.velocity = new Vec(1.0, 0);
            else if (e.key === ' ' && !this.ball.inPlay) this.ball.initVelocity();
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.paddle.velocity = new Vec(0, 0);
            }
        });
    }
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');
    game = new Game();
    drawScene(0);
}

function drawScene(newTime) {
    if (oldTime === undefined) oldTime = newTime;
    let deltaTime = newTime - oldTime;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);
    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
