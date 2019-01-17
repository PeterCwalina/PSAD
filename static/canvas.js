'use strict';

/*
 * This file assumes that static/maze.js is imported
 * in the same context
*/

// Draw the canvas and set some contexts
let canvas = document.getElementById('maze');
let ctx = canvas.getContext('2d');

// Set some canvas stats
let width = canvas.width;
let height = canvas.height;
let rect_width = width / MAX_X;
let rect_height = height / MAX_Y;

// Declare playerX and playerY
var playerX;
var playerY;

// Create a maze
let m = gen_maze();

// Draws the maze to the canvas
var drawMaze = () => {
    var result = "";
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    // Set canvas color to black
    ctx.fillStyle = 'black';
    // Draw walls and path
    for (var y = 0; y < MAX_Y; y++) {
        for (var x = 0; x < MAX_X; x++) {
            if (contains(m.maze, [x, y])) {
                // Draw path
            } else {
                // Draw wall
                ctx.fillRect(
                    x * rect_width, y * rect_height, rect_width, rect_height,
                );
            }
        }
    }
    // Draw end
    let [endX, endY] = m.end;
    ctx.fillStyle = 'red';
    ctx.fillRect(
        endX * rect_width, endY * rect_height, rect_width, rect_height,
    );
    // Set playerX and playerY to start
    [playerX, playerY] = m.start;
};

// Call drawMaze;
drawMaze(m);

// Draws the player on the canvas
var drawPlayer = () => {
    ctx.fillStyle = 'green';
    ctx.fillRect(
        playerX * rect_width, playerY * rect_height, rect_width, rect_height,
    );
};

// Initial drawing of player
drawPlayer();

// Moves and redraws the player
var move = (x, y) => {
    // Check if winning move
    if (playerX+x === m.end[0] && playerY+y === m.end[1]) {
        // Send the player to /win
        location.href = '/win';
    }
    // Check if legal move
    if (contains(m.maze, [playerX+x, playerY+y])) {
        // Undraw player
        ctx.clearRect(
            playerX * rect_width,
            playerY * rect_height,
            rect_width,
            rect_height,
        );
        // Move player
        playerX += x;
        playerY += y;
        // Redraw player
        drawPlayer();
    }
};

// Keypress handling
this.addEventListener('keypress', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') { // Left arrow or `a`
        move(-1, 0);
    } else if (e.key === 'ArrowUp' || e.key === 'w') { // Up arrow or `w`
        move(0, -1);
    } else if (e.key === 'ArrowRight' || e.key === 'd') { // Right arrow or `d`
        move(1, 0);
    } else if (e.key === 'ArrowDown' || e.key === 's') { // Down arrow or `s`
        move(0, 1);
    }
});
