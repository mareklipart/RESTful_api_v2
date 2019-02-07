const fs = require('fs');
const path = require('path');
const zlib = require('zlib');


const lib = {};

lib.baseDir = path.join(__dirname, '../.logs/');

lib.append = (file, str) => {
    return new Promise((resolve, reject) => {
        fs.open(`${lib.baseDir}${file}.log`, 'a', (err, fileDescriptor) => {
            if(err) {
                reject('Could not open a file for appending');
            } else {
                fs.appendFile(fileDescriptor, `${str}\n`, err => {
                    if(err) {
                        reject('Error appending to file');
                    } else {
                        fs.close(fileDescriptor, err => {
                            if(err) { reject('Error closing the file');
                            } else {
                                resolve(true);
                            }
                        });
                    }
                });
            }
        });
    });
}

lib.list = (includeCompressedLogs) => {
    return new Promise((resolve, reject) => {
        fs.readdir(lib.baseDir, (err, data) => {
            if(err || data.length === 0) { 
                reject(err);
            } else {
                const trimmedFileNames = [];
                data.forEach(fileName => {
                    if(fileName.indexOf('.log') > -1) {
                        trimmedFileNames.push(fileName.replace('.log',''));
                    };
                    if(fileName.indexOf('.gz.b64') && includeCompressedLogs) {
                        trimmedFileNames.push(fileName.replace('.gz.b64', ''));
                    }
                });
                resolve(trimmedFileNames)
            };
        });
    });
}

lib.compress = (logId, newFileId) => {

    return new Promise((resolve, reject) => {
        const sourceFile = `${logId}.log`;
        const destFile = `${newFileId}.gz.b64`;

        fs.readFile(`${lib.baseDir}${sourceFile}`, 'utf-8', (err, inputString) => {
            if(err) {
                reject(err)
            } else {
                zlib.gzip(inputString, (err, buffer) => {
                    if(err) {
                        reject(err)
                    } else {
                        fs.open(`${lib.baseDir}${destFile}`, 'wx', (err, fileDescriptor) => {
                            if(err) {
                                reject(err)
                            } else {
                                fs.writeFile(fileDescriptor, buffer.toString('base64'), err => {
                                    if(err) {
                                        reject(err)
                                    } else {
                                        fs.close(fileDescriptor, err => {
                                            if(err) {
                                                reject(err);
                                            } else {
                                                resolve(true);
                                            };
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    })
}

lib.decompress = fileId => {
    return new Promise((resolve, reject) => {
        const fileName = `${fileId}.gz.b64`;
        fs.readFile(`${lib.baseDir}${fileName}`,'utf8', (err, str) => {
            if(err) { 
                reject(err)
            } else {
                const inputBuffer = Buffer.from(str, 'base64');
                zlib.unzip(inputBuffer, (err, outputBuffer) => {
                    if(err) {
                        reject(err)
                    } else {
                        const str = outputBuffer.toString();
                        resolve(str);
                    } 
                });
            }
        });
    });
};


lib.truncate = logId => {
    return new Promise((resolve, reject) => {
        fs.truncate(`${lib.baseDir}${logId}.log`, 0, err => {
            if(err) { reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = lib;