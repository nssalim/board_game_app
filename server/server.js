const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const mongouriDEV = 'mongodb://localhost:27017';
MongoClient.connect(mongouriDEV, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('board_game');
        const usersCollection = db.collection('users');
        const usersRoute = createRouter(usersCollection);
        app.use('/api/users', usersRoute);
        const server = app.listen(process.env.PORT || 5000, function() {
            console.log(`Server's app on port ${this.address().port}`);
        });
        
        require('./repositories/rooms').initRooms();
        require('./repositories/users').initUsers();
        const io = require('./socket.io/socket').init(server);
        require('./socket.io/setting_up_socket')(io, usersCollection);
    })
    .catch(console.error);


