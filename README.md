# Amazon Opensearch Serverless Knowledge-Base Example

# Prerequisites

- awscli
- Docker
- Nodejs 20+
- Python 3.8+
- AWS Account and Locally configured AWS credential

# Installation

this repository consists of 2 parts

- **infra** - provision AWS resources such as Opensearch Serverless, Knowledge-Base.
- **app** - test provisioned resources with langchain

## Infra

1. Install project dependencies

```bash
$ cd infra
$ npm i
```

2. Install cdk in global context and run `cdk bootstrap` if you did not initailize cdk yet.

```bash
$ npm i -g aws-cdk@2.149.0
$ cdk bootstrap
```

3. open [**/infra/config/dev.toml**](infra/config/dev.toml) and replace values for your environment

4. copy `dev.toml` file under infra folder with name `.toml`

```bash
$ cp config/dev.toml .toml
```

5. Deploy CDK Stacks on AWS

```bash
$ cdk deploy "*" --require-approval never
```

# Cleanup

destroy provisioned cloud resources

```bash
$ cd infra
$ cdk destroy "*"
```
