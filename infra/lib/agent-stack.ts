import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { bedrock } from "@cdklabs/generative-ai-cdk-constructs";

export interface IProps extends cdk.StackProps {
  knowledgeBase: bedrock.KnowledgeBase;
  instruction: string;
}

export class AgentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id, props);

    const agent = this.newAgent(props.instruction);
    agent.addKnowledgeBase(props.knowledgeBase);

    const guardrail = this.newGuardrail();
    agent.addGuardrail(guardrail);
  }

  private newAgent(instruction: string): bedrock.Agent {
    return new bedrock.Agent(this, "Agent", {
      foundationModel:
        bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_HAIKU_V1_0,
      instruction,
    });
  }

  private newGuardrail(): bedrock.Guardrail {
    const guardrail = new bedrock.Guardrail(this, "BedrockGuardrail", {
      name: "my-BedrockGuardrails",
      description: "Legal ethical guardrails.",
    });
    // PII filter
    guardrail.addPIIFilter({
      type: bedrock.PIIType.General.ADDRESS,
      action: bedrock.GuardrailAction.ANONYMIZE,
    });
    // contextual grounding
    guardrail.addContextualGroundingFilter({
      type: bedrock.ContextualGroundingFilterType.GROUNDING,
      threshold: 0.95,
    });
    guardrail.addContextualGroundingFilter({
      type: bedrock.ContextualGroundingFilterType.RELEVANCE,
      threshold: 0.95,
    });
    // topic filter
    guardrail.addDeniedTopicFilter(bedrock.Topic.FINANCIAL_ADVICE);
    return guardrail;
  }
}
