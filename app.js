import express from 'express';
import routes from './routes';
const logger = require('morgan');
import 'dotenv/config';

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 9000;
app.set('port',  port);


app.get('/', (req, res) => res.status(200).json({status: 'success', message: 'welcome to post-example API'}));

routes(app);

app.use((req, res, next) => res.status(404).json({status:'fail', message: 'oops you have reached a dead end'}));
app.use( function (err, req, res, next) { 
    console.error(err.stack) 
    res.status(500).json({status: 'server failure', message: err.message || 'Something broke!'})
});

app.listen(port, () => {
    console.log(`Amazing stuff is happening on port: ${port}`)
})


export default app;