import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
app.use('*', (req: express.Request, resp: express.Response) => {
  resp.render('entry');
});
app.set('port', 8008);
app.engine(
  'handlebars',
  engine({
    defaultLayout: '',
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.listen(8008, () => console.log(`Example app listening on port ${8008}!`));
