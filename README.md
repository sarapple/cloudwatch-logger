# Cloudwatch Logger and Writer

A logger utility tool to display tasks in the console and writes it to file.  This requires two cli utilites:

- [AWS CLI](https://aws.amazon.com/cli)
- [AWS LOGS](https://github.com/jorgebastida/awslogs)

## Cloudwatch

- Crate a config object with group, region, and log_to_file properties (required).  

- The file example.json is added as an example for your config.

```json
{
  "cloudwatch" : {
    "group" : "/aws/lambda/test",
    "region": "us-east-1",
    "log_to_file": true
  }
}
```

- Setup your AWS keys in the AWS CLI per the [AWS CLI Docs](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

## Initialize the Logger

```javascript
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
```

## Run The App

```bash
node app.js
```

## Cleanup

```javascript
cwLogger.cleanup();
```


## Todo

- Add testing
