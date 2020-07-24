const mongoose = require('mongoose');
/*creating simple schema */
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'tours should have names'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'tours should have price'],
    },
    ratings: {
        type: Number,
        default: 4,
    },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;