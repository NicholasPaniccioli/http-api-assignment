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

  if(acceptedTypes[0] === 'text/xml'){
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

  if(acceptedTypes[0] === 'text/xml'){
    return respondXML(request, response, 401, responseXML);
  }

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  const responseXML = `<response> <message>You do not have access to this content</message> <id>forbidden</id> </response>`;

  if(acceptedTypes[0] === 'text/xml'){
    return respondXML(request, response, 403, responseXML);
  }else {
    return respondJSON(request, response, 403, responseJSON);
  }
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };
  const responseXML = `<response> <message>Internal Server Error. Something went wrong</message> <id>internalError</id> </response>`;

  if(acceptedTypes[0] === 'text/xml'){
    return respondXML(request, response, 500, responseXML);
  }else {
    return respondJSON(request, response, 500, responseJSON);
  }
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };
  const responseXML = `<response> <message>A get request for this page has not been implemented yet. Check again later for updated content</message> <id>notImplemented</id> </response>`;

  if(acceptedTypes[0] === 'text/xml'){
    return respondXML(request, response, 501, responseXML);
  }else {
    return respondJSON(request, response, 501, responseJSON);
  }
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not Found',
    id: 'notFound',
  };
  const responseXML = `<response> <message>The page you are looking for was not Found</message> <id>notFound</id> </response>`;

  if(acceptedTypes[0] === 'text/xml'){
    return respondXML(request, response, 404, responseXML);
  }else {
    return respondJSON(request, response, 404, responseJSON);
  }
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
