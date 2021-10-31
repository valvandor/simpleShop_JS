import { add as _add, change as _change } from './cart.js';
import { readFile, writeFile } from 'fs';

const actions = {
    add: _add,
    change: _change
};
//HANDLER отвечает за изменение данных в самом файле
let handler = (req, res, action, file) => {
    readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            writeFile(file, newCart, (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })
};

export default handler;