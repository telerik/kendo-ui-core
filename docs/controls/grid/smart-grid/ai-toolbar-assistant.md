---
title: AI Toolbar Assistant
description: "Learn how to use the AI Toolbar Assistant in the Kendo UI for jQuery Grid to enable your end users to interact with your data using natural language prompts."
slug: ai_toolbar_tool
position: 5
components: ["grid"]
---

# Kendo UI for jQuery Data Grid AI Toolbar Assistant

The Kendo UI for jQuery Grid provides a built-in AI Toolbar Assistant pattern that allows users to interact with the Grid using natural language prompts. Use this feature to enable your end users to perform complex operations like filtering data, reordering columns, and highlighting rows without having to use the specific UI controls.

>tip For an enhanced user experience with additional search capabilities, prompt suggestions, and streamlined UI, we recommend using the [AI Smart Box](slug:ai_toolbar_tool_kendoui_grid). The AI Smart Box combines traditional search, semantic search, and AI-powered operations in a single, unified interface.

The AI Toolbar Assistant interprets user requests and automatically applies the corresponding Grid operations, making data exploration more intuitive and accessible. The toolbar tool consists of a [Window](slug:overview_kendoui_window_widget) component and an [AIPrompt](slug:overview_kendoui_aiprompt_component) component that work together to enable natural language interaction with your custom AI service.

> The demo in this article uses a Telerik-hosted AI service for demonstration purposes only. For production applications, you should [implement your own AI service](slug:smart_ext_kendoui_grid) that understands your specific domain, data, and business requirements.

The following example demonstrates a Smart Grid that processes natural language requests for performing data operations, column management, selection, highlighting, and export operations.

<demo metaUrl="grid/ai/ai-data-operations/" height="720"></demo>

## Implementation Steps

To configure the Grid's AI Toolbar Assistant:

1. Enable the desired data operations of the Grid that the AI Toolbar Assistant should control:
        ```html
        <div id="grid"></div>
        <script>
        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    data: customers,
                    pageSize: 20
                },
                groupable: true,
                sortable: true,
                filterable: { mode: "menu" },
                toolbar: [{ template: '<button id="ai-assistant" class="k-button">AI Assistant</button>' }]
            });
        });
        </script>
        ```

1. Add a toolbar button and wire it to an AI assistant handler. In the jQuery setup you typically add a toolbar template and attach a click handler that opens the assistant UI and sends user queries to your AI service:

        ```javascript
        // Example: open a simple prompt and send the user's query to your AI service
        function sendToAI(query) {
            return fetch("https://your-ai-service.com/api/grid", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: query })
            }).then(r => r.json());
        }

        $(document).on('click', '#ai-assistant', async function() {
            var grid = $("#grid").data("kendoGrid");
            var query = prompt("Ask the assistant:");
            if (!query) { return; }
            var response = await sendToAI(query);
            // Apply operations returned by the AI service to the grid
            if (response.filter) {
                grid.dataSource.filter(response.filter);
            }
            if (response.sort) {
                grid.dataSource.sort(response.sort);
            }
            if (response.group) {
                grid.dataSource.group(response.group);
            }
        });
        ```

1. Configure the AI service endpoint used by your click handler or assistant helper. For example, the `sendToAI` helper above calls `https://your-ai-service.com/api/grid`.

    > The AI service endpoint defines where your natural language queries will be processed. It should point to [your custom AI service](slug:smart_ext_kendoui_grid) that can understand your domain-specific data and business logic.

## AI Service Communication

The AI Toolbar Assistant supports three main integration approaches for connecting to your AI service:

- [Automatic Integration](slug:ai_assistant_tools_setup#automatic-integration)&mdash;The quickest approach where the Grid handles the communication with your AI service automatically.
- [Controlled Integration](slug:ai_assistant_tools_setup#controlled-integration)&mdash;Automatic AI service communication with request/response customization through event handlers.
- [Manual Integration](slug:ai_assistant_tools_setup#manual-integration)&mdash;Full control over AI service communication while using the built-in toolbar tool UI.

For detailed information about each integration approach, including code examples and best practices, see [Smart Grid AI Assistant Tools Setup](slug:ai_assistant_tools_setup).

## Customization Options

The AI Toolbar Assistant provides various configuration options to customize the experience based on your application requirements:

- [AIPrompt customization](#aiprompt-customization)
- [Window appearance](#window-appearance)

### AIPrompt Customization

The AI Toolbar Assistant utilizes the [AIPrompt](slug:overview_kendoui_aiprompt_component) component internally to provide conversational interface. You can customize the AIPrompt interface and user interaction by using the [`ai`](/api/javascript/ui/grid/configuration/ai) property of the tool.

This property allows you to add [`promptSuggestions`](slug:/api/javascript/ui/grid/configuration/ai.aiassistant.promptsuggestions) tailored to your specific use case that can guide users with examples of what your AI service can understand. Furthermore, the [`speechToTextButton`](/api/javascript/ui/grid/configuration/ai.aiassistant.speechtotext) setting provides voice input capabilities for enhancing accessibility in your application.

```javascript
// Pass prompt settings to your assistant helper or use them when rendering the assistant UI
var aiPromptSettings = {
    promptSuggestions: [
        'Sort by Amount descending',
        'Group by account type',
        'Show only failed transactions',
        'Filter where currency is USD',
        'Clear filtering'
    ],
    showOutputRating: true,
    speechToTextButton: true
};
```

### Window Appearance

You can also customize the appearance of the [Window](slug:overview_kendoui_window_widget) component, in which the AIPrompt of the toolbar tool is rendered. 

To achieve this, use the [`aiassistantwindow`](/api/javascript/ui/grid/configuration/ai.aiassistantwindow) property of the `kendoGridAIAssistantTool` directive, which allows you to control the positioning and visual appearance of the Window to match your application's design and requirements.

```javascript
var aiWindowSettings = {
    width: 500,
    height: 400,
    title: 'Data Assistant',
    resizable: true,
    draggable: true
};
// Use these settings in the assistant window implementation you provide.
```

## Suggested Links

* [Smart Grid AI Assistant Tools Setup](slug:ai_assistant_tools_setup)
* [AI Service Setup](slug:smart_ext_kendoui_grid)
* [Smart Grid Overview](slug:overview_smart_grid)
* [Grid Configuring the ToolBar](slug:toolbar_kendoui_grid_widget)
* [AIPrompt Overview](slug:overview_kendoui_aiprompt_component)
* [API Grid](/api/javascript/ui/grid/)
