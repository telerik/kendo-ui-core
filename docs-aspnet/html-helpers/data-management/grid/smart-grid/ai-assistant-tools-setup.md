---
title: AI Assistant Tools Setup
description: "Learn more about the different approaches for setting up the AI Assistant Tools of the Smart Grid and integrating them with your AI service."
slug: ai_assistant_tools_setup
position: 1
components: ["grid"]
---

# {{ site.framework }} Smart Grid AI Assistant Tools Setup

The Smart Grid provides an AI Toolbar Assistant that enables you to apply Grid operations through natural language prompts. The Grid supports three main approaches for connecting this tool to your backend AI service, allowing you to choose the level of control that best fits your application requirements.

The AI Assistant tools that support these approaches for integrating with your AI service are:

<Row>
  <Column count={[24,24,12]}>
    <Component className="tile pd-b" href="slug:ai_toolbar_tool_core_grid">
      <ComponentTitle>AI Smart Box</ComponentTitle>
      <ComponentDescription>Versatile search box that supports the AI service integration approaches when in AI Assistant mode.</ComponentDescription>
    </Component>
  </Column>
  <Column count={[24,24,12]}>
    <Component className="tile pd-b" href="slug:ai_toolbar_tool_core_grid">
      <ComponentTitle>AI Toolbar Assistant</ComponentTitle>
      <ComponentDescription>AI Assistant toolbar button for applying AI-powered Grid operations.</ComponentDescription>
    </Component>
  </Column>
</Row>

Choose an integration approach based on how much control you need over the AI communication:

