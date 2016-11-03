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

- Have a credential file in ~/.aws (~/.aws/credential) with aws keys. Per the [Javascript AWS-SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS)

```
[default]

aws_access_key_id = #

aws_secret_access_key = #
```
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
