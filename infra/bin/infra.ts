#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EmbeddingStack } from '../lib/embedding-stack';
import { Config } from '../config/loader';

const app = new cdk.App();

new EmbeddingStack(app, 'EmbeddingStack', {
  knowledgeBaseName: Config.knowledgeBase.name,
  dataSourceName: Config.knowledgeBase.dataSourceName,
});