- [Automatic Integration](#automatic-integration)&mdash;The quickest approach where the Grid handles the communication with your AI service automatically.
- [Controlled Integration](#controlled-integration)&mdash;Automatic AI service communication with request/response customization through event handlers.
- [Manual Integration](#manual-integration)&mdash;Full control over AI service communication while using the built-in toolbar tool UI.

>tip Each integration approach requires a backend AI service to process natural language prompts and return structured Grid commands. For guidance on implementing your backend service, see the [AI Service Setup](slug:smart_ext_core_grid) article.

## Automatic Integration

The automatic approach is the quickest way to integrate AI Assistant functionality with your Grid. The AI Assistant tool handles all communication with your AI service internally through HTTP requests.

To configure automatic integration, configure the Grid's `Ai.Service` property to point to your AI service endpoint where the natural language prompts will be processed.

> For runnable examples of automatic integration, see the [AI Smart Box](slug:ai_toolbar_tool_core_grid) and [AI Toolbar Assistant](slug:ai_toolbar_tool_core_grid) articles.

```HtmlHelper AI Smart Box
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar =>
            {
                toolbar.SmartBox();
            })
            .SmartBox(sb => sb.Events(ev => ev.SemanticSearch("onSemanticSearch"))
                .SearchSettings(s => s.Enabled(true).History(true))
                .SemanticSearchSettings(ss => ss.Enabled(true))
                .AiAssistantSettings(ai => ai.Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state"))
            )
        )
    )
```
{% if site.core %}
```TagHelper AI Smart Box Tag Helper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="smartBox"></toolbar-button>
      </toolbar>
      <smart-box>
        <search-settings enabled="true" history="true" />
        <semantic-search-settings enabled="true" />
        <ai-assistant-settings>
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
        </ai-assistant-settings>
      </smart-box>
      <data-source>
        <transport>
          <read url="/Grid/ECommerceProducts_Read" />
        </transport>
        <page-size>12</page-size>
      </data-source>
    </kendo-grid>
```
{% endif %}

```HtmlHelper AI Toolbar Assistant
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
             .ToolBar(t =>
            {
                t.AIAssistant();
            })
            .AI(ai => ai
                .Service("https://demos.telerik.com/service/v2/ai/grid/smart-state")
            )
    )
```
{% if site.core %}
```TagHelper AI Toolbar Assistant Tag Helper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="aiAssistant"></toolbar-button>
      </toolbar>
      <ai>
        <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
      </ai>
    </kendo-grid>
```
{% endif %}

When using automatic integration, the Grid sends HTTP requests to your AI service endpoint. The Grid generates the request body in the appropriate format and expects a `GridAIResponse` object in return from [your backend service](slug:smart_ext_core_grid).

> For more details about the expected request/response structure and available command types, refer to the [AI Service Setup](slug:smart_ext_core_grid#request-and-response-format) article.

## Controlled Integration

In the controlled approach, you maintain full control over the AI Assistant tool's state and behavior while leveraging built-in AI service communication. This allows you to validate AI responses and apply custom business logic before executing operations.

The controlled integration allows you to provide a `service Url` for [automatic request handling](#automatic-integration) while intercepting [appropriate events](#event-handling) to modify request options or customize response handling.

You can customize the AI request before it is sent to your backend service by handling the `aiPromptRequest` event. This allows you to add custom headers, modify request data, or add authentication tokens.

The following example demonstrates controlled integration where the AI Toolbar Assistant still handles the HTTP request automatically, but the interaction is customized through request and response event handlers.

```csharp Razor AI Smart Box
@(
  Html.Kendo().Grid<EcommerceProduct>()
    .Name("grid")
    .ToolBar(toolbar => { toolbar.SmartBox(); })
    .SmartBox(sb => sb
      .ActiveMode("AIAssistant")
      .AiAssistantSettings(a => a.Enabled(true)
        .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state")))
      .Events(ev => ev
        .AiAssistantPromptRequest("aiAssistantPromptRequest")
        .AiAssistantResponseSuccess("aiAssistantResponseSuccess"))
    )
)
<script>
  function aiAssistantPromptRequest(e) {
    // Customize request before sending
    e.request.columns.forEach(function(col) {
      if (col.field === "Status") {
        col.values = ["Active", "Pending", "Completed"];
      }
    });
  }

  function aiAssistantResponseSuccess(e) {
    // Handle response after receiving
    console.log("AI response:", e.response);
  }
</script>
```
{% if site.core %}
```TagHelper AI Smart Box Tag Helper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <smart-box active-mode="AIAssistant">
        <ai-assistant-settings on-ai-assistant-prompt-request="aiAssistantPromptRequest"  on-ai-assistant-response-success="aiAssistantResponseSuccess">
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
        </ai-assistant-settings>
      </smart-box>
      <data-source>
        <transport>
          <read url="/Grid/ECommerceProducts_Read" />
        </transport>
      </data-source>
    </kendo-grid>

    <script>
      function aiAssistantPromptRequest(e) {
        // Customize request before sending
        e.request.columns.forEach(function(col) {
          if (col.field === "Status") {
            col.values = ["Active", "Pending", "Completed"];
          }
        });
      }

      function aiAssistantResponseSuccess(e) {
        // Handle response after receiving
        console.log("AI response:", e.response);
      }
    </script>
```
{% endif %}
```csharp Razor AI Toolbar Assistant
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
             .ToolBar(t =>
            {
                t.AIAssistant();
            })
            .AI(ai => ai
                .Service("https://demos.telerik.com/service/v2/ai/grid/smart-state")
                .Events(ev => ev
                    .PromptRequest("aiAssistantPromptRequest")
                    .PromptResponse("aiAssistantResponseSuccess"))
            )
    )

    <script>
        function aiAssistantPromptRequest(e) {
        // Customize request before sending
        e.request.columns.forEach(function(col) {
          if (col.field === "Status") {
            col.values = ["Active", "Pending", "Completed"];
          }
        });
      }

      function aiAssistantResponseSuccess(e) {
        // Handle response after receiving
        console.log("AI response:", e.response);
      }
```
{% if site.core %}
```TagHelper AI Toolbar Assistant Tag Helper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="aiAssistant"></toolbar-button>
      </toolbar>

      <ai on-prompt-request="aiAssistantPromptRequest"   on-prompt-response="aiAssistantResponseSuccess">
        <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
      </ai>

      <data-source type="aspnetmvc-ajax">
        <transport>
          <read action="ECommerceProducts_Read" controller="Grid" />
        </transport>
      </data-source>
    </kendo-grid>

    <script>
      function aiAssistantPromptRequest(e) {
        // Customize request before sending
        e.request.columns.forEach(function(col) {
          if (col.field === "Status") {
            col.values = ["Active", "Pending", "Completed"];
          }
        });
      }

      function aiAssistantResponseSuccess(e) {
        // Handle response after receiving
        console.log("AI response:", e.response);
      }
    </script>
```
{% endif %}

## Manual Integration

For full control over the AI interaction, implement custom HTTP communication with your AI service by handling the `AiPromptRequest` and `AiPromptResponse` events.

This approach gives you complete control over how requests are sent and responses are processed, making it suitable for complex scenarios or proprietary AI systems.

>tip When implementing manual integration, use the Grid's [built-in helper methods](#helper-methods) to simplify request generation and response processing while maintaining full control over the HTTP communication.

The following example demonstrates manual integration using the helper methods:

```csharp Razor AI Smart Box
@(
  Html.Kendo().Grid<EcommerceProduct>()
    .Name("grid")
    .ToolBar(toolbar => { toolbar.SmartBox(); })
    .SmartBox(sb => sb
      .ActiveMode("AIAssistant")
      .AiAssistantSettings(a => a.Enabled(true)
        .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state")))
      .Events(ev => ev
        .AiAssistantPromptRequest("aiAssistantPromptRequest")
        .AiAssistantResponseSuccess("aiAssistantResponseSuccess"))
    )
)
<script>
  function aiAssistantPromptRequest(e) {
    e.preventDefault(); // Prevent default request

        // Send custom AJAX request
        $.ajax({
          url: "https://your-ai-service.com/api/grid",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(e.request),
          success: function(response) {
            // Process the response
            var grid = $('#grid').data('kendoGrid');
            grid.trigger("aiPromptResponse", { response: response });
          },
          error: function(xhr, status, error) {
            console.error("AI request failed:", error);
          }
        });
  }

  function aiAssistantResponseSuccess(e) {
    // Handle response after receiving
    console.log("AI response:", e.response);
  }
</script>
```
{% if site.core %}
```TagHelper AI Smart Box Tag Helper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <smart-box active-mode="AIAssistant">
        <ai-assistant-settings
            on-ai-assistant-prompt-request="aiAssistantPromptRequest"  on-ai-assistant-response-success="aiAssistantResponseSuccess">
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
        </ai-assistant-settings>
      </smart-box>

      <data-source type="aspnetmvc-ajax">
        <transport>
          <read action="ECommerceProducts_Read" controller="Grid" />
        </transport>
      </data-source>
    </kendo-grid>

    <script>
      function aiAssistantPromptRequest(e) {
        e.preventDefault(); // Prevent default request

        // Send custom AJAX request
        $.ajax({
          url: "https://your-ai-service.com/api/grid",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(e.request),
          success: function(response) {
            // Process the response
            var grid = $("#grid").data("kendoGrid");
            grid.trigger("aiPromptResponse", { response: response });
          },
          error: function(xhr, status, error) {
            console.error("AI request failed:", error);
          }
        });
      }

      function aiAssistantResponseSuccess(e) {
        // Handle response after receiving
        console.log("AI response:", e.response);
      }
    </script>
```
{% endif %}
```csharp Razor AI Toolbar Assistant
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
         .ToolBar(t =>
        {
            t.AIAssistant();
        })
        .AI(ai => ai
            .Service("https://demos.telerik.com/service/v2/ai/grid/smart-state")
            .Events(ev => ev
                .PromptRequest("aiAssistantPromptRequest")
                .PromptResponse("aiAssistantResponseSuccess"))
        )
)

<script>
    function aiAssistantPromptRequest(e) {
        e.preventDefault(); // Prevent default request

        // Send custom AJAX request
        $.ajax({
          url: "https://your-ai-service.com/api/grid",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(e.request),
          success: function(response) {
            // Process the response
            var grid = $('#grid').data('kendoGrid');
            grid.trigger("aiPromptResponse", { response: response });
          },
          error: function(xhr, status, error) {
            console.error("AI request failed:", error);
          }
        });
  }

  function aiAssistantResponseSuccess(e) {
    // Handle response after receiving
    console.log("AI response:", e.response);
  }
```
{% if site.core %}
```TagHelper AI Toolbar Assistant Tag Helper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="aiAssistant"></toolbar-button>
      </toolbar>

      <ai on-prompt-request="aiAssistantPromptRequest"   on-prompt-response="aiAssistantResponseSuccess">
        <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
      </ai>

      <data-source type="aspnetmvc-ajax">
        <transport>
          <read action="ECommerceProducts_Read" controller="Grid" />
        </transport>
      </data-source>
    </kendo-grid>

    <script>
      function aiAssistantPromptRequest(e) {
        e.preventDefault(); // Prevent default request

        // Send custom AJAX request
        $.ajax({
          url: "https://your-ai-service.com/api/grid",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(e.request),
          success: function(response) {
            var grid = $("#grid").data("kendoGrid");
            grid.trigger("aiPromptResponse", { response: response });
          },
          error: function(xhr, status, error) {
            console.error("AI request failed:", error);
          }
        });
      }

      function aiAssistantResponseSuccess(e) {
        // Handle response after receiving
        console.log("AI response:", e.response);
      }
    </script>
```
{% endif %}

## Helper Methods

The Grid provides built-in helper methods that simplify working with AI service requests and responses when implementing [manual integration](#manual-integration). These methods handle the complexities of request formatting and response processing, allowing you to focus on the HTTP communication logic specific to your application.

<table>
    <thead>
        <tr>
            <th width="25%">Method</th>
            <th width="75%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/methods/getairequest"><code>getAIRequest()</code></a></td>
            <td>Generates the request body for your AI service based on the user's prompt. Returns a <a href="slug:smart_ext_core_grid#request-structure"><code>GridAIRequest</code></a> object containing the <code>role</code> (defaults to <code>"user"</code>), <code>contents</code> array with the prompt text, and <code>columns</code> array with Grid column information.</td>
        </tr>
        <tr>
            <td><a href="https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/methods/handleairesponse"><code>handleAIResponse()</code></a></td>
            <td>Processes the <a href="slug:smart_ext_core_grid#response-structure"><code>GridAIResponse</code></a> returned by your AI service and automatically applies all supported Grid operations including data operations, column management, selection, highlighting, and export.</td>
        </tr>
    </tbody>
</table>

If you implement your backend AI service with the help of the [Smart Extensions library](slug:overview_smart_grid#smart-extensions), these helper methods generate requests and process responses in the compatible format. For fully [custom backend implementations](slug:overview_smart_grid#custom-implementation), you can control how to define the request/response structure as needed for your specific AI service.


## Event Handling

The AI Assistant tools provide events for enhanced control over the AI interaction process and comprehensive request lifecycle management:

<TabStrip>
<TabStripTab title="AI Smart Box">

- [`AiAssistantPromptRequest`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.aiassistantpromptrequest)&mdash;Emits before the SmartBox tool sends the AI request in AI Assistant mode.
- [`AiAssistantCancelRequest`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.aiassistantcancelrequest)&mdash;Emits when the user clicks the cancel button in AI Assistant mode.
- [`AiAssistantResponseSuccess`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.aiassistantresponsesuccess)&mdash;Emits when the SmartBox tool completes the AI request successfully.
- [`AiAssistantResponseError`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.aiassistantresponseerror)&mdash;Emits when the SmartBox tool completes the AI request with an error.
- [`Open`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.open)&mdash;Emits when the SmartBox tool opens.
- [`Close`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.close)&mdash;Emits when the SmartBox tool closes.

</TabStripTab>
<TabStripTab title="AI Toolbar Assistant">

- [`PromptRequest`](/api/kendo.mvc.ui.fluent/aiprompteventbuilder#promptrequestsystemstring)&mdash;Triggered when the prompt view Generate output button is clicked.
- [`PromptResponse`](/api/kendo.mvc.ui.fluent/aiprompteventbuilder#promptresponsesystemfunc)&mdash;Triggered when the AI service response is received.
- [`PromptRequestCancel`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.aiassistantresponsesuccess)&mdash;Emits when a prompt request is cancelled.
- [`CommandExecute`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/smartbox.aiassistantresponseerror)&mdash;Emits when a command item from the Commands view is clicked.

</TabStripTab>
</TabStrip>

## Suggested Links

* [AI Service Setup](slug:smart_ext_core_grid)
* [Smart Grid Overview](slug:overview_smart_grid)
* [AI Toolbar Assistant](slug:ai_toolbar_tool_core_grid)
* [Custom AI Column](slug:custom_ai_column_core_grid)
* [Smart Extensions](slug:smart_ext_core_grid)
* [jQuery Grid Overview]({% slug htmlhelpers_grid_aspnetcore_overview %})

<!-- Remove after the cards are fixed in docs-builder -->
<style>
.pd-b div:first-child {
  padding-top: 10px;
}
</style>
