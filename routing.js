const fs = require('fs');

const requestHandler = (req, res) => {
    let url = req.url
    let method = req.method
    if(url === '/'){
        // res write is for writing request
        res.write('<html>');
        res.write('<form method="POST" action="/message">');
        res.write('<input name="message">');
        res.write('<button type="submit">Submit</button>');
        res.write('</form>');
        res.write('</html>')
        // to handle error we must return res.end
        return res.end()
    }
    if(url === '/message' && method === 'POST'){
        // create variable to accomodate data
        const body = [];
        // and then register event on have data request
        req.on('data', (chunk) => {
            // and then push data into variable
            body.push(chunk)
        });
        // and then register event on end of request
        return req.on('end', () => {
            // we create variable to convert data request into string
            const parsedBody = Buffer.concat(body).toString();
            // and we split data by = to get value of data
            const message = parsedBody.split('=')[0];
            // and then write into file
            fs.writeFile('message.txt', message, (err) => {
                // we use callback because writeFile is function synchronous
                // so to handle error we use callback to make function asynchronous
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            });
        });
    }
    // res write is for writing request
    res.write('<html>');
    res.write('<h1>Hello World</h1>')
    res.write('</html>')
    // to handle error we must return res.end
    return res.end()
}

module.exports = {
    handle: requestHandler,
    title: 'Riyanisme'
}