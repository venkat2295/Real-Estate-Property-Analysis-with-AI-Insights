const express = require('express');
const router = express.Router();

const {createProperty,getProperties,getProperty,runAIAnalysis, deleteProperty, updateProperty}=require('../controllers/propertyController');
router.route('/')
  .post(createProperty)
  .get(getProperties);

router.route('/:id')
  .get(getProperty)
  .delete(deleteProperty)
  .put(updateProperty);

router.route('/:id/analyze')
  .post(runAIAnalysis);

module.exports = router;