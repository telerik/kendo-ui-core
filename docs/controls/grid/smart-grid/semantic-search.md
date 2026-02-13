---
title: Semantic Search
description: "Learn how to use Semantic Search mode in the AI Smart Box to enable semantic search that interprets user intent and matches related terms and contextual meanings."
slug: smartbox_semantic_search_mode
position: 8
components: ["grid"]
tag: new
---

# Kendo UI for jQuery Data Grid Semantic Search

The Semantic Search mode of the [AI Smart Box](slug:ai_toolbar_tool_kendoui_grid) interprets user intent and matches related terms, synonyms, and contextual meanings rather than exact keywords. When users enter a search term, your implementation uses semantic matching techniques to return filter criteria that capture semantically related content.

For example, try searching for "workout essentials" in the demo below to look for records like "resistance bands set", "fitness guide", or "multivitamin tablets", even though none of these records contain the exact query. This intelligent matching is particularly valuable when users might not know the exact terminology used in your data.

> The demo in this article uses a third-party service to implement semantic search for demonstration purposes. For production applications, evaluate and select semantic matching techniques that best suit your specific data characteristics and accuracy requirements.

The following example demonstrates Semantic Search mode in action:

```html
<div id="example">
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products-data-sm.js"></script>
    <div id="grid"></div>    
    <script>
        class SemanticSearchService {
            constructor() {
                this.extractor = null;
                this.initPromise = null;
            }

            async initialize() {
                if (this.extractor) return true;
                if (this.initPromise) return this.initPromise;
                this.initPromise = this.loadModel();
                return this.initPromise;
            }

            async loadModel() {
                try {
                    const module = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
                    const { pipeline, env } = module;
                    env.allowLocalModels = false;
                    this.extractor = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small');
                    return true;
                } catch (error) {
                    console.error('Failed to initialize semantic search:', error);
                    return false;
                }
            }

            async embed(text) {
                await this.initialize();
                if (!this.extractor) throw new Error('Model not loaded');
                const output = await this.extractor(text, { pooling: 'mean', normalize: true });
                return Array.from(output.data);
            }

            cosineSimilarity(a, b) {
                let dot = 0.0;
                let normA = 0.0;
                let normB = 0.0;
                for (let i = 0; i < a.length; i++) {
                    dot += a[i] * b[i];
                    normA += a[i] * a[i];
                    normB += b[i] * b[i];
                }
                return dot / (Math.sqrt(normA) * Math.sqrt(normB));
            }
        }

        const semanticSearch = new SemanticSearchService();
        let originalData = [];
        let embeddedData = [];

        async function initializeEmbeddings() {
            const hideTimer = setTimeout(() => {
                try { kendo.ui.progress($('#example'), false); } catch (e) {}
            }, 30000);

            try {
                await semanticSearch.initialize();
                originalData = products.slice();

                // Build concise texts to embed (smaller inputs are faster)
                const texts = originalData.map(item =>
                    `Product: ${item.name}. Category: ${item.category}. Description: ${item.description}.  Country: ${item.countryOfOrigin}. Tags: ${item.tags.join(', ')}.`
                );
                // Batch embeddings to improve throughput and avoid blocking the event loop.
                const batchSize = 5;
                const embeddings = [];

                for (let i = 0; i < texts.length; i += batchSize) {
                    const batch = texts.slice(i, i + batchSize);
                    const promises = batch.map(t => semanticSearch.embed(t));
                    const results = await Promise.all(promises);
                    embeddings.push(...results);
                }

                embeddedData = originalData.map((item, idx) => ({
                    ...item,
                    embedding: embeddings[idx]
                }));

                kendo.ui.progress($('#example'), false);
                clearTimeout(hideTimer);
            } catch (error) {
                clearTimeout(hideTimer);
            }
        }

        async function performSemanticSearch(query) {
            const grid = $('#grid').data('kendoGrid');
            if (!query || !query.trim()) {
                grid.dataSource.data(originalData.slice());
                return;
            }
            try {
                const q = await semanticSearch.embed(query);
                const results = embeddedData.map(item => ({ ...item, similarity: semanticSearch.cosineSimilarity(q, item.embedding) }))
                  .filter(x => x.similarity > 0.78)
                  .sort((a,b) => b.similarity - a.similarity);
                grid.dataSource.data(results);
            } catch (e) {
                console.error(e);
            }
        }

        function debounce(fn, delay) {
            let t;
            return function() { const args = arguments; clearTimeout(t); t = setTimeout(() => fn.apply(this, args), delay); };
        }

        $(document).ready(function() {          

            let initialOptions;
            $("#grid").kendoGrid({
                dataSource: {
                    data: products,
                    pageSize: 12,
                    schema: {
                        id: "id",
                        model: {
                            fields: {
                                id: { type: "number" },
                            },
                        }
                    }
                },
                height: 670,
                smartBox: {
                    searchSettings: {
                        enabled: false,
                    },
                    semanticSearchSettings: {
                        enabled: true,
                        history: true
                    },
                    semanticSearch: async (e) => {
                        const grid = $("#grid").data("kendoGrid");
                        await performSemanticSearch(e.searchValue, grid);
                    },
                },
                toolbar: [                    
                    {
                        name: "smartbox",
                    }
                ],
                search: {
                    fields: [
                        { name: "name", operator: "contains" },
                        { name: "description", operator: "contains" },
                        { name: "category", operator: "contains" },
                        { name: "countryOfOrigin", operator: "contains" }
                    ]
                },
                filterable: true,
                pageable: {
                    pageSize: 12
                },
                columns: [
                    { field: 'name', title: 'Product Name', width: 240 },
                    { field: 'category', title: 'Category', width: 140 },
                    { field: 'stockStatus', title: 'Stock Status', width: 130, template: function(){ return '<span class="status-chip"></span>'; } },
                    { field: 'price', title: 'Price', width: 100, template: function(dataItem){ return '<div class="k-text-right">' + kendo.toString(dataItem.price, 'c') + '</div>'; } },
                    { field: 'countryOfOrigin', title: 'Country', width: 120 },
                    { field: 'rating', title: 'Rating', width: 100, template: function(){ return '<div class="rating-bar"></div>'; }, attributes: { style: 'text-align:center;' } },
                    { field: 'description', title: 'Description'},
                ]
            });
			 initializeEmbeddings();
        });
    </script>
```

