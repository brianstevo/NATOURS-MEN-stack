class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const reqObj = {
            ...this.queryString,
        }; /**hard copy of req.query using cloning object ... */
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete reqObj[el]);

        /*advance filtering */
        let reqString = JSON.stringify(reqObj);
        // console.log(reqString);
        reqString = reqString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (replaceText) => `$${replaceText}`
        );
        // console.log(JSON.parse(reqString));

        this.query = this.query.find(JSON.parse(reqString));

        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            // console.log(req.query.sort.split(','));
            // console.log(sortBy);
            this.query = this.query.sort(sortBy);
        } else {
            //default based on createdAt (specified in model)
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fieldBy = this.queryString.fields.split(',').join(' ');
            // console.log(req.query.sort.split(','));
            // console.log(sortBy);
            this.query = this.query.select(fieldBy);
        } else {
            //default based on createdAt (specified in model)
            this.query = this.query.select('-__v');
        }
        return this;
    }
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        // if (req.query.page) {
        // 	const numTours = await Tour.countDocuments();
        // 	if (skip >= numTours) throw new Error('This page does not exist');
        // } NOT REQUIRED
        return this;
    }

}
module.exports = ApiFeatures