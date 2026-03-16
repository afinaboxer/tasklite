const now = new Date()
console.log(now.toLocaleString)

const day = now.getDate()
const month = now.getMonth() + 1
const year = now.getFullYear()

const hours = now.getHours()
const minutes = now.getMinutes()
const seconds = now.getSeconds()

console.log(`${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`)

