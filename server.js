import express from "express";
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";


const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true
    }
});


const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => { res.send('Success!') });

app.post('/signin', handleSignIn(db, bcrypt));

app.post('/register', handleRegister(db, bcrypt));

app.get('/profile/:id', handleProfileGet(db));

app.put('/image', handleImage(db));

app.post('/imageURL', (req, res) => { handleApiCall(req, res) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

