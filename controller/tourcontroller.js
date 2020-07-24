const Tour = require('./../models/tourModel')

// const toursData = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkId = (req, res, next, val) => {
//     if (req.params.id * 1 > toursData.length) {
//         return res.status(404).send('not found');
//     }
//     next();
// };

/*route handler*/
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success'
    });
};
/*im not adding object into file use writeFile  */
exports.createTour = (req, res) => {
    // const newId = toursData[toursData.length - 1].id + 1;
    // const newTours = Object.assign({
    //         id: newId,
    //     },
    //     req.body
    // );
    // toursData.push(newTours);
    res.status(200).json({
        status: 'success'
    });
};

exports.getTour = (req, res) => {
    // const id = req.params.id * 1;
    // const toursIdData = toursData.find((el) => {
    //     return el.id === id;
    // });
    res.status(200).json({
        status: 'success'
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success'
    });
};
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success'
    });
};