## Semantic Search Implementation

The Semantic Search mode requires an implementation that analyzes query meaning and returns semantically relevant results. Unlike traditional keyword matching that looks for exact text, your semantic search implementation must analyze the intent behind user queries and recognize when different words express the same concept.

Generally, such capabilities rely on machine learning models that understand language patterns and conceptual relationships through natural language processing (NLP) techniques.

The typical workflow is:

1. User enters a search query in natural language.
2. The `semanticSearch` event of the AI Smart Box fires with the query text.
3. You process the query using your chosen semantic matching technique.
4. Your implementation returns filter criteria based on semantic matching.
5. You apply the filters to the Grid data.

>tip The demo above uses a third-party transformer model to generate vector embeddings that understand semantic relationships in the data. Other approaches include large language models (LLMs), entity recognition, synonym expansion, or hybrid methods that combine multiple techniques.

To implement Semantic Search in the AI Smart Box tool:

1. Add the AI Smart Box tool to your Grid toolbar with Semantic Search mode enabled:

    ```javascript
    $("#grid").kendoGrid({        
        toolbar: [                    
            {
                name: "smartbox",
            }
        ],
        dataSource: products
    });
    ```

2. Configure additional Semantic Search mode settings if needed:

    ```javascript
    $("#grid").kendoGrid({
        smartBox: {                
            semanticSearchSettings: {
                enabled: true,
                history: true
            },
        },
        toolbar: [                    
            {
                name: "smartbox",
            }
        ],
        dataSource: products
    });
    ```

