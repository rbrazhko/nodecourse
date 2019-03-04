const fs = require('fs');

const requestHandler = (req, res) =>  {
    const url = req.url;
    const method = req.method;


    if (url === '/') {
        res.write(`
            <html>
            <head><title>Enter message</title></head>
            <body>
                <form action="/message" method="post">
                    <input type="text" name="message" placeholder="Message">
                    <button type="submit">Send</button>
                </form>
            </body>
            </html>
        `);
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // console.log(parsedBody);

            // fs.writeFileSync('message.txt', message); // Blocking file writing
            fs.writeFile('message.txt', message, err => {
                // Callback for async file writing

                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });

        // Return req.on() will not execute the code above and made the user to wait for response
        // Not blocks server Event Loop
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>`);
    res.write(`<head><title>My First Page</title></head>`);
    res.write(`<body> <h1>Hello!!!</h1> </body>`);
    res.write(`</html>`);
    res.end();
};

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';


// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';
