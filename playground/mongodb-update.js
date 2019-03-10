const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    db.collection('Todos').findOneAndUpdate(
        {
            _id: new ObjectID("5c84476b80a5937899daed75")
        },
        {
            $set: {
                completed: true
            }
        },
        {
            returnOriginal: false
        }).then((result) => {
            console.log(result)
        })

    //client.close()
})