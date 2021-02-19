const respondJSON = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondXML = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response> <message> This is a successful response </message> </response>`;
    respondXML(request, response, 200, responseXML);
  } else {
    const responseJSON = {
      message: 'This is a successful response',
    };
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
