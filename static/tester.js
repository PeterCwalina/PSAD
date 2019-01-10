var ref = document.getElementById('name')

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
var show = function test(e) {
    console.log(e['target'])
    ref.innerHTML = scramble(ref.innerHTML)
}

ref.addEventListener('mouseover', show)