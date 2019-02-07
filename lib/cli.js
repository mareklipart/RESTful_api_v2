const readline = require('readline');
const util = require('util');
const events = require('events');
class _events extends events{};
const e = new _events();
const os = require('os');
const v8 = require('v8');
const _data = require('./data');
const _logs = require('./logs');
const helpers = require('./helpers');
const childProcess = require('child_process');

const cli = {};
//
//
e.on('man', (str) => {
    cli.responders.help();
});

e.on('help', (str) => {
    cli.responders.help();
});

e.on('exit', (str) => {
    cli.responders.exit();
});

e.on('stats', (str) => {
    cli.responders.stats();
});

e.on('list users', () => {
    cli.responders.listUsers();
});

e.on('more user info', (str) => {
    cli.responders.moreUserInfo(str);
});

e.on('list checks', (str) => {
    cli.responders.listChecks(str);
});

e.on('more check info', (str) => {
    cli.responders.moreCheckInfo(str);
});

e.on('list logs', (str) => {
    cli.responders.listLogs();
});

e.on('more log info', (str) => {
    cli.responders.moreLogInfo(str);
});
//
//
cli.responders = {};

cli.responders.help = () => {
    const commands = {
        'exit' : 'Kill the CLI (and the rest of the application)',
        'man' : 'Show this help page',
        'help' : 'Alias of the "man" command',
        'stats' : 'Get statistics on the underlying operating system and resource utilization',
        'List users' : 'Show a list of all the registered (undeleted) users in the system',
        'More user info --{userId}' : 'Show details of a specified user',
        'List checks --up --down' : 'Show a list of all the active checks in the system, including their state. The "--up" and "--down flags are both optional."',
        'More check info --{checkId}' : 'Show details of a specified check',
        'List logs' : 'Show a list of all the log files available to be read (compressed only)',
        'More log info --{logFileName}' : 'Show details of a specified log file',
    }
    // Show a header for the help page that is as wide as the screen
    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(1);

    // Show each command, followed by its explanation, in white and yellow respectively
    for(let key in commands){
        if(commands.hasOwnProperty(key)){
            const value = commands[key];
            let line = '      \x1b[33m '+key+'      \x1b[0m';
            const padding = 60 - line.length;
            for (i = 0; i < padding; i++) {
                line+=' ';
            }
            line+=value;
            console.log(line);
            //cli.verticalSpace();
        }
    }
    cli.verticalSpace(1);
    // End with another horizontal line
    cli.horizontalLine();
};
//

// Create a vertical space
cli.verticalSpace = lines => {
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for (i = 0; i < lines; i++) {
        console.log('');
    }
  };
  
// Create a horizontal line across the screen
cli.horizontalLine = () => {
// Get the available screen size
    const width = process.stdout.columns;
// Put in enough dashes to go across the screen
    let line = '';
    for (i = 0; i < width - 1; i++) {
        line+='-';
    }
    console.log(line);
};
//
// Create centered text on the screen
cli.centered = str => {
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';
  
    // Get the available screen size
    const width = process.stdout.columns;
  
    // Calculate the left padding there should be
    const leftPadding = Math.floor((width - str.length) / 2);
  
    // Put in left padded spaces before the string itself
    let line = '';
    for (i = 0; i < leftPadding; i++) {
        line+=' ';
    }
    line+= str;
    console.log(line);
  };
  
