const express = require('express');

const tourController = require('./../controller/tourcontroller');
const router = express.Router();

// router.param('id', tourController.checkId);
router.route('/top-5-cheap-tours').get(tourController.aliasTopFive, tourController.getAllTours);
router.route('/').get(tourController.getAllTours).post(tourController.createTour);

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;