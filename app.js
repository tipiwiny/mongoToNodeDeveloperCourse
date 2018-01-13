import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import consolidate from 'consolidate';
import db from './db';

const app = express();
app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).render('error_template', { error: err });
};
db.connect('mongodb://localhost:27017', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    const port = process.env.PORT || 3000;
    app.use(errorHandler);
    app.listen(port,() =>{
      console.log('Express server listening on port %s.', port);
    });
  }
});
app.get('/', function(req, res) {
  res.render('newMovie', {});
});
app.post('/add_movie', (req, res) => {
  const videoDB = db.getClient().db('video');

  videoDB.collection('movies').insertOne(req.body)
    .then((r)=> {
      res.send(`Document inserted with ${r}`);
    })
    .catch(() => errorHandler);
});
