const cwLogger = require('./cloudwatch_logger');

cwLogger.initialize(
  {
    "cloudwatch" : {
      "group" : "/aws/lambda/test",
      "region": "us-east-1",
      "log_to_file": true
    }
  }
);

//make sure child process is killed when exiting
process.once('SIGINT',function(){
  cwLogger.cleanup();
  process.nextTick(() => process.exit(0));
});
