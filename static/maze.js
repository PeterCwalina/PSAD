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

var remove = (s, e) => {
    var l = [];
    for (var i of s) {
        if (e[0] != i[0] || e[1] != i[1]) {
            l.push(i);
        }
    }
    return new Set(l);
}

const MAX_X = 25;
const MAX_Y = 25;

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

var dead_end = (maze, [x, y]) => {
    // [x, y] must be in the maze
    if (!contains(maze, [x, y])) {
        return false;
    }
    // Represents the number of connecting paths
    var count = 0;
    // Left path
    if (contains(maze, [x-1, y])) {
        count += 1;
    }
    // Up path
    if (contains(maze, [x, y-1])) {
        count += 1;
    }
    // Right path
    if (contains(maze, [x+1, y])) {
        count += 1;
    }
    // Down path
    if (contains(maze, [x, y+1])) {
        count += 1;
    }
    console.log(count);
    // Only one connecting path
    return count === 1;
}

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
    // Find end
    let end_x = MAX_X - 1;
    var end_y;
    let offset = rand(MAX_Y);
    console.log('offset', offset);
    for (var y = 0; y < MAX_Y; y++) {
        let offset_y = (y+offset) % MAX_Y
        if (dead_end(maze, [end_x, offset_y])) {
            end_y = offset_y;
            break;
        }
    }
    return {
        maze: maze,
        start: start,
        end: [end_x, end_y],
    };
};

