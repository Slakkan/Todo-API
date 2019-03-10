const bcrypt = require('bcrypt')

const password = '123abc!'

/* bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(password, salt, (err, hash) =>{
        console.log(hash)
    })
})*/
const hashedPassword = '$2b$10$F1IZRNG4m93LXvcKEs/QTe1ec8bISbA18xYO.3OX.WpBNlKaNTNmW'

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res)
})

/* const jwt = require('jsonwebtoken')

const data = {
    id:10
}

const token = jwt.sign(data, 'seed123')
console.log(token)

const decoded = jwt.verify(token, 'seed123')
console.log('Decoded: ', decoded)
 */
/* const {SHA256} = require('crypto-js')

const message = 'I am user number 3'
const hash = SHA256(message).toString()

console.log(`Message: ${message}`)
console.log(`Hash: ${hash}`)

const data = {
    id: 4
}

const token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecretseed').toString()
}

token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()

const resultHash = SHA256(JSON.stringify(token.data) + 'somesecretseed').toString()
if (resultHash === token.hash) {
    console.log('Data was not changed')
}
else {
    console.log('Data was changed. Do not trust')
} */