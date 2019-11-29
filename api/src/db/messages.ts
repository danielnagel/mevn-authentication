import joi from '@hapi/joi';
import db from './connection';

const schema = joi.object().keys({
    username: joi
        .string()
        .alphanum()
        .required(),
    subject: joi.string().required(),
    message: joi
        .string()
        .max(500)
        .required(),
    imageUrl: joi.string().uri({
        scheme: [/https?/],
    }),
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function countAll() {
    return messages.count();
}

function create(message: any) {
    if (!message.username) message.username = 'Anonymous';

    const result = joi.valid(message, schema);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

export default {
    create,
    getAll,
};
