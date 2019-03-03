const http = require('http');
const fs = require('fs');

// function requestListener(request, response) {
//
// }

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    // process.exit();
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
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end' ,() => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            fs.writeFileSync('message.txt', message);

            console.log(parsedBody);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>`);
    res.write(`<head><title>My First Page</title></head>`);
    res.write(`<body> <h1>Hello!!!</h1> </body>`);
    res.write(`</html>`);
    res.end();
});

server.listen(3000);