---
title: On-Premises Deployment
page_title: On-Premises Deployment - Telerik UI for ASP.NET Core AI Tools
description: 'Learn how to deploy the Telerik UI for ASP.NET Core AI tools Context API stack on-premises using the provided Helm chart in your Kubernetes cluster.'
components: ["aicodingassistant"]
slug: ai_coding_assistant_on_premises_aspnet-core
position: 3
tag: new
---

# On-Premises Deployment

The Telerik UI for ASP.NET Core AI tools support on-premises deployment through a Helm chart that installs the Context API stack into your Kubernetes cluster. The deployment includes the Context API service, a bundled reranking service, and [Qdrant](https://qdrant.tech/) for vector storage.

The on-premises package is simplified for customer-hosted environments. Hosted-only concerns such as authentication, rate limiting, and telemetry are removed from this deployment model. If needed, those controls should be handled at the ingress, API gateway, or cluster level.

## Prerequisites

Before installing the chart, make sure the cluster provides:

-   Persistent storage for Qdrant
-   Access to an OpenAI-compatible inference endpoint that exposes the models required by Context API for request handling and embeddings
-   A public or internal DNS name for the Context API service

## Deployment Steps

1. Install the Helm chart in the target cluster.
2. Configure the Context API deployment to use the in-cluster Qdrant service.
3. Configure the inference endpoint and the model names used by Context API.
4. Expose the Context API service on a stable URL.
5. Configure the MCP server to use that URL through the `CONTEXTAPI_URL` environment variable.

## Required Context API Configuration

Set the following environment variables for the Context API deployment:

| Variable                | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `VECTOR_DB_TYPE`        | Set to `qdrant`                                 |
| `QDRANT_HOST`           | The Qdrant service name inside the cluster      |
| `QDRANT_GRPC_PORT`      | The Qdrant gRPC port, typically `6334`          |
| `QDRANT_API_KEY`        | API key for Qdrant, if required                 |
| `LLM_BASE_URL`          | The OpenAI-compatible inference endpoint        |
| `LLM_API_KEY`           | API key for the inference endpoint, if required |
| `LLM_DEFAULT_MODEL`     | The model name used for request handling        |
| `LLM_EMBEDDINGS_MODEL`  | The model name used for embeddings              |
| `EMBEDDINGS_DIMENSIONS` | The dimension size of the embeddings model      |
| `LLM_REQUEST_TIMEOUT`   | Request timeout in seconds                      |

## Qdrant Configuration

No manual setup is required inside Qdrant for a standard deployment. A fresh Qdrant instance works out of the box as long as it is reachable from Context API and has persistent storage configured.

Context API creates the required collections automatically when they do not already exist.

## Reranking

Reranking is included in the deployment and does not require a customer-provided model endpoint.

The standard deployment runs reranking through the bundled cross-encoder service deployed together with Context API. In a standard Helm deployment, reranking works out of the box. A custom `CROSS_ENCODER_URL` is only needed if the reranking service is renamed or deployed separately.

## MCP Server Configuration

After the Context API service is exposed, configure the MCP server to use that address by setting `CONTEXTAPI_URL`:

```json
{
    "env": {
        "CONTEXTAPI_URL": "contextapi.customer.example.com:443"
    }
}
```

> `CONTEXTAPI_URL` must be provided as `host:port`.

## Result

After deployment, the MCP server sends requests to the customer-hosted Context API instance. Context API uses the configured inference endpoint, bundled reranking service, and Qdrant instance to serve retrieval operations inside the customer environment.
