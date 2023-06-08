const express = require('express');
const speakersRouters = require('./speakers');
const feedbackRouters = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    const topSpeakers = await speakerService.getList();
    const artwork = await speakerService.getAllArtwork()
    res.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, artwork });
  });

  router.use('/speakers', speakersRouters(params));
  router.use('/feedback', feedbackRouters(params));

  return router;
};
