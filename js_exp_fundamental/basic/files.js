 const fs = require('fs');

// let data = fs.readFileSync('./data.csv', 'utf-8');
//
// console.log(data);
//
// fs.writeFileSync('./data_output.csv', data);

fs.readFile('./data.csv', 'utf-8', (err, data) => {
    console.log(err);
    console.log(data);
});