var but = document.getElementById('but')

const WALL = "#"
const PATH = "-"
const PLAYER = "P"
const START = "S"
const END = "E"
const BLOCK = "B"
var facing = 'down'
var is3 = true

var game = [
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL],
    [WALL, WALL, WALL, PATH, WALL, PATH, WALL, WALL, WALL, WALL, WALL],
    [WALL, PATH, WALL, PATH, WALL, WALL, WALL, PATH, PATH, PATH, WALL],
    [WALL, PATH, WALL, PATH, PATH, WALL, PATH, WALL, PATH, WALL, WALL],
    [WALL, PATH, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, WALL],
    [WALL, PATH, PATH, WALL, PATH, PATH, PATH, PATH,PATH, WALL, WALL],
    [WALL, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL],
    [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL],
    [WALL, WALL, PATH, WALL, PLAYER, WALL, WALL, WALL, PATH, WALL, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
]
const array = []
array.push(WALL)
array.push(PLAYER)
array.push(START)
array.push(END)
array.push(PATH)
console.log(gen_maze())

var gen = function() {
    var col = []
    var g = gen_maze()
    var tmp = []
    for (i = 0; i < g.length; i++) {
        if (g.charAt(i) == WALL) {
            tmp.push(WALL)
            continue
        }
        if (g.charAt(i) == PATH) {
            tmp.push(PATH)
            continue
        }
        if (g.charAt(i) == '\n') {
            col.push(tmp)
            tmp = []
        }
    }
    col[col.length - 1][col[col.length - 1].indexOf(PATH)] = PLAYER
    tmp = col[0]
    let index = tmp.reverse().indexOf(PATH) // will be used for END
    tmp = []
    for (i = 0; i < col.length; i++) {
        tmp.push(WALL)
    }
    col.push(tmp)
    col.unshift(tmp)
    let t = col.length
    for (i = 1; i < t; i++) {
        col[i].push(WALL)
        console.log(col)
        col[i].unshift(WALL)
    }
    return col
}

var blockers = function block(num) {
    if (isNaN(num)) { return false }
    var count = 0
    while (count < num) {
        for (let i = 0; i < game.length; i++) {
            let r = rand(100)
            if (r <= 25) {
                let index = game[i].findIndex(function(a) { return a == PATH })
                if (index < 0) {

                }else{
                    game[i][index] = BLOCK
                    console.log(`Changed game[${i}][${index}] to blocker: ${game[i][index]}`)
                    count = count + 1
                }
            }
        }
    }
    console.log(game)
    return true
}
game = gen()  
var print_maze = function prin() { // color: #6290C3
    var id = 'test'
    for (i = 0; i < game.length; i++) {
        let og = document.getElementById(id)
        var child = og.appendChild(document.createElement('p'))
        for (w = 0; w < game[0].length; w++) {
            child.innerHTML = child.innerHTML + `\t${game[i][w]}\t`
        }
        child.id = `test${i}`
        id = child.id
    }
}  

function p() {
    var id = 'test'
    for (i = 0; i < game.length; i++) {
        let og = document.getElementById(id)
        for (w = 0; w < game[0].length; w++) {
            child = og.appendChild(document.createElement('img'))
            if (game[i][w] == WALL) {
                child.srcset = "static/images/pexels-photo-207142.jpg"
                child.width = 48
                child.height = 48
                //console.log(`This is the source: ${child.src}`)
            }
            if (game[i][w] == PATH) {
                child.srcset = "static/images/diamond_path.jpg"
                child.width = 48
                child.height = 48
            }
            if (game[i][w] == PLAYER) {
                // console.log("Got here")
                if (facing == 'up') {
                    child.srcset = "static/images/steve_back.jpg"
                }else if (facing == 'down') {
                    child.srcset = "static/images/steve_front.jpg"
                }else if (facing == 'left') {
                    child.srcset = "static/images/steve_left.jpg"
                }else{
                    child.srcset = "static/images/steve_right.jpg"
                }
                // console.log(`Child has src of : ${child.src}`)
                child.width = 48
                child.height = 48
            }
            if (game[i][w] == BLOCK) {
                child.srcset = "static/images/blocker.png"
                child.width = 48
                child.height = 48
            }
        }
        og = og.appendChild(document.createElement('br'))
    }
    return true
}

