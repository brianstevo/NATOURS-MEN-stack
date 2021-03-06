const Tour = require('./../models/tourModel');
const ApiFeatures = require('./../utils/apiFeatures');

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


exports.aliasTopFive = (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = 'price';
	next();
};

exports.getAllTours = async (req, res) => {
	try {
		/**build query */
		// const reqObj = {
		// 	...req.query,
		// }; /**hard copy of req.query using cloning object ... */
		// console.log(reqObj);
		// const excludedFields = ['page', 'sort', 'limit', 'fields'];
		// excludedFields.forEach((el) => delete reqObj[el]);

		// /*advance filtering */
		// let reqString = JSON.stringify(reqObj);
		// // console.log(reqString);
		// reqString = reqString.replace(
		// 	/\b(gte|gt|lte|lt)\b/g,
		// 	(replaceText) => `$${replaceText}`
		// );
		// // console.log(JSON.parse(reqString));

		// let query = Tour.find(JSON.parse(reqString));

		/*sort filter */
		// if (req.query.sort) {
		// 	const sortBy = req.query.sort.split(',').join(' ');
		// 	// console.log(req.query.sort.split(','));
		// 	// console.log(sortBy);
		// 	query = query.sort(sortBy);
		// } else {
		// 	//default based on createdAt (specified in model)
		// 	query = query.sort('-createdAt');
		// }
		/*project/field limiting/select */
		// if (req.query.fields) {
		// 	const fieldBy = req.query.fields.split(',').join(' ');
		// 	// console.log(req.query.sort.split(','));
		// 	// console.log(sortBy);
		// 	query = query.select(fieldBy);
		// } else {
		// 	//default based on createdAt (specified in model)
		// 	query = query.select('-__v');
		// }

		/*pagination */
		// const page = req.query.page * 1 || 1;
		// const limit = req.query.limit * 1 || 100;
		// const skip = (page - 1) * limit;

		// query = query.skip(skip).limit(limit);
		// if (req.query.page) {
		// 	const numTours = await Tour.countDocuments();
		// 	if (skip >= numTours) throw new Error('This page does not exist');
		// }

		/** execute query*/
		const features = new ApiFeatures(Tour.find(), req.query).filter().sort().limitFields().pagination();

		const allTours = await features.query;

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