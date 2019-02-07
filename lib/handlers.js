/*
 * Request Handlers
 *
 */

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');
const _url = require('url');
const dns = require('dns');
const util = require('util');
// Define all the handlers
const handlers = {};

/*
 * HTML Handlers
 *
 */

// Index
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Uptime Monitoring - Made Simple',
      'head.description' : 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create Account
handlers.accountCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only takes a few seconds.',
      'body.class' : 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create New Session
handlers.sessionCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your account.',
      'head.description' : 'Please enter your phone number and password to access your account.',
      'body.class' : 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create a new check
handlers.checksCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create a New Check',
      'body.class' : 'checksCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('checksCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Dashboard (view all checks)
handlers.checksList = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    };
    // Read in a template as a string
    helpers.getTemplate('checksList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a Check
handlers.checksEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'checksEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('checksEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Favicon
handlers.favicon = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // Callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets
handlers.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }
          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};

/*
 * JSON API Handlers
 *
 */


 //Errors

 handlers.exampleError = (data, callback) => {
  const err = new Error('example error');
  throw (err);
 };

// Ping
handlers.ping = (data,callback) => {
    callback(200);
};

// Not-Found
handlers.notFound = (data,callback) => {
  callback(404);
};

// Users
handlers.users = (data,callback) => {
  const acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users  = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = async (data,callback) => {
  // Check that all required fields are filled out
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if (firstName && lastName && phone && password && tosAgreement) {

    try {

      await _data.read('users', phone);
      callback(400,{'Error': 'A user with that phone number already exists'});

    } catch {
    
      try {
        const hashedPassword = await helpers.hash(password);
        const userObject = {
          'firstName' : firstName,
          'lastName' : lastName,
          'phone' : phone,
          'hashedPassword' : hashedPassword,
          'tosAgreement' : true
        }

        try {
          await _data.create('users', phone, userObject)
          callback(200);
        } catch {
          callback(500,{'Error': 'Could not create the new user'});
        }
        
      } catch {
        callback(500,{'Error': 'Could not hash the user\'s password.'});
      }
    }

  } else {
    callback(400,{'Error': 'Missing required fields'});
  }
}

// Required data: phone
// Optional data: none
handlers._users.get = async (data,callback) => {
  // Check that phone number is valid
  const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // Get token from headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    if (handlers._tokens.verifyToken(token, phone)) {
      // Lookup the user
      try {
        const data = await _data.read('users',phone);
        delete data.hashedPassword;
        callback(200,data);
      } catch (err) {
        callback(404);
      }
    } else {
      callback(403,{"Error" : "Missing required token in header, or token is invalid."})
    }
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
}

