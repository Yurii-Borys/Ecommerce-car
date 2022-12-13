const Cars = require('../models/carsModel');
const { upload } = require('../middleware/uploadImage');
const multer = require('multer');

const getAllCars = async (req, res) => {
    try {
        const cars = await Cars.find();
        if (!cars.length) {
            return res.status(404).json({ message: "Cars not found" });
        }
        res.status(200).json({ cars })
    } catch (error) {
        res.status(500).json({ message: "Please, try again!" });
    }
}

const createCar = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).send({ message: err.message });
        }


        try {
            const { model, price, quantity, description } = req.body;
            const car = await Cars.create(
                {
                    model,
                    price,
                    quantity,
                    description,
                    imageUrl: `http://localhost:${process.env.PORT}/static/${req.file.filename}`
                })
            if (!car) return req.status(400).json({ message: "Model not created" });

            res.status(201).json(car);

        } catch (error) {
            res.status(500).json({ message: "Please, try again!" })
        }
    })
}

const getCarByModel = async (req, res) => {
    try {
        const id = req?.params?.id;
        const model = await Cars.findById({ _id: id });
        if (!model) return res.status(404).json({ message: "Model not found" });
        
        return res.status(200).json(model);
    }
    catch (error) {
        return res.status(500).json({ message: "Please, try again!" })
    }
}

module.exports = {
    getAllCars,
    createCar,
    getCarByModel
}