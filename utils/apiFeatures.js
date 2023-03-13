class ApiFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }

  search() {
    const product = this.queryString.product
      ? {
          name: {
            $regex: this.queryString.product,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...product });
    return this;
  }

  filter() {
    const queryStringCopy = { ...this.queryString };
    // creating an object with all fields removed from queryStringCopy except "category"
    const queryCatagory = {};
    Object.keys(queryStringCopy).forEach((k) => {
      if (k === "category") {
        queryCatagory[k] = queryStringCopy[k];
      }
    });
    // creating an object with all fields removed from queryStringCopy except "category"
    this.query = this.query.find(queryCatagory);
    return this;
  }
}

module.exports = ApiFeatures;
