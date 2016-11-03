'use strict'

const fs = require('fs');

module.exports = (function(){
  let child;
  let wstream;
  let output = {};

  function spawnChild(opts){
    const spawn = require('child_process').spawn;
    let child = spawn(
      'awslogs',
      [
        'get',
        opts.cloudwatch.group,
        'ALL',
        '--watch',
        '--aws-region='+opts.cloudwatch.region
      ],
      {
        stdio: 'pipe'
      }
    );

    return child;
  }

  function logEventsToFile(logToFile){
    return logToFile ? fs.createWriteStream('logs/cloudwatch_output.log', {flags: 'a+'}) : null;
  }

  output.initialize = function(opts){
    opts.cloudwatch.log_to_file = opts.cloudwatch.log_to_file ? true : false;
    console.log('Starting Log Printing with the Following Config.');
    console.log('\n', opts.cloudwatch);

    child = spawnChild(opts);
    //create write stream only if log_to_file in config is true
    wstream = logEventsToFile(opts.cloudwatch.log_to_file);

    //write data to console and logfiile if requested
    child.stdout.on('data',function(data){
      console.log(data.toString('utf8'));
      if(wstream) wstream.write(data);
    });

    //also log errors
    child.stderr.on('data',function(data){
      console.log(data.toString('utf8'));
      if(wstream) wstream.write(data);
    });
  };

  output.cleanup = function(){
    console.log('\n Killing child process and closing logging.');

    if (wstream) wstream.end();
    child.kill();
  };

  return output;
}());
