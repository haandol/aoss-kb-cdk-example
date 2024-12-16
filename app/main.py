import os
import boto3
import dotenv
from langchain_aws import AmazonKnowledgeBasesRetriever
from langchain_aws.retrievers.bedrock import RetrievalConfig, VectorSearchConfig

session = boto3.Session()
client = session.client("bedrock-runtime")
dotenv.load_dotenv()

KB_ID = os.getenv("KNOWLEDGE_BASE_ID", None)
assert KB_ID, "Please set the KNOWLEDGE_BASE_ID environment variable"

retriever = AmazonKnowledgeBasesRetriever(
    client=client,
    knowledge_base_id=KB_ID,
    retrieval_config=RetrievalConfig(
        vectorSearchConfiguration=VectorSearchConfig(
            numberOfResults=4,
            overrideSearchType="HYBRID",
        ),
    ),
    min_score_confidence=0.3,
)

query = "What is the LATS stands for?"
print(retriever.invoke(query))
