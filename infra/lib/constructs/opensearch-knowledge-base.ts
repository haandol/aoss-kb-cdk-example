import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';
import { Construct } from 'constructs';

export interface IProps {
  knowledgeBaseName: string;
}

export class OpensearchKnowledgeBase extends Construct {
  readonly knowledgeBase: bedrock.KnowledgeBase;

  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id);

    this.knowledgeBase = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
      embeddingsModel:
        bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
      name: props.knowledgeBaseName,
    });
  }
}
