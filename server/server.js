import express from 'express';
import { readFile } from 'fs';

const app = express();
import cart from './cartRouter.js';//обработчик всех запросов корзины

app.use(express.json());
app.use('/', express.static('static'));
app.use('/api/cart', cart);



app.get('/api/products', (_req, res) => {
  readFile('server/db/products.json', 'utf-8', (err, data) => {
      if(err){
          res.sendStatus(404, JSON.stringify({result:0, text: err}));
      } else {
          res.send(data);
      }
  })
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));