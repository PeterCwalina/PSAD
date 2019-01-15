var but = document.getElementById('but')

const WALL = "#"
const PATH = "-"
const PLAYER = "P"
const START = "S"
const END = "E"
const TEST = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi2lq_9j_DfAhXqct8KHeS3A9MQjRx6BAgBEAU&url=%2Furl%3Fsa%3Di%26rct%3Dj%26q%3D%26esrc%3Ds%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Funsplash.com%252Fsearch%252Fphotos%252Fbrick-wall%26psig%3DAOvVaw2yxfkPVBlRHIPieLJ563CD%26ust%3D1547653301702374&psig=AOvVaw2yxfkPVBlRHIPieLJ563CD&ust=1547653301702374"

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
                child.srcset = "static/pexels-photo-207142.jpg"
                child.width = 49
                child.height = 49
                //console.log(`This is the source: ${child.src}`)
            }
            if (game[i][w] == PATH) {
                child.srcset = "static/diamond_path.jpg"
                child.width = 49
                child.height = 49
            }
            if (game[i][w] == PLAYER) {
                console.log("Got here")
                child.srcset = "static/steve.jpg"
                console.log(`Child has src of : ${child.src}`)
                child.width = 49
                child.height = 49
            }
        }
        og = og.appendChild(document.createElement('br'))
    }
    return true
}

function print() { // shows the 3x3 area around the player
    var id = 'test'
    var loc = []
    for (i = 0; i < game.length; i++) {
        a = game[i].findIndex(function(a) { return a == PLAYER })
        if (a != -1) {
            loc.push(i)
            loc.push(a)
            break;
        }
    }
    for (i = loc[0] - 1; i <= loc[0] + 1; i++) {
        var og = document.getElementById(id)
        for (w = loc[1] - 1; w <= loc[1] + 1; w++) {
            console.log(`i: ${i} w: ${w}`)
            var child = og.appendChild(document.createElement('img'))
            console.log(`game[i][w]: ${game[i][w]}`)
            if (game[i][w] == WALL) {
                console.log("Got here")
                child.srcset = "static/pexels-photo-207142.jpg"
                child.width = 75
                child.height = 75
            }
            if (game[i][w] == PLAYER) {
                child.srcset = "static/steve.jpg"
                child.width = 75
                child.height = 75
            }
            if (game[i][w] == PATH) {
                child.srcset = "static/diamond_path.jpg"
                child.width = 75
                child.height = 75
            }
            og = og.appendChild(document.createElement('br'))
        }
    }
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
    if (e.keyCode == '37') { // up arrow
        var wait = game[player_location[0]][player_location[1] - 1]
        if (wait == WALL) {
            return
        }
        game[player_location[0]][player_location[1] - 1] = PLAYER
        game[player_location[0]][player_location[1]] = wait
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        p()
        
    }
    else if (e.keyCode == '39') { // down arrow
        var wait = game[player_location[0]][player_location[1] + 1]
        if (wait == WALL) { return }
        game[player_location[0]][player_location[1] + 1] = PLAYER
        game[player_location[0]][player_location[1]] = wait
        console.log("WOOOO")
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        p()
    }
    else if (e.keyCode == '38') { // left arrow
        var wait = game[player_location[0] - 1][player_location[1]]
        if (wait == WALL) { return }
        game[player_location[0] - 1][player_location[1]] = PLAYER
        game[player_location[0]][player_location[1]] = wait
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        p()
    }
    else if (e.keyCode == '40') { // right arrow
        var wait = game[player_location[0] + 1][player_location[1]]
        if (wait == WALL) { return }
        game[player_location[0] + 1][player_location[1]] = PLAYER
        game[player_location[0]][player_location[1]] = wait
        var breaks = document.getElementsByTagName('br')
        var col = document.getElementsByTagName('img')
        for (i = col.length - 1; i >= 0; i--) {
            col[i].remove()
        }
        for (i = breaks.length - 1; i > -1; i--) {
            breaks[i].remove()
        }
        p()
    }
}
var g = document.getElementById('g')
g.addEventListener('click', function() {
    // print()
    p()
    //g.disabled = true
})

document.addEventListener('keydown', function(e) {
    checkKey(e)
    console.log(`games: ${document.getElementsByTagName('img')}`)
    //window.location.reload()
})
