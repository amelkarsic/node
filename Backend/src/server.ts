import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, singIn } from './handlers/user';
import { errorHandler } from './error';

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middleware
// app.use((req, res, next) => {
//     req._nestonovo = 'hheeee';
//     next();
// })

app.get('/', (req, res, next) => {
    setTimeout(() => {
        next(new Error('Something went wrong'));
    }, 10);
    // res.status(200);
    // res.json({ message: 'hello' })
});

//adding protect will add it as middleware
app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', singIn);

app.use((err, req, res, next) => {
    errorHandler(err, res);
});

process.on('uncaughtException', (err) => {
    errorHandler(err, null);
});

process.on('unhandledRejection', (err) => {
    errorHandler(err, null);
})

export default app;