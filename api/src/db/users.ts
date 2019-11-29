import joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import db from './connection';

const schema = joi.object().keys({
    username: joi
        .string()
        .alphanum()
        .required(),
    email: joi
        .string()
        .email()
        .required(),
    password: joi.string().required(),
});

const users = db.get('users');

function getByEmail(email: string) {
    return users.findOne({ email });
}

function create(user: any) {
    const result = joi.valid(user, schema);
    if (result.error == null) {
        user.created = new Date();
        user.password = bcrypt.hashSync(user.password, 8);
        return users.insert(user);
    } else {
        return Promise.reject(result.error);
    }
}

export default {
    create,
    getByEmail,
};
