var ref = document.getElementById('name')
var but = document.getElementById('but')

const WALL = "#"
const PATH = "-"
const PLAYER = "P"
const START = "S"
const END = "E"

const array = []
array.push(WALL)
array.push(PLAYER)
array.push(START)
array.push(END)
array.push(PATH)
var gen = function make_maze(length, width) {
    var x = new Array(length)
    for (i = 0; i < width; i++) {
        x[i] = new Array(width)
    }
    maze(x)
    // console.log(x)
    var L = ""
    for (i = 0; i < width; i++) {
        var s = ""
        for (w = 0; w < length; w++) {
            s += x[i][w]
        }
        console.log(s)
        L = L + '\t' + s
        console.log(`this is L: ${L}`)
    }
    console.log(`full L: ${L}`)
    return L
}

var maze = function mazer(arr) {
    var player_used = false
    var start = false
    var end = false
    for (i = 0; i < arr.length; i++) {
        for (w = 0; w < arr[0].length; w++) {
            let rand = random(5)
            while(player_used == true && array[rand] == "P" ||
                start == true && array[rand] == "S" || 
                end == true && array[rand] == "E") {
                    rand = random(5)
                }
                if (array[rand] == "P") {
                    player_used = true
                }else{
                    if (array[rand] == "S") {
                        start = true
                    }else{
                        if (array[rand] == "E") {
                            end = true
                        }
                    }
                }
            arr[i][w] = array[rand]
        }
    }
    return arr
}

var random = function(n) {
    return Number.parseInt(Math.random()*n)
}
var scramble = function(string, use_string) {
    let size = string.length
    if (size < 1) {
        return string
    }
    if (use_string == null) {
        let arr = []
        let i = 0
        for (; i < size; i++) {
            arr.push(string.charAt(i))
            // console.log(`pushing ${arr[i]}`)
        }
        for (i = 0; i < arr.length; i++) {
            console.log(arr.length)
            let a = Number.parseInt(Math.random() * arr.length - 1)
            let b = Number.parseInt(Math.random() * arr.length - 1)
            let prev = arr[b]
            // console.log(`a: ${a} arr[a]: ${arr[a]} arr[b]: ${arr[b]} prev: ${prev}`)
            // console.log(arr[b])
            arr[a] = arr[b]
            // console.log(arr[a])
            arr[b] = prev
        }
        return arr.join('')
    }else{
        let arr = []
        for (i in string) {
            arr.push(i)
        }
    }
}

var game_arr = new Array(5)
for (i = 0; i < 5; i++) {
    game_arr[i] = new Array(5)
}

gen(5,5)

var show = function test(e) {
    console.log(e['target'])
    ref.innerHTML = scramble(ref.innerHTML)
}

ref.addEventListener('mouseover', show)
but.addEventListener('click', function() {
    let thing = document.getElementById('test')
    var arr = gen(6,6).split('\t').reverse()
    for (i = 0; i < arr.length; i ++) {
        let child = thing.appendChild(document.createElement('p'))
        child.innerHTML = arr[i]
    }
})