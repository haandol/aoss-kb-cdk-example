import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { DataSource } from './constructs/data-source';
import { OpensearchKnowledgeBase } from './constructs/opensearch-knowledge-base';

export interface IProps extends cdk.StackProps {
  knowledgeBaseName: string;
  dataSourceName: string;
}

export class EmbeddingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id, props);

    const knowledgeBase = new OpensearchKnowledgeBase(
      this,
      'OpensearchKnowledgeBase',
      {
        knowledgeBaseName: props.knowledgeBaseName,
      }
    );

    const bucket = this.createBucket();
    new DataSource(this, 'DataSource', {
      knowledgeBase: knowledgeBase.knowledgeBase,
      bucket,
      dataSourceName: props.dataSourceName,
    });
  }

  private createBucket(): s3.Bucket {
    return new s3.Bucket(this, 'DataSourceBucket', {
      versioned: true,
      enforceSSL: true,
      serverAccessLogsPrefix: 'logs/',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
  }
}
