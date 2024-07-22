#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EmbeddingStack } from '../lib/embedding-stack';
import { Config } from '../config/loader';

const app = new cdk.App({
  context: {
    ns: Config.app.ns,
    stage: Config.app.stage,
  },
});

new EmbeddingStack(app, `${Config.app.ns}Embedding`, {
  knowledgeBaseName: Config.knowledgeBase.name,
  dataSourceName: Config.knowledgeBase.dataSourceName,
});

const tags = cdk.Tags.of(app);
tags.add('namespace', Config.app.ns);
tags.add('stage', Config.app.stage);

app.synth();
