'use strict';

var rand = (n) => Math.floor(Math.random() * n);

var choice = (s) => Array.from(s)[rand(s.size)];

var point_equal = (p1, p2) => p1[0] === p2[0] && p1[1] === p2[1];

var contains = (s, e) => {
    for (var i of s) {
        if (point_equal(i, e)) {
            return true;
        }
    }
    return false;
};

const MAX_X = 10;
const MAX_Y = 10;

var get_walls = (x, y) => {
    var walls = new Set();
    if (x - 1 >= 0) {
        walls.add([x-1, y]);
    }
    if (x + 1 < MAX_X) {
        walls.add([x+1, y]);
    }
    if (y - 1 >= 0) {
        walls.add([x, y-1]);
    }
    if (y + 1 < MAX_Y) {
        walls.add([x, y+1]);
    }
    return walls;
};

var dead_end = (maze, [x, y]) => contains(maze, [x, y]) &&
    (!contains(maze, [x, y+1]) || !contains(maze, [x, y-1]));

var gen_maze = () => {
    var grid = new Set();
    for (let i = 0; i < MAX_X; i++) {
        for (let j = 0; j < MAX_Y; j++) {
            grid.add([i, j]);
        }
    }
    let start = [0, rand(MAX_Y)];
    var cell = start;
    var maze = new Set();
    var visited = new Set();
    visited.add(cell);
    maze.add(cell);
    var walls = get_walls(...cell);
    // console.log(cell);
    // console.log(walls);
    while (walls.size > 0) {
        let wall = choice(walls);
        // console.log("wall", wall);
        let surrounding = get_walls(...wall);
        // console.log("surrounding", surrounding);
        var num_visited = 0;
        // console.log('visited', visited);
        for (var c of surrounding) {
            // console.log('check', visited, c, contains(visited, c));
            if (contains(visited, c)) {
                num_visited += 1;
            }
        }
        // console.log('num_visited', num_visited);
        if (num_visited === 1) {
            maze.add(wall);
            walls = new Set([...walls, ...surrounding]);
        }
        // console.log('visited before', visited);
        visited.add(wall);
        // console.log('visited after', visited);
        walls.delete(wall);
    };
    // Testing
    // console.log(maze);
    var result = "";
    for (var y = 0; y < MAX_Y; y++) {
        for (var x = 0; x < MAX_X; x++) {
            if (contains(maze, [x, y])) {
                result += '-';
            } else {
                result += '#';
            }
        }
        result += '\n';
    }
    console.log(result);
    let end_x = MAX_X - 1;
    var end_y;
    let offset = rand(MAX_Y);
    for (var y = 0; y < MAX_Y; y++) {
        if (dead_end(maze, [end_x, (y+offset) % MAX_Y])) {
            end_y = y;
            break;
        }
    }
    return {
        maze: maze,
        start: start,
        end: [end_x, end_y],
    };
};

let m = gen_maze();
console.log(m.start);
console.log(m.end);

