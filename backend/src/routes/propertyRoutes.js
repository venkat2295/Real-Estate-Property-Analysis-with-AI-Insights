const express = require('express');
const router = express.Router();

const {createProperty,getProperties,getProperty,runAIAnalysis}=require('../controllers/propertyController');
router.route('/')
  .post(createProperty)
  .get(getProperties);

router.route('/:id')
  .get(getProperty);

router.route('/:id/analyze')
  .post(runAIAnalysis);

module.exports = router;