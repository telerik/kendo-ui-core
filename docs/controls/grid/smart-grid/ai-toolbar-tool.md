---
title: AI Smart Box
description: "Learn how to use the AI Smart Box in the Kendo UI for jQuery Grid to provide unified search, semantic search, and AI-powered interactions in a single toolbar control."
slug: ai_toolbar_tool_kendoui_grid
position: 3
components: ["grid"]
tag: new
---

# Kendo UI for jQuery Data Grid AI Smart Box

The [Grid]({% slug overview_kendoui_grid_widget %}) AI Smart Box is a versatile toolbar tool that unifies search and AI capabilities in a single interface. It offers three distinct modes that you can enable independently or in combination to provide flexible data exploration for your users.

The AI Smart Box allows users to explore Grid data through traditional keyword search, semantic search that understands meaning and context, or AI-powered natural language commands.

> The demo below uses a Telerik-hosted AI service for AI-powered Grid control and a third-party transformer model for semantic search, both for demonstration purposes. For production applications, [implement your own AI service](slug:smart_ext_kendoui_grid) and [semantic matching techniques](slug:smartbox_semantic_search_mode#semantic-search-implementation) suited to your data and requirements.

In the following example, you can switch between modes in the AI Smart Box to explore each way of interaction. Use the keyword search for exact matches, try semantic search with queries like "gardening equipment" to find related items like "Smart Plant Watering System", or ask the AI Assistant to apply Grid operations in natural language.

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
                        enabled: true,
                        history: true
                    },
                    semanticSearchSettings: {
                        enabled: true,
                        history: true
                    },
                    aiAssistantSettings: {
                        enabled: true,
                        history: true,
                        service: { url: "https://demos.telerik.com/service/v2/ai/grid/smart-state" },
                        promptSuggestions: [
                            'Show products under $100',
                            'Group by category',
                            'Highlight high-rated items',
                            'Export to Excel',
                            'Hide description column',
                            'Move price column to first position'
                        ],
                        speechToTextButton: true,
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
                sortable: true,
                filterable: true,
                groupable: true,
                pageable: {
                    pageSize: 12
                },
                selectable: "multiple, row",
                resizable: true,
                reorderable: true,
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

## Implementation Steps

To configure the Grid's AI Smart Box:

1. Configure the Grid toolbar with the AI Smart Box tool:

    ```javascript
    $("#grid").kendoGrid({
        toolbar: [
            { 
                type: "smartbox"
            }
        ],
        dataSource: products
    });
    ```

2. Enable the modes you want to show in the AI Smart Box using the `searchSettings`, `semanticSearchSettings`, and `aiAssistantSettings` options:

    ```javascript
    $("#grid").kendoGrid({
        toolbar: [
            { 
                type: "smartbox",
            },
            smartBox: {
                    searchSettings: {
                        enabled: true,
                    },
                    semanticSearchSettings: {
                        enabled: true,
                    },
                    aiAssistantSettings: {
                        enabled: true,
                    },
                },
        ],
        dataSource: products
    });
    ```

    > Search mode applies filters automatically to the Grid DataSource. You can optionally handle the `search` event to customize the default search behavior.

3. Configure the `service.url` property for AI Assistant mode to point to your AI service endpoint:

    ```javascript
    $("#grid").kendoGrid({
        toolbar: [
            { 
                type: "smartbox",
            }
        ],
        smartBox: {
                searchSettings: {
                    enabled: true
                },
                semanticSearchSettings: {
                    enabled: true
                },
                aiAssistantSettings: {
                    enabled: true,
                    service: { url: "https://demos.telerik.com/service/v2/ai/grid/smart-state" }
                    
                }
            },
        dataSource: products
    });
    ```

    > The `service.url` defines the endpoint where your natural language queries will be processed. It should point to [your custom AI service](slug:smart_ext_kendoui_grid) that can understand your domain-specific data and business logic. To explore the available integration scenarios, see [AI Assistant Tools Setup](slug:ai_assistant_tools_setup).

4. Handle the `semanticSearch` event to implement your semantic search logic:

    ```javascript
    $("#grid").kendoGrid({
        toolbar: [
            { 
                type: "smartbox",
            }
        ],
        smartBox: {
                searchSettings: {
                    enabled: true
                },
                semanticSearchSettings: {
                    enabled: true
                },
                aiAssistantSettings: {
                    enabled: true,
                    service: { url: "https://demos.telerik.com/service/v2/ai/grid/smart-state" }
                    
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

5. Encapsulate your semantic matching mechanism in a separate service. The demo uses the `SemanticSearchService` to load a transformer model, generate vector embeddings, and calculate similarity scores.

## Available Modes

The AI Smart Box provides three modes that you can enable independently or in combination. Each mode serves different use cases and offers specific configuration options.

<TabStrip>
<TabStripTab title="Search Mode">

The Search mode is enabled by default in the AI Smart Box and provides traditional keyword-based filtering across Grid columns. As users type, the AI Smart Box generates filter expressions that match the search value against the Grid columns. Use the `searchSettings` option to further tailor the Search mode to your specific needs. 

By default, the Grid automatically applies the search filter to the DataSource. You can optionally handle the `search` option to customize the search behavior.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox"
        }
    ],
    searchSettings: {
             enabled: true,
             history: true
         },
    search: {
         fields: [
             { name: "name", operator: "contains" },
             { name: "description", operator: "contains" },
             { name: "category", operator: "contains" },
             { name: "countryOfOrigin", operator: "contains" }
         ]
     },
    dataSource: products
});
```

> For more details about Search mode configuration, see the [Grid Searching]({% slug searchpanel_kendoui_grid_widget %}) article.

</TabStripTab>
<TabStripTab title="Semantic Search Mode">

Configure the `semanticSearchMode` option of the AI Smart Box to enable semantic search functionality that interprets user intent and matches related terms, synonyms, and contextual meanings. This intelligent matching is particularly valuable when users might not know the exact terminology used in your Grid data.

When users enter a search term, handle the `semanticSearch` event to implement your semantic matching logic using vector embeddings or other techniques to find conceptually related content.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox",
        }
    ],
    smartBox: {
        semanticSearchSettings: {
            enabled: true
        },
        semanticSearch: async (e) => {
            // Implement your semantic search logic here
            // Use a desired semantic matching technique to filter and update the Grid data
            // based on the search value
        },
    },
    dataSource: products
});
```

> For more information about implementing semantic search in the AI Smart Box, see the [Semantic Search](slug:smartbox_semantic_search_mode) article.

</TabStripTab>
<TabStripTab title="AI Assistant Mode">

Use the `aiAssistant` option to enable AI Assistant mode, which allows users to interact with the Grid data through natural language commands. Users can apply any supported Grid operation&mdash;including filtering, sorting, column management, data export, and row highlighting.

Configure the AI Assistant mode behavior through the configuration object. You can guide users with predefined prompts using the `promptSuggestions` option and enable automatic communication with your custom AI service by setting the `requestUrl` option.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox",
        }
    ],
    smartBox: {
        aiAssistantSettings: {
            enabled: true,
            service: { url: "https://demos.telerik.com/service/v2/ai/grid/smart-state" },
            promptSuggestions: [
                'Show top customers by revenue',
                'Filter active accounts',
                'Group by region'
            ]
            
        },
    },
    dataSource: products
});
```

