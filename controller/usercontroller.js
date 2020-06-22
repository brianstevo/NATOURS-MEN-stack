/*handlers */
const fs = require('fs');
const express = require('express');
const router = express.Router();

const toursData = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        data: 'not defined yet',
    });
};
exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        data: 'not defined yet',
    });
};
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        data: 'not defined yet',
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        data: 'not defined yet',
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        data: 'not defined yet',
    });
};