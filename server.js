const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
	path: './config.env',
});
const app = require('./index');
const PORT = 3000;

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);
// console.log(process.env);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		// console.log(con.connection);
		console.log('DB connected');
	});

// const testTour = new Tour({
// 	name: 'briana',
// 	price: 100,
// });
// testTour
// 	.save()
// 	.then((doc) => {
// 		console.log(doc);
// 		console.log('inserted');
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

app.listen(PORT, () => {
	console.log(`server running on ${PORT} ....`);
});