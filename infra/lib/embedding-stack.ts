import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { bedrock } from "@cdklabs/generative-ai-cdk-constructs";
import { DataSource } from "./constructs/data-source";

export interface IProps extends cdk.StackProps {
  knowledgeBaseName: string;
  dataSourceName: string;
  instruction: string;
}

export class EmbeddingStack extends cdk.Stack {
  // NOTE: This should be IKnowledgeBase but it's not compatible with the bedrock.Agent
  readonly knowledgeBase: bedrock.KnowledgeBase;
  readonly bucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id, props);

    const knowledgeBase = new bedrock.KnowledgeBase(this, "KnowledgeBase", {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
      name: props.knowledgeBaseName,
      instruction: props.instruction,
    });
    const bucket = this.createBucket();
    new DataSource(this, "DataSource", {
      knowledgeBase,
      bucket,
      dataSourceName: props.dataSourceName,
    });

    this.knowledgeBase = knowledgeBase;
    this.bucket = bucket;
  }

  private createBucket(): s3.Bucket {
    return new s3.Bucket(this, "DataSourceBucket", {
      versioned: true,
      enforceSSL: true,
      serverAccessLogsPrefix: "logs/",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
  }
}
