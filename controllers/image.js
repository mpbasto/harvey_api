import Clarifai from 'clarifai';
import { response } from 'express';

const app = new Clarifai.App({
    apiKey: '5f7ea282d7044a3eb4fae4e9038762c3'
});

export const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


export const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('error getting entries'))
};