> For more information about configuring AI Assistant mode and available integration options, see the [AI Assistant Tools Setup](slug:ai_assistant_tools_setup) article. To understand how to set up your custom AI service, see the [AI Service Setup](slug:smart_ext_kendoui_grid) article.

</TabStripTab>
</TabStrip>

## Setting the Active Mode

When you enable multiple modes in the AI Smart Box, users can choose their preferred interaction method by using the seamless mode-switching interface of the tool.

By default, the Search mode is initially selected when users open the AI Smart Box tool. You can customize this behavior and manually specify the mode that should be initially selected by using the `activeMode` option: 

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox",
            
        }
    ],
    smartBox: {
        activeMode: "aiAssistant",
            searchSettings: {
                enabled: true
            },
            semanticSearchSettings: {
                enabled: true
            },
            aiAssistantSettings: {
                enabled: true,
                service: { url: "https://demos.telerik.com/service/v2/ai/grid/smart-state" }
                
            }            
        },
    dataSource: products
});
```

## Customization Options

The AI Smart Box provides several customization options to tailor the appearance and behavior of the tool to your application's needs. You can configure [placeholder text](#placeholder-text), [query history settings](#query-history), and customize the appearance of [suggestions](#suggestion-template) and [history items](#history-item-template) using template directives.

### Placeholder Text

The AI Smart Box allows you to customize the placeholder text that appears in the input field for each mode.

You can define a global placeholder for all modes through the `placeholder` option of the AI Smart Box tool:

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox",            
        }
    ],
    smartBox: {
        placeholder: "Search or ask..."
    },
    dataSource: products
});
```

