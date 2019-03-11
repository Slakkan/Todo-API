const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {authenticate} = require('./middleware/authenticate')

const app = express()

app.use(bodyParser.json())

app.post('/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) =>{
        res.status(400).send(e)
    })
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e)
    })
})

// GET /todos/123465
app.get('/todos/:id', (req, res) =>{
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        return res.status(400).send()
    })
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

app.post('/users', (req,res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body)

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/users/login', (req,res) =>{
    const body = _.pick(req.body, ['email', 'password'])

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((e) => {
        res.status(400).send()
    })
})

app.delete('/users/me/token', authenticate, (req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }, () => {
        res.status(500).send()
    })
})

app.listen (3000, () => {
    console.log('Started on port 3000')
})

module.exports = {app}