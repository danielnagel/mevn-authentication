import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from './config';
import messages from './db/messages';
import users from './db/users';

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold the MEVN Stack!',
    });
});

app.get('/messages', (req, res) => {
    messages.getAll().then(messages => {
        res.json(messages);
    });
});

app.post('/messages', (req, res) => {
    messages
        .create(req.body)
        .then(message => {
            res.json(message);
        })
        .catch(error => {
            res.status(500);
            res.json(error);
        });
});

app.post('/register', (req, res) => {
    users
        .create(req.body)
        .then(user => {
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400, // 24h
            });
            res.json({ auth: true, token: token, user: user });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

app.post('/login', (req, res) => {
    users
        .getByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).send('No user found.');
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400, // 24h
            });
            res.json({ auth: true, token: token, user: user });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

export default app;
