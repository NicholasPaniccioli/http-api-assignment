const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(object));
    response.end();
};

const success = (request, response) => {
    const responseJSON = {
        message: 'This is a successful response',
    };

    respondJSON (request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
    const responseJSON = {
        message: 'this request has the require parameteres',
    };
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'the page you are looking for was not found.',
        id: 'notFound',
    };
};

module.exports = {
    success,
    badRequest, 
    notFound,
}