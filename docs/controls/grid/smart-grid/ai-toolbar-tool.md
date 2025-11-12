---
title: AI Toolbar Assistant
description: "Learn how to use the AI Assistant Toolbar Tool in the Kendo UI for jQuery Grid to interact with your data using natural language prompts."
slug: ai_toolbar_tool_kendoui_grid
position: 1
---

#  jQuery Data Grid AI Toolbar Assistant

The [jQuery Grid]({% slug overview_kendoui_grid_widget %}) provides a built-in AI Assistant toolbar tool that allows users to interact with the Grid using natural language prompts. Use this feature to enable your end users to perform complex data operations like sorting, filtering, grouping, and highlighting without having to use the specific UI controls.

The AI Assistant interprets user requests and automatically applies the corresponding Grid operations, making data exploration more intuitive and accessible. The toolbar integrates an [AIPrompt]({% slug overview_kendoui_aiprompt_component %}) component that enables natural language interaction with your custom AI service.

## AI Assistant Tool Basic Set Up

> The desired data operations ([`filterable`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/filterable), [`sortable`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/sortable), [`groupable`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/groupable), [`selectable`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/selectable), [`reorderable`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/reorderable), [`pageable`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/pageable), and [`resizable`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/resizable)) must be enabled for the Grid, so that the AI Assistant can perform them on the Grid data.

To configure the Grid's AI Assistant toolbar tool:

1. Set up data binding in the Grid and enable the required data operations that the AI should control:

  ```
    sortable: true,
    filterable: true,
    groupable: true,
    selectable: true,
    reorderable: true,
    pageable: true,
    resizable: true
  ```

2. Enable the `aiAssistant` tool in the Grid's [toolbar](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/toolbar):

  ```
  toolbar: [
      {
        name: "aiAssistant",
      }
    ],
  ```

3. Configure the [`ai.service`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.service) to point to your custom AI service endpoint:

  ```
  ai: {
    service: "/service-url"      
  },
  ```

The `ai.service` defines the endpoint where your natural language queries will be processed. It must point to your custom AI service that can understand your domain-specific data and business logic.

### Row Highlighting
 
One of the key features of the AI Assistant toolbar tool is the ability to visually highlight Grid rows based on natural language prompts. When users enter prompts containing the word **highlight**, the Grid automatically processes the request and applies visual highlighting to the matching data.
 
The highlighting functionality enables users to quickly identify and visualize data patterns without having to manually configure filters or complex search criteria. The AI service interprets the natural language request and determines which rows must be highlighted based on the specified conditions.
 
Common highlighting use cases include:
 
- **Conditional highlighting**&mdash;"Highlight rows where age is above 60" will visually emphasize all rows meeting that criteria.
- **Date-based highlighting**&mdash;"Highlight all admissions after July 15th, 2024" will mark rows with dates matching the condition.
- **Status-based highlighting**&mdash;"Highlight rows with critical patients" will emphasize rows based on status values.
- **Numeric range highlighting**&mdash;"Highlight risk scores between 30% and 50%" will highlight rows within the specified range.
- **Clear highlighting**&mdash;"Clear highlighting" will remove all applied highlighting effects.
 
Users can combine highlighting with other data operations like filtering, sorting, and grouping.

## AI Service Integration

The AI Assistant toolbar tool supports two main integration approaches depending on how you want to handle AI service communication:

