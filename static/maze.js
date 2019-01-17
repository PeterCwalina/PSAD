var rand = (n) => Math.floor(Math.random() * n);

var choice = (s) => Array.from(s)[rand(s.size)];

var point_equal = (p1, p2) => p1[0] === p2[0] && p1[1] === p2[1];

var contains = (s, e) => {
    for (i of s) {
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

var gen_maze = () => {
    var grid = new Set();
    for (let i = 0; i < MAX_X; i++) {
        for (let j = 0; j < MAX_Y; j++) {
            grid.add([i, j]);
        }
    }
    var maze = new Set();
    cell = [0, rand(MAX_Y)];
    var visited = new Set();
    visited.add(cell);
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
        for (c of surrounding) {
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
    for (var x = 0; x < MAX_X; x++) {
        for (var y = 0; y < MAX_Y; y++) {
            if (contains(maze, [x, y])) {
                result += '-';
            } else {
                result += '#';
            }
        }
        result += '\n';
    }
    console.log(result);
    return result;
};

gen_maze();

