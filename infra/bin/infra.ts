#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { EmbeddingStack } from "../lib/embedding-stack";
import { AgentStack } from "../lib/agent-stack";
import { Config } from "../config/loader";

const app = new cdk.App({
  context: {
    ns: Config.app.ns,
    stage: Config.app.stage,
  },
});

const embeddingStack = new EmbeddingStack(
  app,
  `${Config.app.ns}EmbeddingStack`,
  {
    knowledgeBaseName: Config.knowledgeBase.name,
    dataSourceName: Config.knowledgeBase.dataSourceName,
    instruction: Config.knowledgeBase.instruction,

    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  },
);

const agentStack = new AgentStack(app, `${Config.app.ns}AgentStack`, {
  knowledgeBase: embeddingStack.knowledgeBase,
  instruction: Config.agent.instruction,

  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
agentStack.addDependency(embeddingStack);

const tags = cdk.Tags.of(app);
tags.add("namespace", Config.app.ns);
tags.add("stage", Config.app.stage);

app.synth();
