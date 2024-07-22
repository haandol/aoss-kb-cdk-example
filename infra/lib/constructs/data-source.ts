import * as s3 from 'aws-cdk-lib/aws-s3';
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';
import { Construct } from 'constructs';

interface IProps {
  knowledgeBase: bedrock.KnowledgeBase;
  bucket: s3.IBucket;
  dataSourceName: string;
}

export class DataSource extends Construct {
  readonly dataSource: bedrock.S3DataSource;

  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id);

    this.dataSource = new bedrock.S3DataSource(this, 'DataSource', {
      knowledgeBase: props.knowledgeBase,
      bucket: props.bucket,
      dataSourceName: props.dataSourceName,
      chunkingStrategy: bedrock.ChunkingStrategy.DEFAULT,
    });
  }
}