//
cli.responders.exit = () => {
    process.exit(0);
};
//
cli.responders.stats = () => {
    const stats = {
        'Load Average': os.loadavg().join(' '),
        'CPU Count': os.cpus().length,
        'Free Memory': os.freemem(),
        'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
        'Alloacated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size)*100),
        'Available Heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
        'Uptime': os.uptime() + ' seconds'
    };
    // Show a header for the help page that is as wide as the screen
    cli.horizontalLine();
    cli.centered('SYSTEM STATISTICS');
    cli.horizontalLine();
    cli.verticalSpace(1);
    // Show each command, followed by its explanation, in white and yellow respectively
    for(let key in stats){
        if(stats.hasOwnProperty(key)){
            const value = stats[key];
            let line = '      \x1b[33m '+key+'      \x1b[0m';
            const padding = 60 - line.length;
            for (i = 0; i < padding; i++) {
                line+=' ';
            }
            line+=value;
            console.log(line);
        }
    }
    cli.verticalSpace(1);
    // End with another horizontal line
    cli.horizontalLine();
};
//
cli.responders.listUsers = () => {
    _data.list('users').then(usersIds => {
        cli.verticalSpace();
        usersIds.forEach(userId => {
            _data.read('users', userId).then(userData => {
                let line = 'Name: ' + userData.firstName + ' ' + userData.lastName + ' ' + 'phone: ' + userData.phone + ' ' + 'checks: ';
                const numberOfChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array && userData.checks.length > 0 ? userData.checks.length : 0;
                line += numberOfChecks;
                console.log(line);
                cli.verticalSpace();
            });
        });
    }).catch(err => console.log('Users list is empty'));
};
//
cli.responders.moreUserInfo = (str) => {
    const arr = str.split('--');
    const userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(userId) {
        _data.read('users', userId).then(userData => {
            delete userData.hashedPassword;
            cli.verticalSpace();
            console.dir(userData, {'colors': true});
            cli.verticalSpace();
        }).catch(err => console.log('No user info'));
    };
};
//
cli.responders.listChecks = (str) => {
    _data.list('checks').then(checkIds => {
        cli.verticalSpace();
        checkIds.forEach(checkId => {
            _data.read('checks', checkId).then(checkData => {
                let includeCheck = false;
                const lowerString = str.toLowerCase();
                const state = typeof(checkData.state) == 'string' ? checkData.state : 'down';
                const stateOrUnknown = typeof(checkData.state) == 'string' ? checkData.state : 'unknown';
                //
                if(lowerString.indexOf('--'+state) > -1 || (lowerString.indexOf('--down') == -1 && lowerString.indexOf('--up') == -1))  {
                    let line = 'ID: ' + checkData.id + ' ' + checkData.method.toUpperCase() + ' ' + checkData.protocol + '://' + checkData.url + ' State: ' + stateOrUnknown;
                    console.log(line);
                    cli.verticalSpace();
                }
            });
        });
    }).catch(err => console.log('Checks list is empty'));
};
//
cli.responders.moreCheckInfo = (str) => {
    const arr = str.split('--');
    const checkId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(checkId) {
        _data.read('checks', checkId).then(checkData => {
            cli.verticalSpace();
            console.dir(checkData, {'colors': true});
            cli.verticalSpace();
        }).catch(err => console.log('No check info'));
    };
};
//
cli.responders.listLogs = () => {
   const ls = childProcess.spawn('ls', ['./.logs']);
   ls.stdout.on('data', dataObj => {
        const dataStr = dataObj.toString();
        const logFileNames = dataStr.split('\n');
        cli.verticalSpace();
        logFileNames.forEach(logFileName => {
            if(typeof(logFileName) == 'string' && logFileName.length > 0 && logFileName.indexOf('-') > -1) {
                    console.log(logFileName.trim().split('.')[0]);
                    cli.verticalSpace();
            }
        });
   })
};






//
cli.responders.moreLogInfo = (str) => {
    const arr = str.split('--');
    const fileName = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(fileName) {
        cli.verticalSpace();
        _logs.decompress(fileName, (err, strData) => {
            if(!err && strData) {
                const arr = strData.split('/n');
                arr.forEach(jsonStr => {
                    const logObject = helpers.parseJsonToObject(jsonStr);
                    if(logObject && JSON.stringify(logObject) !== '{}') {
                        console.dir(logObject, {'colors': true});
                        cli.verticalSpace();
                    }
                });
            }
        });
    };
};
//
//
cli.processInput = (str) => {
    str = typeof(str) == 'string' && str.length > 0 ? str.trim() : false;
    //
    if(str) {
        const uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];
        //
        let matchFound = false;
        //
        uniqueInputs.some(input => {
            if(str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                e.emit(input, str);
                return true;
            };
        });
        //
        if(!matchFound) {
            console.log('Sorry, wrong input, try again');
        }
    };
};

cli.init = () => {
    console.log('\x1b[34m%s\x1b[0m','The CLI is running');
    //
    const _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });
    _interface.prompt();
    //
    _interface.on('line', (str) => {
        cli.processInput(str);
        _interface.prompt();
    });
    //
    _interface.on('close', () => {
        process.exit(0);
    });

}

























module.exports = cli;