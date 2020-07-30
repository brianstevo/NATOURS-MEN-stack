const Tour = require('./../models/tourModel');

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
exports.getAllTours = async (req, res) => {
	try {
		/**build query */
		const reqObj = {
			...req.query
		}; /**hard copy of req.query using cloning object ... */
		console.log(reqObj);
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach(el => delete reqObj[el]);

		/*advance filtering */
		let reqString = JSON.stringify(reqObj);
		console.log(reqString);
		reqString = reqString.replace(/\b(gte|gt|lte|lt)\b/g, replaceText => `$${replaceText}`);
		console.log(JSON.parse(reqString));

		const query = await Tour.find(JSON.parse(reqString));

		/** execute query*/
		const allTours = await query;

		res.status(200).json({
			status: 'success',
			results: allTours.length,
			data: {
				tour: allTours,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'unsuccessful',
		});
	}
};
/*im not adding object into file use writeFile  */
exports.createTour = async (req, res) => {
	try {
		console.log(req.body);
		const newTour = await Tour.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'unsuccessful',
			message: 'invalid',
		});
	}
	// const newId = toursData[toursData.length - 1].id + 1;
	// const newTours = Object.assign({
	//         id: newId,
	//     },
	//     req.body
	// );
	// toursData.push(newTours);
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		/*same as our.findOne({_id:req.params.id})
                but findById is mongoose method */
		res.status(200).json({
			status: 'success',
			data: {
				tour: tour,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'unsuccessful',
			message: 'invalid',
		});
	}
	// const id = req.params.id * 1;
	// const toursIdData = toursData.find((el) => {
	//     return el.id === id;
	// });
};

exports.updateTour = async (req, res) => {
	try {
		console.log(req.body);
		const updatetour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		/*same as our.findOne({_id:req.params.id})
                but findById is mongoose method */
		res.status(200).json({
			status: 'success',
			data: {
				updatetour,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'unsuccessful',
			message: err,
		});
	}
};
exports.deleteTour = async (req, res) => {
	try {
		console.log(req.body);
		await Tour.findByIdAndDelete(req.params.id);
		/*same as our.findOne({_id:req.params.id})
                but findById is mongoose method */
		res.status(200).json({
			status: 'deletion success',
		});
	} catch (err) {
		res.status(404).json({
			status: 'unsuccessful',
			message: err,
		});
	}
};