- [Automatic integration](#automatic-integration)
- [Manual integration](#manual-integration)

### Automatic Integration

In the automatic approach, the AI Assistant toolbar tool handles all communication with your AI service internally through HTTP requests. You simply need to configure the [`ai.service`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.service) property to point to your custom AI service endpoint.

The following example demonstrates a Grid with AI Assistant functionality that processes natural language requests for data operations:

  ```dojo
      <script src="../content/shared/js/products.js"></script>
      <div id="grid"></div>
      <script>
        $(document).ready(function () {
          $("#grid").kendoGrid({
            toolbar: [
              {
                name: "aiAssistant",
              }
            ],
            ai: {
              service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"       
            },
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" },
                  },
                },
              },
              pageSize: 20,
            },
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            groupable: true,
            selectable:true, 
            reorderable: true,
            resizable: true, 
            pageable: {
              input: true,
              numeric: false,
            },
            columns: [
              "ProductName",
              {
                field: "UnitPrice",
                title: "Unit Price",
                format: "{0:c}",
                width: "130px",
              },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
              { field: "Discontinued", width: "130px" },
            ],
          });
        });
      </script>
  ```

With automatic integration, the Grid is configured to work directly with your AI service. If the service returns the correct descriptors, the Grid can automatically interpret and apply the requested operations, enabling seamless setup and usage without additional manual configuration.

The examples below represent sample responses for the basic data operations:

- Filtering&mdash;Accepts an object with filter conditions and logic operators.

  ```
    {
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Currency",
            "operator": "eq",
            "value": "USD"
          }
        ]
      },
      "messages": [
        "Filtered by the field Currency with the value equal to USD"
      ]
    }
  ```

- Sorting&mdash;Accepts an array of objects specifying field names and sort directions.

  ```
    {
      "sort": [
        {
          "field": "Amount",
          "dir": "desc"
        }
      ],
      "messages": [
        "Sorted by the field Amount in descending order."
      ]
    }
  ```

- Grouping&mdash;Accepts an array of objects defining the fields to group by.

  ```
    {
      "group": [
        {
          "field": "AccountType",
          "dir": "desc"
        }
      ],
      "messages": [
        "Grouped by the field AccountType in descending order."
      ]
    }
  ```

- Selecting&mdash;Accepts an array of objects representing the rows that match the criteria.

  ```
    {
      "commands": [
          {
              "select": {
                  "logic": "and",
                  "filters": [
                      {
                          "field": "Fee",
                          "operator": "gt",
                          "value": 10
                      }
                  ],
                  "cells": {}
              },
              "type": "GridSelect",
              "message": "Row is selected if its field \u0027Fee\u0027 is greater than 10"
          }
      ],
      "message": null
    }
  ```

- Resizing&mdash;Accepts an array of objects defining the field that is to be resized.

  ```
    {
      "commands": [
          {
              "size": "250px",
              "id": "62ac50e3-80c2-4bab-a720-d21db7a56f3c",
              "type": "GridColumnResize",
              "message": "Column \u002762ac50e3-80c2-4bab-a720-d21db7a56f3c\u0027 resized to 250px width."
          }
      ],
      "message": null
    }
  ```

- Paging&mdash;Accepts an array of objects defining either the page size you wish to set, or the page you wish to navigate to.

  ```
    {
      "commands": [
          {
              "pageSize": 25,
              "type": "GridPageSize",
              "message": "Changed page size to 25 items per page."
          }
      ],
      "message": null
    }
  ```

  ```
    {
      "commands": [
          {
              "page": 2,
              "type": "GridPage",
              "message": "Changed to page 2."
          }
      ],
      "message": null
    }
  ```

- Reordering&mdash;Accepts an array of objects containing information about the column you wish to reorder, and its new position.

  ```
    {
      "commands": [
          {
              "position": 2,
              "id": "961a4381-c882-4364-a700-010ac99f3022",
              "type": "GridColumnReorder",
              "message": "Column \u0027961a4381-c882-4364-a700-010ac99f3022\u0027 moved to position 3."
          }
      ],
      "message": null
    }
  ```

### Manual Integration

For full control over the AI interaction, you can manually integrate your AI service by handling the [`promptRequest`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.aiAssistant.promptRequest) event of the tool. This allows you to perform entirely custom requests to your AI service while using the UI that the `aiAssistant` provides.

The `promptRequest` event provides useful information that you can use in your custom AI service integration. The `requestData` field of the event contains the user's prompt, Grid column information and HTTP request settings, while `isRetry` indicates whether this is a retry attempt. 

When the response from the service is received, you can utilize the [`promptResponse`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.aiAssistant.promptResponse) event and handle the returned data.

ai: {
     aiAssistant: {
       promptResponse: (e) => {
          //.....
       } 
     },
   }
  ```javascript
    ai: {
      aiAssistant: {
        promptResponse: (e) => {
          //.....
        } 
      },
    }
  ```

In the [`aiAssistant`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.aiAssistant) configuration, you can handle all events provided by the integrated [AIPrompt](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/aiprompt#events) component. 

This event details allows you to implement fully customized AI service communication while maintaining access to the Grid context and user input.


## Customization Options

The AI Assistant toolbar tool provides various configuration options to customize the experience based on your application requirements:

- [AIPrompt customization](#aiprompt-customization)
- [Window appearance](#window-appearance)

### AIPrompt Customization

The AI Assistant toolbar tool utilizes the [AIPrompt]({% slug overview_kendoui_aiprompt_component %}) component internally to provide a conversational interface. You can customize the AIPrompt interface and user interaction by using the [`ai.aiAssistant`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.aiAssistant) property of the tool.

This property allows you to add [`promptSuggestions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.promptSuggestions) tailored to your specific use case that can guide users with examples of what your AI service can understand. Furthermore, the [`speechToTextButton`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/speechtotextbutton) setting provides voice input capabilities for enhancing accessibility in your application.

    ```dojo
        <script src="../content/shared/js/products.js"></script>
        <div id="grid"></div>
        <script>
          $(document).ready(function () {
            $("#grid").kendoGrid({
              toolbar: [
                {
                  name: "aiAssistant",
                }
              ],
              ai: {
                service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
                aiAssistant: {
                  speechToTextButton: true,
                  promptSuggestions: [
                    "Show me the top selling products",
                    "Sort by highest price"
                  ]
                },
              },
              dataSource: {
                data: products,
                schema: {
                  model: {
                    fields: {
                      ProductName: { type: "string" },
                      UnitPrice: { type: "number" },
                      UnitsInStock: { type: "number" },
                      Discontinued: { type: "boolean" },
                    },
                  },
                },
                pageSize: 20,
              },
              height: 550,
              scrollable: true,
              sortable: true,
              selectable: true,
              resizable: true,
              reorderable: true,
              filterable: true,
              groupable: true,
              pageable: {
                input: true,
                numeric: false,
              },
              columns: [
                "ProductName",
                {
                  field: "UnitPrice",
                  title: "Unit Price",
                  format: "{0:c}",
                  width: "130px",
                },
                { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
                { field: "Discontinued", width: "130px" },
              ],
            });
          });
        </script>
    ```

### Window Appearance

You can also customize the appearance of the [Window](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/window/) component, in which the AIPrompt of the toolbar tool is rendered. 

To achieve this, use the [`ai.aiassistantwindow`]https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/ai.aiassistantwindow) property, which allows you to control the positioning and visual appearance of the Window to match your application's design and requirements.

  ```
      aiassistantwindow: {
            width: 500,
            height: 460
        }
  ```


## Suggested Links

* [JavaScript API Reference of the Kendo UI for jQuery Grid](/api/javascript/ui/grid)
* [AI Toolbar Assistant in Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/ai-toolbar)
* [AI Toolbar Tool - Highlight in Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/ai-toolbar)
* [AIPrompt Overview Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/aiprompt/overview)
