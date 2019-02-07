
const url = require('url');
const _data = require('./data');
const http = require('http');
const https = require('https');
const helpers = require('./helpers');
const config = require('./config');
const _logs = require('./logs');
const util = require('util');
const debug = util.debuglog('workers');

const workers = {};


workers.gatherAllChecks = async () => {
    try {
        const checks = await _data.list('checks');
        checks.forEach(async check => {
            try {
                const originalCheckData = await _data.read('checks', check);
                workers.validateCheckData(originalCheckData);
            } catch {
                debug('Error reading one of the check/s data');
            };
        });
    } catch {
        debug('Could not find any checks to process');
    };
};


workers.validateCheckData = originalCheckData => {

    originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData !== null ? originalCheckData : {};

    originalCheckData.id = typeof(originalCheckData.id) == 'string' && originalCheckData.id.trim().length == 20 ? originalCheckData.id.trim() : false;
    originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length == 10 ? originalCheckData.userPhone.trim() : false;
    originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http','https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
    originalCheckData.url = typeof(originalCheckData.url) == 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
    originalCheckData.method = typeof(originalCheckData.method) == 'string' && ['post','get','put','delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
    originalCheckData.successCodes = typeof(originalCheckData.successCodes) == 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length > 0 ? originalCheckData.successCodes : false;
    originalCheckData.timeoutSeconds = typeof(originalCheckData.timeoutSeconds) == 'number' && originalCheckData.timeoutSeconds % 1 === 0 && originalCheckData.timeoutSeconds >= 1 && originalCheckData.timeoutSeconds <= 5 ? originalCheckData.timeoutSeconds : false;

    originalCheckData.state = typeof(originalCheckData.state) == 'string' && ['up','down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
    originalCheckData.lastChecked = typeof(originalCheckData.lastChecked) == 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;

    if (originalCheckData.id &&
        originalCheckData.userPhone &&
        originalCheckData.protocol &&
        originalCheckData.url &&
        originalCheckData.method &&
        originalCheckData.successCodes &&
        originalCheckData.timeoutSeconds) {
            workers.performCheck(originalCheckData);
        } else {
            debug('Error: one of the checks is not properly formatted. Skipping it')
        };

};

workers.performCheck = originalCheckData => {

    // Prepare the intial check outcome
    const checkOutcome = {
        'error': false,
        'responseCode': false
    };
    // Mark that the outcome has not been sent yet
    let outcomeSent = false;

    // Parse the hostname and path out of the originalCheckData
    const parsedUrl = url.parse(`${originalCheckData.protocol}://${originalCheckData.url}`, true);
        
    const hostName = parsedUrl.hostname;
    const path = parsedUrl.path;

    // Construct the request
    const requestDetails = {
        'protocol' : `${originalCheckData.protocol}:`,
        'hostname' : hostName,
        'method' : originalCheckData.method.toUpperCase(),
        'path' : path,
        'timeout' : originalCheckData.timeoutSeconds * 1000
    };

    // Instantiate the request object (using either the http or https module)
    const _moduleToUse = originalCheckData.protocol == 'http' ? http : https;

    const req = _moduleToUse.request(requestDetails, res => {
        // Grab the status of the sent request
        const status =  res.statusCode;

        // Update the checkOutcome and pass the data along
        checkOutcome.responseCode = status;
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,checkOutcome);
            outcomeSent = true;
        }
    });

    
    // Bind to the error event so it doesn't get thrown
    req.on('error', e => {
        // Update the checkOutcome and pass the data along
        checkOutcome.error = {'error' : true, 'value' : e};
        if(!outcomeSent) {
            workers.processCheckOutcome(originalCheckData,checkOutcome);
            outcomeSent = true;
        }
    });

  // Bind to the timeout event
    req.on('timeout', () => {
        // Update the checkOutcome and pass the data along
        checkOutcome.error = {'error' : true, 'value' : 'timeout'};
        if(!outcomeSent) {
            workers.processCheckOutcome(originalCheckData,checkOutcome);
            outcomeSent = true;
        }
    });
    req.end();
}


workers.processCheckOutcome = async (originalCheckData, checkOutcome) => {

    const state = !checkOutcome.error && checkOutcome.responseCode && originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1 ? 'up' : 'down';

    const alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;

    const timeOfCheck = Date.now();

    workers.log(originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck);

    const newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = timeOfCheck;

    try {
        await _data.update('checks', newCheckData.id, newCheckData);
        if(alertWarranted) {
            workers.alertUserToStatusChange(newCheckData);
        } else {
            debug('Check outcome has not changed, no alert needed');
        };
    } catch {
        debug('Error trying to save updates to one of the checks');
    }
};

workers.alertUserToStatusChange = newCheckData => {

        const msg = `Alert: Check for ${newCheckData.method.toUpperCase()} ${newCheckData.protocol}://${newCheckData.url} is currently ${newCheckData.state}`;

        helpers.sendTwilioSms(newCheckData.userPhone, msg, err => {
            if(!err) {
                debug('Success: User was alerted to a status change in their check, via sms');
            } else {
                debug('Error: Could not send sms alert to user who had a state changed');
            };
        });
};

workers.log = async (originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck) => {
    const logData = {
        'check': originalCheckData,
        'outcome': checkOutcome,
        'state': state,
        'alert': alertWarranted,
        'time': timeOfCheck
    };
    const logString = JSON.stringify(logData);
    const logFileName = originalCheckData.id;
    
    try {
        await _logs.append(logFileName, logString);
        debug('Logging to file successed');
    } catch {
        debug('Logging to file failed');
    };
};

workers.loop = () => {
    setInterval(() => {workers.gatherAllChecks()}, 1000 * 60);
};

workers.rotateLogs = async () => {
    try {
        const logs = await _logs.list(false);
        logs.forEach(async logName => {
            const logId = logName.replace('.log','');
            const newFileId = `${logId}-${Date.now()}`;
            try {
                await _logs.compress(logId, newFileId);
                try {
                    await _logs.truncate(logId);
                    debug('Success truncating logFile')
                } catch {
                    debug('Error truncating logFile');
                };
            } catch {
                debug('Error compressing one of the log files', err);
            };
        });
    } catch {
        debug('Error: Could not find any logs to rotate');
    };
};

workers.logRotationLoop = () => {
    setInterval(() => { workers.rotateLogs()}, 1000 * 60 *60 *24);
};

workers.init = () => {

    console.log("\x1b[33m%s\x1b[0m","Background workers are running");

    workers.gatherAllChecks();
    workers.loop();
    workers.rotateLogs();
    workers.logRotationLoop();

};

module.exports = workers;