require('dotenv').config();
const express = require('express');
const compression = require('compression');

// const { getReviewsByProductId, patchReviewIncrementHelp } = require('./controller');

const app = express();
app.set('port', 3030);

// The Middle
app.use(express.json());
app.use((req, resp, next) => {
  console.log(`${req.method}:${req.originalUrl}`);
  next();
});
// Compression
app.use(compression());


// Static
app.use('/', express.static(process.env.DEV ? 'public' : 'dist'));

// Routes
// app.get(`/review-api/products/:product_id/reviews`, getReviewsByProductId);


// LetLive.
app.listen(app.set('port'), () => {
  console.log(`Rubber Duck Server running: ${app.set('port')}`);
});
