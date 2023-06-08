const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async(req, res) => {
    const feedback = await feedbackService.getList()
    res.json(feedback);
  });

  return router;
};
