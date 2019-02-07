const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const lib = {};

lib.baseDir = path.join(__dirname, '../.data/');

lib.create = (dir, file, data) => {

    return new Promise((resolve, reject) => {
        fs.open(`${lib.baseDir}${dir}/${file}.json`,'wx', (err, fileDescriptor) => {
            if (err) { 
                reject('Could not create new file, it may already exists')
            } else {
                const stringData = JSON.stringify(data);
                fs.writeFile(fileDescriptor, stringData, err => {
                    if (err) { 
                        reject('Error writing to new file')
                    } else {
                        fs.close(fileDescriptor, err => {
                            if (err) { 
                                reject('Error closing a new file')
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

lib.read = (dir, file) => {

    return new Promise ((resolve, reject) => {
        fs.readFile(`${lib.baseDir}${dir}/${file}.json`,'utf8', (err, data) => {
            if (err) { reject(err)};
            parsedData = helpers.parseJsonToObject(data); 
            resolve(parsedData);
        });
    });
}


lib.update = (dir, file, data) => {

    return new Promise((resolve, reject) => {
        fs.open(`${lib.baseDir}${dir}/${file}.json`,'r+', (err, fileDescriptor) => {
            if(err) { 
                reject('could not open the file for updating, it may not exist yet')
            } else {
                const stringData = JSON.stringify(data);
                fs.ftruncate(fileDescriptor, err => {
                    if(err) {
                        reject('Error truncating file')
                    } else {
                        fs.writeFile(fileDescriptor, stringData, err => {
                            if(err) {
                                reject('Error writing to existing file')
                            } else {
                                fs.close(fileDescriptor, err => {
                                    if(err) {
                                        reject('Error closing existing file')
                                    } else {
                                        resolve(true);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
};

lib.delete = (dir, file) => {

    return new Promise((resolve, reject) => {
        fs.unlink(`${lib.baseDir}${dir}/${file}.json`, err => {
            if(err) { reject('Error deleting file')}
            resolve(true);
        });
    });
}

lib.list = dir => {

    return new Promise((resolve, reject) => {
        fs.readdir(`${lib.baseDir}${dir}/`, (err, data) => {
            if(err || !data || data.length == 0) { reject(err)}
            const trimmedFileNames = [];
            data.forEach(fileName => {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            resolve(trimmedFileNames);
        });
    }); 
}

module.exports = lib;