const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    respondXML(request, response, 200, responseJSON);
  } else {
    respondJSON(request, response, 200, responseJSON);
  }
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the require parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was Not Found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 400, responseJSON);
};

module.exports = {
  success,
  badRequest,
  notFound,
};