3. Handle the `semanticSearch` event to implement your semantic search logic:

    ```javascript
    $("#grid").kendoGrid({
        toolbar: [
            { 
                type: "smartbox"
                
            }
        ],
        smartBox: {           
            semanticSearchSettings: {
                enabled: true,
                history: true
            },
            semanticSearch: async (e) => {
                const grid = $("#grid").data("kendoGrid");
                await performSemanticSearch(e.searchValue, grid);
            },
        },
        dataSource: products
    });

    async function onSemanticSearch(e) {
        var query = e.searchValue;
        
        // Generate embedding for the search query
        var queryEmbedding = await semanticService.embed(query);
        
        // Compare query embedding with pre-computed Grid data embeddings
        var results = embeddedData
            .map(function(item) {
                return $.extend({}, item, {
                    similarity: semanticService.cosineSimilarity(queryEmbedding, item.embedding)
                });
            })
            .filter(function(x) { return x.similarity > 0.35; })  // Apply similarity threshold
            .sort(function(a, b) { return b.similarity - a.similarity; });
        
        // Update Grid data with semantically similar results
        var grid = $("#grid").data("kendoGrid");
        grid.dataSource.data(results);
    }
    ```

4. Create a separate service to encapsulate the semantic matching mechanism. In the demo, the `SemanticSearchService` loads the transformer model, converts text into vector embeddings, and provides the cosine similarity calculation to compare vectors.

## Configuration Options

The Semantic Search mode provides the following configuration options to customize its behavior:

* [Typing Delay](#typing-delay)&mdash;Set the debounce time before triggering the search.
* [Placeholder Text](#placeholder-text)&mdash;Provide guidance text in the search input field.
* [Query History](#query-history)&mdash;Enable users to access and reuse previous search queries.

### Typing Delay

You can use the `delay` property to control how long the AI Smart Box waits after the user stops typing before triggering the search. Since the semantic search logic may take time to process, consider using a longer delay to avoid triggering too many searches as users type. The default value is `700` milliseconds.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox"            
        }
    ],
    smartBox: {
        semanticSearchSettings: {
            enabled: true,
            delay: 300
        },
        semanticSearch: async (e) => {
            const grid = $("#grid").data("kendoGrid");
            await performSemanticSearch(e.searchValue, grid);
        },
    },
    dataSource: products
});
```

### Placeholder Text

The `placeholder` property allows you to customize the placeholder text that appears in the AI Smart Box when Semantic Search mode is active. The placeholder text should communicate that this mode understands natural language and concepts, not just exact keywords.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox"            
        }
    ],
    smartBox: {
        semanticSearchSettings: {
            enabled: true,
            delay: 300,
            placeholder: 'Describe what you need...'
        },
        semanticSearch: async (e) => {
            const grid = $("#grid").data("kendoGrid");
            await performSemanticSearch(e.searchValue, grid);
        },
    },
    dataSource: products
});
```

### Query History

The `history` property configures query history specifically for Semantic Search mode, allowing users to access and reuse previous searches. The default history size is `5` queries, and the default timestamp format is `'HH:mm:ss'`.

```javascript
$("#grid").kendoGrid({
     toolbar: [
        { 
            type: "smartbox"            
        }
    ],
    smartBox: {
        semanticSearchSettings: {
            enabled: true,
            history: true
        },
        semanticSearch: async (e) => {
            const grid = $("#grid").data("kendoGrid");
            await performSemanticSearch(e.searchValue, grid);
        },
    },
    dataSource: products
});
```

## Suggested Links

* [AI Smart Box](slug:ai_toolbar_tool_kendoui_grid)
* [Grid Searching]({% slug searchpanel_kendoui_grid_widget %})
* [AI Assistant Tools Setup](slug:ai_assistant_tools_setup)
* [Smart Grid Overview](slug:overview_smart_grid)
* [Grid Configuring the ToolBar]({% slug toolbar_kendoui_grid_widget%})
* [API Reference of the Grid](/api/grid)
