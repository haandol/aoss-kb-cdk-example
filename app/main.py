import os
import dotenv
from langchain_aws import AmazonKnowledgeBasesRetriever


dotenv.load_dotenv()

KB_ID = os.getenv("KNOWLEDGE_BASE_ID", None)

retriever = AmazonKnowledgeBasesRetriever(
    knowledge_base_id=KB_ID,
    retrieval_config={
        "vectorSearchConfiguration": {
            "numberOfResults": 4,
        }
    },
)

query = "What is the LATS stands for?"
print(retriever.invoke(query))
