const fs  = require('fs');
const path = require('path');

const savedProductsPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(savedProductsPath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    return callback(JSON.parse(fileContent));
  });
};


class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // fs.createReadStream(); - for big files

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(savedProductsPath, JSON.stringify(products), (err) => {
        if (err) {
          console.log('Error on writing product to a file!');
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}

module.exports = Product;