const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./index');
const PORT = 8000;

// console.log(process.env);

app.listen(PORT, () => {
	console.log(`server running on ${PORT} ....`);
});
