import { Router } from 'express';
import { readFile } from 'fs';

import handler from './handler.js';
const router = Router();

const pathToCart = 'server/db/cart.json'

router.get('/', (_req, res) => {
    readFile(pathToCart, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', pathToCart);
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', pathToCart);
});

router.delete(`/:id`, (req, res) => {
    handler(req, res, 'remove', pathToCart);
});
export default router;