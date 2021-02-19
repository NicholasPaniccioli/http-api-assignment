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
  const responseJSON = {
    message: 'This is a successful response',
  };
  const responseXML = `<response> <message> This is a successful response </message> </response>`;

  if (acceptedTypes[0] === 'text/xml') {
    respondXML(request, response, 200, responseXML);
  } else {
    respondJSON(request, response, 200, responseJSON);
  }
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the require parameters',
  };
  const responseXML = `<response> <message> Missing valid query parameter set equal to true </message> <id>badRequest</id> </response>`;

  if(acceptedTypes[0] ===  'text/xml'){
    return respondXML(request, response, 400, responseXML);
  }
  
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
  };
  const responseXML = `<response> <message> Missing loggedIn query parameter set to yes </message> <id>unauthorized</id> </response>`;

  if(acceptedTypes[0] ===  'text/xml'){
    return respondXML(request, response, 400, responseXML);
  }

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

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
  unauthorized,
  notFound,
};
