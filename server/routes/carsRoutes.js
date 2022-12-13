const express = require('express');
const router = express.Router();
const path = require('path');
const { getAllCars, createCar, getCarByModel } = require('../controllers/carsController');

router.route('/cars')
    .get(getAllCars)

    .post(createCar)
    .patch(() => { })

router.route('/cars/:id')
    .get(getCarByModel)
    
module.exports = router;