---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} InlineAIPrompt component by following a complete step-by-step tutorial."
components: ["inlineaiprompt"]
slug: inline_aiprompt_getting_started
position: 1
---

# Getting Started with the InlineAIPrompt

This tutorial explains how to set up the Telerik UI for {{ site.framework }} InlineAIPrompt and goes through the steps in the configuration of the component.

After completing this guide, you will achieve the following results:

 ![Sample Telerik UI for {{ site.framework }} InlineAIPrompt](images/inlineaiprompt-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#component-gs-prerequisites)

## 1. Prepare the CSHTML File

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, paragraphs, and others.

```HtmlHelper
    @using Kendo.Mvc.UI

    <h4>Generate responses using the InlineAIPrompt</h4>
    <div>

    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <h4>Generate responses using the InlineAIPrompt</h4>
    <div>

    </div>
```
{% endif %}

## 2. Initialize the InlineAIPrompt

Use the InlineAIPrompt HtmlHelper {% if site.core %}or TagHelper{% endif %} to configure the component.

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the InlineAIPrompt element.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineAi")
        .Placeholder("Type your prompt here...")
        .Popup(p => p.Width(400))
    )
```
{% if site.core %}
```TagHelper
    <kendo-inlineaiprompt name="inlineAi"
        placeholder="Type your prompt here..."
    >
        <popup width="400" />
    </kendo-inlineaiprompt>
```
{% endif %}

## 3. Add the Service URL

Configure the AI service endpoint that will process the prompts. The [`Url`](https://www.telerik.com/aspnet-core-ui/documentation/api/kendo.mvc.ui.fluent/inlineaipromptservicesettingsbuilder#urlsystemstringsystemstring) option specifies the backend endpoint for AI completion requests.

The example in this article uses a Telerik-hosted AI service for demonstration purposes only.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineAi")
        .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/completion"))
        ...... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    <kendo-inlineaiprompt name="inlineAi"
    >
        <service url="https://demos.telerik.com/service/v2/ai/completion" /> 
        <!--Other configuration-->
    </kendo-inlineaiprompt>
```
{% endif %}

## 4. Adding Prompt Commands

Prompt commands are predefined actions that you can apply to the content for which the InlineAIPrompt is displayed. These commands offer a quick way to refine or enhance text—such as improving clarity, shortening the message, or correcting grammar—without needing to write a custom prompt.

The example below demonstrates how to configure commands in the InlineAIPrompt component to streamline text editing tasks.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineAi")
        .Commands(commands =>
        {
            commands.Add().Id("recipe")
                .Text("Suggest a pizza recipe")
                .Icon("star")
                .Prompt("recipeHandler");

            commands.Add().Id("forecast")
                .Text("What is the weather forecast in Toronto")
                .Icon("flag")
                .Prompt("forecastHandler");
        })
        ...... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    <kendo-inlineaiprompt name="inlineAi"
    >
        <commands>
            <command id="recipe" icon="star" text="Suggest a pizza recipe" prompt="recipeHandler" />
            <command id="forecast" icon="flag" text="What is the weather forecast in Toronto" prompt="forecastHandler" />
        </commands>
        <!--Other configuration-->
    </kendo-inlineaiprompt>
```
{% endif %}
```JS scripts
    <script>
        function recipeHandler() {
            return "Suggest a pizza recipe: "
        }

        function forecastHandler() {
            return "What is the weather forecast in Toronto: "
        }
    </script>
```

## 5. Configure the SystemPrompt Option

Set up the logic for how the system prompt is constructed. The `SystemPrompt` function customizes how the prompt and context are combined before sending to the AI service.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineAi")
        .SystemPrompt("systemPrompt")
        ...... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    <kendo-inlineaiprompt name="inlineAi"
        system-prompt="systemPrompt"
    >
        <!--Other configuration-->
    </kendo-inlineaiprompt>
```
{% endif %}
```JS scripts
    <script>
        function systemPrompt(context, prompt) {
            return prompt + ": " + context;
        }
    </script>
```

## 6. Enable the Speech-to-Text Button

The InlineAIPrompt component supports speech-to-text functionality, allowing users to input prompts using their voice. To enable this feature, set the SpeechToText property to `true`.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineAi")
        .SpeechToText(true)
        ...... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    <kendo-inlineaiprompt name="inlineAi"
        speech-to-text="true"
    >
        <!--Other configuration-->
    </kendo-inlineaiprompt>
```
{% endif %}

## 7. Handle the InlineAIPrompt Events

The InlineAIPrompt exposes events that you can handle and further customize the functionality of the component. In this tutorial, you will use the exposed `PromptRequest` which is triggered before a request has been initiated to the specified service.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineaiprompt")
        .Events(ev => ev.PromptRequest("onPromptRequest"))
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-inlineaiprompt name="inlineaiprompt" on-prompt-request="onPromptRequest">
       <!--Other configuration-->
    </kendo-inlineaiprompt>
```
{% endif %}
```JS scripts
    <script>
        function onPromptRequest(e) {
            console.log("Prompt requested");
        }
    </script>
```

## 8. (Optional) Reference Existing InlineAIPrompt Instances

Referencing existing component instances allows you to build on top of their configuration. To reference an existing InlineAIPrompt instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method.

1. Use the `Name()` option of the component to establish a reference.

    ```JS script
        <script>
            var inlineaipromptReference = $("#inlineAi").data("kendoInlineAIPrompt"); // inlineaipromptReference is a reference to the existing instance of the helper.
        </script>
    ```

1.  Use the [InlineAIPrompt client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/inlineaiprompt#methods) to control the behavior of the widget. In this example, you will see how to change the current active view (for example, when a button is clicked).

    ```HtmlHelper
        @(Html.Kendo().Button()
            .Name("btn")
            .Content("AI Assistance")
            .Events(ev => ev.Click("onBtnClick")))
        
        <script>
            function onBtnClick() {
                var inlineaipromptReference = $("#inlineAi").data("kendoInlineAIPrompt"); 
                inlineaipromptReference.Open();
            }
        </script>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-button name="btn" on-click="onBtnClick">
            AI Assistance
        </kendo-button>

        <script>
            function onBtnClick() {
                var inlineaipromptReference = $("#inlineAi").data("kendoInlineAIPrompt");
                inlineaipromptReference.open();
            }
        </script>
    ```
    {% endif %}

{% if site.core %}
## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the InlineAIPrompt HtmlHelper](https://netcorerepl.telerik.com/QTOsFwOq52wk8zHQ50)
* [Sample code with the InlineAIPrompt TagHelper](https://netcorerepl.telerik.com/mpOsbGOK54UfTzMe43)

{% endif %}

## Next Steps

* [Configuring the InlineAIPrompt Streaming]({% slug htmlhelpers_streaming_inline_aiprompt %})
* [Using templates in the InlineAIPrompt]({% slug htmlhelpers_templates_inline_aiprompt %})
* [Handling JavaScript Events of the User Interactions]({% slug htmlhelpers_events_inline_aiprompt %}) 

## See Also

* [Using the API of the InlineAIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/inlineaiprompt/api)
* [Client-Side API of the InlineAIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/inlineaiprompt)
* [Server-Side API of the InlineAIPrompt](/api/inlineaiprompt)
{% if site.core %}
* [Server-Side API of the InlineAIPrompt TagHelper](/api/taghelpers/inlineaiprompt)
{% endif %}