// Required data: phone
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = async (data,callback) => {
  // Check for required field
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  // Check for optional fields
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Error if phone is invalid
  if (phone) {
    // Error if nothing is sent to update
    if(firstName || lastName || password){
      // Get token from headers
      const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the phone number
        if (handlers._tokens.verifyToken(token, phone)) {
          // Lookup the user
          try {
            const userData = await _data.read('users', phone);
              // Update the fields if necessary
              if(firstName){
                userData.firstName = firstName;
              }
              if(lastName){
                userData.lastName = lastName;
              }
              if(password){
                try {
                  userData.hashedPassword = await helpers.hash(password);
                } catch {
                  callback(500,{'Error': 'Could not hash the user\'s password.'});
                }
              }
              // Store the new updates
              try {
                await _data.update('users', phone, userData)
                callback(200);
              } catch {
                callback(500,{'Error' : 'Could not update the user.'});
              }
          } catch {
            callback(400,{'Error' : 'Specified user does not exist.'});
          }
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
        }
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }
}

// Required data: phone
// Cleanup old checks associated with the user
handlers._users.delete = async (data,callback) => {
  // Check that phone number is valid
  const  phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // Get token from headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
      if (handlers._tokens.verifyToken(token, phone)) {
        // Lookup the user
        try {
          const userData = await _data.read('users', phone);
          try {
            await _data.delete('users',phone);
            const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            const checksToDelete = userChecks.length;
                if (checksToDelete > 0) {
                  const checksDeleted = 0;
                  const deletionErrors = false;
                  // Loop through the checks
                  userChecks.forEach(async checkId => {
                    // Delete the check
                    try {
                      await _data.delete('checks',checkId);
                      checksDeleted++;
                      if(checksDeleted == checksToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's checks. All checks may not have been deleted from the system successfully."})
                        }
                      }
                    } catch {
                      deletionErrors = true;}
                  });
                } else {
                  callback(200);
                }
          } catch {
            callback(500,{'Error' : 'Could not delete the specified user'});
          }
        } catch {
          callback(400,{'Error' : 'Could not find the specified user.'});
        }
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Tokens
handlers.tokens = (data,callback) => {
  const acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens  = {};
// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = async (data,callback) => {
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
 
  if (phone && password) {
    // Lookup the user who matches that phone number
      try {
        const userData = await _data.read('users',phone);
        // Hash the sent password, and compare it to the password stored in the user object
        const hashedPassword = await helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };
          // Store the token
            try {
              await _data.create('tokens',tokenId,tokenObject);
              callback(200,tokenObject);
            } catch {
              callback(500,{'Error' : 'Could not create the new token'});
            }

        } else {
          callback(400,{'Error' : 'Password did not match the specified user\'s stored password'});
        }
      } catch {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
  } else {
    callback(400,{'Error' : 'Missing required field(s).'})
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = async (data,callback) => {
  // Check that id is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the token
    try {
      const tokenData = await _data.read('tokens', id);
      callback(200,tokenData);
    } catch {
      callback(404);
    }
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = async (data,callback) => {
  const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  const extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the existing token
    try {
      const tokenData = await _data.read('tokens', id);
        // Check to make sure the token isn't already expired
      if(tokenData.expires > Date.now()) {
        // Set the expiration an hour from now
        tokenData.expires = Date.now() + 1000 * 60 * 60;
        // Store the new updates
        try {
          await _data.update('tokens', id, tokenData);
          callback(200);
        } catch {
          callback(500,{'Error' : 'Could not update the token\'s expiration.'});
        }
      } else {
        callback(400,{"Error" : "The token has already expired, and cannot be extended."});
      }
    } catch {
      callback(400,{'Error' : 'Specified user does not exist.'});
    }
  } else {
    callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
  }
}


// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = async (data,callback) => {
  // Check that id is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the token
    try {
      await _data.read('tokens',id)
      // Delete the token
      try {
        await _data.delete('tokens',id)
        callback(200);
      } catch {
        callback(500,{'Error' : 'Could not delete the specified token'});
      }
    } catch {
      callback(400,{'Error' : 'Could not find the specified token.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
}

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = async (id,phone) => {
  // Lookup the token
  try {
    const tokenData = await _data.read('tokens',id);
    if(tokenData.phone == phone && tokenData.expires > Date.now()){
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};



// Checks
handlers.checks = (data,callback) => {
  const acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._checks[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the checks methods
handlers._checks  = {};

// Checks - post
// Required data: protocol,url,method,successCodes,timeoutSeconds
// Optional data: none
handlers._checks.post = async (data,callback) => {
  // Validate inputs
  const protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  const method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
  //
  if (protocol && url && method && successCodes && timeoutSeconds) {
    // Get token from headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Lookup the user phone by reading the token next lookup the user data
    try {
      const tokenData = await _data.read('tokens',token);
      const userPhone = tokenData.phone;
      const userData = await _data.read('users',userPhone);
      const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
      // Verify that user has less than the number of max-checks per user
      if (userChecks.length < config.maxChecks) {
        const parsedUrl = _url.parse(`${protocol}://${url}`,true);
        const hostName = typeof(parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 ? parsedUrl.hostname : false;
        //
        dns.resolve(hostName, async (err, records) => {
          if (!err && records) {  
            // Save the object
            try {
              // Create random id for check
              const checkId = helpers.createRandomString(20);
              // Create check object including userPhone
              const checkObject = {
                'id' : checkId,
                'userPhone' : userPhone,
                'protocol' : protocol,
                'url' : url,
                'method' : method,
                'successCodes' : successCodes,
                'timeoutSeconds' : timeoutSeconds
              };
              await _data.create('checks',checkId,checkObject);
              // Add check id to the user's object
              userData.checks = userChecks;
              userData.checks.push(checkId);
              // Save the new user data
              try {
                await _data.update('users',userPhone,userData);
                // Return the data about the new check
                callback(200,checkObject);
              } catch {
                callback(500,{'Error' : 'Could not update the user with the new check.'});
              }
            } catch {
              callback(500,{'Error' : 'Could not create the new check'});
            }
          } else {
            callback(400, {'Error': 'The host name of URL entered did not resolve to any DNS entries'});
          }
        });
      } else {
        callback(400,{'Error' : `The user already has the maximum number of checks (${config.maxChecks}).`});
      }
    } catch {
      callback(403);
    }
  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }
}

// Checks - get
// Required data: id
// Optional data: none
handlers._checks.get = async (data,callback) => {
  // Check that id is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the check
    try {
      const checkData = await _data.read('checks',id);
      // Get the token that sent the request
      const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid and belongs to the user who created the check
      if (handlers._tokens.verifyToken(token,checkData.userPhone)) {
        // Return check data
        callback(200,checkData);
      } else {
        callback(403);
      }
    } catch {
      callback(404);
    }
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Checks - put
// Required data: id
// Optional data: protocol,url,method,successCodes,timeoutSeconds (one must be sent)
handlers._checks.put = async (data,callback) => {
  // Check for required field
  const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  // Check for optional fields
  const protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  const method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
  // Error if id is invalid
  if (id) {
    // Error if nothing is sent to update
    if(protocol || url || method || successCodes || timeoutSeconds){
      // Lookup the check
      try {
        const checkData = await _data.read('checks',id);
        // Get the token that sent the request
        const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the check
        if (handlers._tokens.verifyToken(token,checkData.userPhone)) {
          // Update check data where necessary
          if (protocol) { checkData.protocol = protocol; }
          if (url) { checkData.url = url; }
          if (method) { checkData.method = method; }
          if (successCodes) { checkData.successCodes = successCodes; }
          if (timeoutSeconds) { checkData.timeoutSeconds = timeoutSeconds; }
          // Store the new updates
          try {
            await _data.update('checks',id,checkData);
            callback(200);
          } catch {
            callback(500,{'Error' : 'Could not update the check.'});
          }
        } else {
          callback(403);
        }
      } catch {
        callback(400,{'Error' : 'Check ID did not exist.'});
      }
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }
};


// Checks - delete
// Required data: id
// Optional data: none
handlers._checks.delete = async (data,callback) => {
  // Check that id is valid
  const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the check
    try {
      const checkData = await _data.read('checks',id);
      // Get the token that sent the request
      const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid and belongs to the user who created the check
      if (handlers._tokens.verifyToken(token,checkData.userPhone)) {
        // Delete the check data
          try {
            await _data.delete('checks',id);
            // Lookup the user's object to get all their checks
            try {
              const userData = await _data.read('users',checkData.userPhone);
              const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
              // Remove the deleted check from their list of checks
              const checkPosition = userChecks.indexOf(id);
              if(checkPosition > -1){
                userChecks.splice(checkPosition,1);
                // Re-save the user's data
                userData.checks = userChecks;
                try {
                  await _data.update('users',checkData.userPhone);
                  callback(200);
                } catch {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              } else {
                callback(500,{"Error" : "Could not find the check on the user's object, so could not remove it."});
              }
            } catch {
              callback(500,{"Error" : "Could not find the user who created the check, so could not remove the check from the list of checks on their user object."});
            }
          } catch {
            callback(500,{"Error" : "Could not delete the check data."})
          }
      } else {
        callback(403);
      }
    } catch {
      callback(400,{"Error" : "The check ID specified could not be found"});
    }
  } else {
    callback(400,{"Error" : "Missing valid id"});
  }
};


// Export the handlers
module.exports = handlers;