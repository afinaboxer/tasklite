const now = new Date()
console.log(now.toLocaleString)

const day = now.getDate()
const month = now.getMonth() + 1
const year = now.getFullYear()

const hours = now.getHours()
const minutes = now.getMinutes()
const seconds = now.getSeconds()

console.log(`${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`)

const items = [
    {id: 1, value: 'a'},
    {id: 2, value: 'b'}
]

const obj = items.reduce((acc, item) =>{
    acc[item.id] = item.value
    return acc
}, {})

console.log(obj)