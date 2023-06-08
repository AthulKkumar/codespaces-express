const express = require('express');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieSession = require('cookie-session');
const routes = require('./routes');

const FeedbackServices = require('./services/Feedbackservice');
const SpeakerServices = require('./services/Speakerservice');

const feedbackService = new FeedbackServices('./data/feedback.json');
const speakerService = new SpeakerServices('./data/speaker.json');

const app = express();

const port = 3000;

app.use(
  cookieSession({
    name: 'session',
    keys: ['dfakjdflsajdfl', 'jdfsajflas'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './static')));

// This is for creating an variable which is available for all templates(globally)
app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
  } catch (err) {
    next(err);
  }
});

app.use('/', routes({ feedbackService, speakerService }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
