const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

/*middleware*/

app.use(express.json());
app.use(morgan('dev'));

// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id');
// app.delete('/api/v1/tours/:id');

/*route*/
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;