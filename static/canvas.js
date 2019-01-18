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

// Create wiki blockers
var genBlockers = () => {
    var b = new Set();
    for (var i = 0; i < 5; i++) {
        let x = choice(m.maze);
        if (m.start[0] === x[0] && m.start[1] === x[1] ||
            m.end[0] === x[0] && m.end[1] === x[1]) {
            continue;
        }
        b.add(x);
    }
    return b;
};

// Draws the maze to the canvas
var drawMaze = () => {
    // Draw walls and path
    for (var y = 0; y < MAX_Y; y++) {
        for (var x = 0; x < MAX_X; x++) {
            if (contains(blockers, [x, y])) {
                // Set canvas color to black
                ctx.fillStyle = 'blue';
                // Draw wall
                ctx.fillRect(
                    x * rect_width, y * rect_height, rect_width, rect_height,
                );
            }
            if (contains(m.maze, [x, y])) {
                // Draw path
            } else {
                // Set canvas color to black
                ctx.fillStyle = 'black';
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
};

// Draws the player on the canvas
var drawPlayer = () => {
    ctx.fillStyle = 'green';
    ctx.fillRect(
        playerX * rect_width, playerY * rect_height, rect_width, rect_height,
    );
};

// Draw mask (modified StackOverflow code)
var drawMask = (x, y, r) => {
    // Create a canvas that we will use as a mask
    var maskCanvas = document.createElement('canvas');

    // Ensure same dimensions
    maskCanvas.width = width;
    maskCanvas.height = height;
    var maskCtx = maskCanvas.getContext('2d');

    // This color is the one of the filled shape
    maskCtx.fillStyle = 'grey';
    // Fill the mask
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    // Set xor operation
    maskCtx.globalCompositeOperation = 'xor';
    // Draw the shape you want to take out
    maskCtx.arc(x, y, r, 0, 2 * Math.PI);
    maskCtx.fill();

    // Draw mask on the image, and done
    ctx.drawImage(maskCanvas, 0, 0);
};

// Draw fog around player
var drawFog = () => drawMask(
    playerX * rect_width + rect_width / 2,
    playerY * rect_height + rect_height / 2,
    100,
);

// Creates a post request to `url` with `data`
var redirectPost = (url, data) => {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;
    for (var name in data) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = data[name];
        form.appendChild(input);
    }
    form.submit();
};

// Draw all elements
var drawAll = () => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    // Call drawMaze;
    drawMaze();
    // Initial drawing of player
    drawPlayer();
    // Draw initial fog
    drawFog();
};

// Moves and redraws the player
var move = (x, y) => {
    // Check if winning move
    if (playerX+x === m.end[0] && playerY+y === m.end[1]) {
        // Send the player to /win
        location.href = '/win';
    }
    // Check if blocking move
    if (contains(blockers, [playerX+x, playerY+y])) {
        // Remove blocker
        blockers = remove(blockers, [playerX+x, playerY+y]);
        // Send the player to /StartWiki
        redirectPost(
            '/StartWiki',
            {
                maze: JSON.stringify(Array.from(m.maze)),
                start: JSON.stringify(m.start),
                end: JSON.stringify(m.end),
                blockers: JSON.stringify(Array.from(blockers)),
                x: playerX+x,
                y: playerY+y,
            },
        );
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
        // Redraw everything
        drawAll();
    }
};

var begin = () => {
    // Set variables if not already set
    // Create a maze
    m = m || gen_maze();
    // Set playerX and playerY to start
    playerX = playerX || m.start[0];
    playerY = playerY || m.start[1];
    // Blockers
    blockers = blockers || genBlockers();
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

