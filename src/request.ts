const {HttpRequestManager} = require('http2-client/lib/request');
const httpRequestManager = new HttpRequestManager({
    keepH2ConnectionFor: 10000
});

const DEFAULT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'nl',
    'Referer': 'https://www.ticketswap.nl/',
    'Origin': 'https://www.ticketswap.nl',
    'DNT': 1,
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache'
}

export async function postRequest({url, body, headers}: { url: string, body: { [key: string]: any } | { [key: string]: any }[], headers? }):Promise<string> {
    const postData = JSON.stringify(body);

    const options = {
        method: 'POST',
        headers: {
            ...DEFAULT_HEADERS,
            ...headers,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = httpRequestManager.request(url, options, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);

            });

        })
        req.on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err)
        });

        req.write(postData);
        req.end();
    })
}