function print() { // shows the 3x3 area around the player
    var loc = []
    for (i = 0; i < game.length; i++) {
        a = game[i].findIndex(function(a) { return a == PLAYER })
        if (a != -1) {
            loc.push(i)
            loc.push(a)
            break;
        }
    }
    var id = 'test'
    for (i = loc[0] - 1; i <= loc[0] + 1; i++) {
        let og = document.getElementById(id)
        for (w = loc[1] - 1; w <= loc[1] + 1; w++) {
            child = og.appendChild(document.createElement('img'))
            if (game[i][w] == WALL) {
                child.srcset = "static/images/pexels-photo-207142.jpg"
                child.width = 75
                child.height = 75
                //console.log(`This is the source: ${child.src}`)
            }
            if (game[i][w] == PATH) {
                child.srcset = "static/images/diamond_path.jpg"
                child.width = 75
                child.height = 75
            }
            if (game[i][w] == PLAYER) {
                // console.log("Got here")
                if (facing == 'up') {
                    child.srcset = "static/images/steve_back.jpg"
                }else if (facing == 'down') {
                    child.srcset = "static/images/steve_front.jpg"
                }else if (facing == 'left') {
                    child.srcset = "static/images/steve_left.jpg"
                }else{
                    child.srcset = "static/images/steve_right.jpg"
                }
                // console.log(`Child has src of : ${child.src}`)
                child.width = 75
                child.height = 75
            }
            if (game[i][w] == BLOCK) {
                child.srcset = "static/images/blocker.png"
                child.width = 75
                child.height = 75
            }
        }
        og = og.appendChild(document.createElement('br'))
        }
    return true
}

var random = function(n) {
    return Number.parseInt(Math.random()*n)
}

var game_arr = new Array(5)
for (i = 0; i < 5; i++) {
    game_arr[i] = new Array(5)
}

//gen(5,5)

function checkKey(e) {
    e = e || window.event
    player_location = []
    console.log(e.keyCode)
    for (i = 0; i < game.length; i++) {
        a = game[i].findIndex(function(a) { return a == PLAYER })
        if (a != -1) {
            player_location.push(i)
            player_location.push(a)
            break;
        }
    }
    if (player_location.length < 2) {
        console.log("err with p location")
        return
    }
    if (e.keyCode == '65') { // A key
        var wait = game[player_location[0]][player_location[1] - 1]
        if (wait == WALL) { return }
        if (wait == BLOCK) { /* save in data base here */ window.location.href = "/" }
        game[player_location[0]][player_location[1] - 1] = PLAYER
        game[player_location[0]][player_location[1]] = PATH
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        facing = 'left'
        if (is3) {print() }else{ p() }
    }
    else if (e.keyCode == '68') { // D key
        var wait = game[player_location[0]][player_location[1] + 1]
        if (wait == WALL) { return }
        if (wait == BLOCK) { /* save in data base here */ window.location.href = "/" }
        game[player_location[0]][player_location[1] + 1] = PLAYER
        game[player_location[0]][player_location[1]] = PATH
        console.log("WOOOO")
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        facing = 'right'
        if (is3) {print() }else{ p() }
    }
    else if (e.keyCode == '87') { // W key
        var wait = game[player_location[0] - 1][player_location[1]]
        if (wait == WALL) { return }
        if (wait == BLOCK) { /* save in data base here */ window.location.href = "/" }
        game[player_location[0] - 1][player_location[1]] = PLAYER
        game[player_location[0]][player_location[1]] = PATH
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        facing = 'up'
        if (is3) {print() }else{ p() }
    }
    else if (e.keyCode == '83') { // S key
        var wait = game[player_location[0] + 1][player_location[1]]
        if (wait == WALL) { return }
        if (wait == BLOCK) { /* save in data base here */ window.location.href = "/" }
        game[player_location[0] + 1][player_location[1]] = PLAYER
        game[player_location[0]][player_location[1]] = PATH
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        facing = 'down'
        if (is3) {print() }else{ p() }
    }
}
var g = document.getElementById('g')
g.addEventListener('click', function() {
    // print()
    var breaks = document.getElementsByTagName('br')
    var col = document.getElementsByTagName('img')
    for (i = col.length - 1; i >= 0; i--) {
        col[i].remove()
    }
    for (i = breaks.length - 1; i > -1; i--) {
        breaks[i].remove()
    }
    game = gen()
    blockers(5)
    if (is3) {print() }else{ p() }
    //g.disabled = true
})

document.addEventListener('keydown', function(e) {
    checkKey(e)
    console.log(`games: ${document.getElementsByTagName('img')}`)
    //window.location.reload()
})

but.addEventListener('click', function() {
    is3 = !is3
    var breaks = document.getElementsByTagName('br')
    var col = document.getElementsByTagName('img')
    for (i = col.length - 1; i >= 0; i--) {
        col[i].remove()
    }
    for (i = breaks.length - 1; i > -1; i--) {
        breaks[i].remove()
    }
    if (is3) {
        print()
    }else{
        p()
    }
})