>tip To override the global placeholder for individual modes, set the `placeholder` property within the settings object of the respective AI Smart Box mode. For example, to customize the placeholder for the Semantic Search mode, see [Semantic Search Placeholder Text](slug:smartbox_semantic_search_mode#placeholder-text).

### Query History

The AI Smart Box maintains a history of recent queries for each enabled mode, allowing users to quickly reuse previous searches or commands.

You can configure global history behavior through the `history` option of the AI Smart Box tool, which applies to all modes unless a mode provides its own history settings. The default global history size is `5` queries, and the default timestamp format is `'HH:mm:ss'`.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox",
        }
    ],
    smartBox: {
        searchSettings: {
            enabled: true,
            history: {
                size: 5,
                timestampFormat: 'h:mm a'
            }
        },
    },
    dataSource: products
});
```

>tip For mode-specific history configuration, set the `history` property within the settings object of the respective AI Smart Box mode. For example, to configure the history settings for the Semantic Search mode, see [Semantic Search Query History](slug:smartbox_semantic_search_mode#query-history).

### Suggestion Template

The AI Smart Box provides a `suggestionTemplate` option to customize the appearance of prompt suggestions in AI Assistant mode. The template provides access to the `suggestion` field, allowing you to add icons, styling, or additional markup.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox",
        }
    ],
    smartBox: {
        aiAssistantSettings: {
            enabled: true,
            service: { url: "https://demos.telerik.com/service/v2/ai/grid/smart-state" },
            promptSuggestions: [
                'Show top customers by revenue',
                'Filter active accounts',
                'Group by region'
            ],
            suggestionTemplate: function(suggestion) {
                return '<div class="custom-suggestion">' +
                    '<span class="k-icon k-i-sparkles"></span>' +
                    '<span>' + kendo.htmlEncode(suggestion) + '</span>' +
                    '</div>';
            }
            
        },
    },
    dataSource: products
});
```

### History Item Template

You can use the `historyItemTemplate` option to customize the content of history items and format how previous queries are displayed. This template applies to all modes that have history enabled and provides access to the `text`, `timestamp`, and `timestampFormat` fields.

```javascript
$("#grid").kendoGrid({
    toolbar: [
        { 
            type: "smartbox",
        }
    ],
    smartBox: {
        aiAssistantSettings: {
            enabled: true,
            service: { url: "https://demos.telerik.com/service/v2/ai/grid/smart-state" },
            historyItemTemplate: function(data) {
                return '<div class="custom-history-item">' +
                    '<span class="history-text">' + kendo.htmlEncode(data.text) + '</span>' +
                    '<span class="history-time">' + kendo.toString(data.timestamp, data.timestampFormat) + '</span>' +
                    '</div>';
            }            
        },
    },
    dataSource: products
});
```

## Suggested Links

* [Semantic Search Mode](slug:smartbox_semantic_search_mode)
* [Grid Searching]({% slug searchpanel_kendoui_grid_widget %})
* [AI Assistant Tools Setup](slug:ai_assistant_tools_setup)
* [AI Service Setup](slug:smart_ext_kendoui_grid)
* [Smart Grid Overview](slug:overview_smart_grid)
* [Grid Configuring the ToolBar]({% slug toolbar_kendoui_grid_widget%})
* [API Reference of the Grid](/api/grid)
