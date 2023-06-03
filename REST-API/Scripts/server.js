/** TO DO
 * > Filter messages to be added in separate .json file with date, time and timezone.
 * > Change message type to easily distinguish API response or internal error.
 * >  */

const http = require('http');
const urlModule = require('url');
const querystring = require('querystring');
const { getAllRecords , addRecord, updateRecordByKey, deleteRecordByKey } = require('./databaseHandler');
const { getResponseMessage } = require('./utility.js');

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the specified headers

    const { method, url } = req;
    const parsedUrl = urlModule.parse(url, true);
    const requestPath = parsedUrl.pathname;
    const searchProps = querystring.parse(parsedUrl.search);

    switch (method) {
        case 'GET':
            // Handle GET requests
            if (requestPath === '/data') {
                // Retrieve data
                const records = getAllRecords(searchProps['?venue']);

                // No records found for search-property: venue
                if (!records) {
                    res.statusCode = 422;
                    res.setHeader('Content-Type', 'application/json');
                    const responseData = getResponseMessage(res.statusCode);
                    res.end(responseData);
                    break;
                }

                // Return response
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                const responseData = JSON.stringify({ message: 'Data retrieved successfully', data: records });
                res.end(responseData);
            }
            break;

        case 'POST':
            // Handle POST requests
            if (requestPath === '/data') {
                let requestBody = '';
                req.on('data', (chunk) => {
                    requestBody += chunk;
                });

                // Return response
                req.on('end', () => {
                    const parsedRequestBody = JSON.parse(requestBody);
                    // Process and store the data
                    // Check results and add record if no error
                    let duplicate = false;
                    try {
                        // Test duplicate
                        const specificId = parsedRequestBody.id;
                        const recordFound = getAllRecords(searchProps['?venue']).filter(item => item.id === specificId);

                        if (recordFound.length != 0) {
                            duplicate = true;
                            throw new Error(`API RESPONSE: readFromFileForItems: The id already exists: ${parsedRequestBody.id}`);
                        }

                        addRecord(parsedRequestBody, searchProps['?venue']);
                        // No errors
                        res.statusCode = 201;
                    } catch (error) {
                        if (duplicate) {
                            // Duplicate error
                            res.statusCode = 409
                        } else {
                            // Input fail error
                            res.statusCode = 422;
                        }
                        console.error('INTERNAL SERVER ERROR: readFromFileForItems: Error: ' + error)
                    }
                    
                    res.setHeader('Content-Type', 'application/json');
                    const responseData = getResponseMessage(res.statusCode);
                    res.end(responseData);
                });
            }
            break;

        case 'PUT':
            // Handle PUT requests
            if (requestPath === '/data') {
                let requestBody = '';
                req.on('data', (chunk) => {
                    requestBody += chunk;
                });

                // Return response
                req.on('end', () => {
                    const parsedRequestBody = JSON.parse(requestBody);
                    // Process update the record
                    try {
                        updateRecordByKey('id', searchProps['id'], parsedRequestBody,
                            searchProps['?venue'], searchProps['target-all-records']);
                        // No errors
                        res.statusCode = 200;
                    } catch (error) {
                        // Input fail error
                        res.statusCode = 422;
                        console.error('INTERNAL SERVER ERROR: readFromFileForItems: Error: ' + error)
                    }
                    
                    res.setHeader('Content-Type', 'application/json');
                    const responseData = getResponseMessage(res.statusCode);
                    res.end(responseData);
                });
            }
            break;

            case 'DELETE':
                // Handle DELETE requests
                if (requestPath === '/data') {
                    // Return response
                    try {
                        // Delete the record
                        const targetAllRecordsToBoolean = searchProps['target-all-records'] === "true";
                        const deletion = deleteRecordByKey('id', searchProps['id'], searchProps['?venue'],
                            targetAllRecordsToBoolean);
                        
                        if (deletion==='error') {
                            // Couldn't delete record
                            res.statusCode = 404;
                        } else {
                            // No errors
                            res.statusCode = 200;
                        }
                    } catch (error) {
                        // Input fail error
                        res.statusCode = 422;
                        console.error('INTERNAL SERVER ERROR: deleteRecordByKey: Error: ' + error);
                    }
                    res.setHeader('Content-Type', 'application/json');
                    const responseData = getResponseMessage(res.statusCode);
                    res.end(responseData);
                }
            break;
        
        // Handle CORS requests
        case 'OPTIONS':
            // Set CORS headers
            res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the specified headers
            res.setHeader('Access-Control-Max-Age', '86400'); // Set the maximum age for the preflight response cache
            
            // Respond with a 200 status code
            res.statusCode = 200;
            res.end();
            break;

        default:
            console.log('INFO: DEFAULT request activated');
            console.log('\nInvalid request below:\n');
            console.log('Method:', method);
            console.log('URL:', url);
            console.log('Parsed URL:', parsedUrl);
            console.log('Request Path:', requestPath);
            console.log('Search Properties:', searchProps);

            res.statusCode = 400; // Set status code to indicate a bad request
            res.end('Invalid request');
            break;
    }
});

server.listen('4001', () => {
    const { address, port } = server.address();
    console.log(`INFO: Server is listening on: http://${address}:${port}`);
});

// This is a simple password
// 37dff909dcfc37e075a338aafc462711