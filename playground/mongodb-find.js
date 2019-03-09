const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')
    
/*     db.collection('Todos').find({_id: new ObjectID('5c843430ecc35127acb8b5e2')}).toArray().then((docs) => {
        console.log('Todos')
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to fetch todos', err)
    })
 */

/*     db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count ${count}`)
    }, (err) => {
        console.log('Unable to fetch todos', err)
    }) */

    db.collection('Users').find({name: 'Lisandro'}).count().then((count) => {
        console.log(`There are ${count} users named Lisandro`)
    }, (err) => {
        console.log('Unable to fetch todos', err)
    })

    //client.close()
})