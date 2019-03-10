const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const id = '5c853074b7429f21cc3184af11'

if(!ObjectID.isValid(id)) {
    console.log('ID not valid')
}


Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('id not found')
    }
    console.log('Todo by id', todo)
}).catch((e) => console.log(e))

User.findById('5c846ddfa4d3821294eefdfa').then((user) => {
    if (!user) {
        return console.log('Unable to find user')
    }

    console.log(JSON.stringify(user, undefined, 2))
}, (e) => {
    console.log(e)
})