---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI for {{ site.framework }} AIPrompt component and how to initialize it."
slug: htmlhelpers_overview_aiprompt
position: 0
---

# {{ site.framework }} AIPrompt Overview

{% if site.core %}
The Telerik UI AIPrompt TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI AIPrompt widget.
{% else %}
The Telerik UI AIPrompt HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI AIPrompt widget.
{% endif %}

The AIPrompt is a standalone view component that helps end users write prompts, use prompt suggestions, and execute predefined commands to interact with a trained language model.

When a prompt is submitted, the component triggers an event that contains information about the prompt and the executed command. You can access this information and use it to create a request to an AI service. When the request response from the AI service is received, the AIPrompt component displays the output as a card with options to copy, retry, or rate the output (with like or dislike reactions).

* [Demo page for the AIPrompt HtmlHelper](https://demos.telerik.com/{{ site.platform }}/aiprompt)
{% if site.core %}
* [Demo page for the AIPrompt TagHelper](https://demos.telerik.com/aspnet-core/aiprompt)
{% endif %}

## Initializing the AIPrompt

The following example demonstrates how to define the AIPrompt.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .PromptSuggestions(new string[] { "Act as [actor] and write [format] about [subject] in [100 words]", "Suggest post about [subject] that will be used in [social media]" })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvcl

    @{
        var promptSuggestionsList = new string[] { "Act as [actor] and write [format] about [subject] in [100 words]", "Suggest post about [subject] that will be used in [social media]" };
    }
    
    <kendo-aiprompt name="aiprompt" prompt-suggestions="promptSuggestionsList">
    </kendo-aiprompt>
```
{% endif %}

## Basic Configuration

The AIPrompt provides options for configuring its views, toolbar items, and appearance options. The following example demonstrates the basic configuration of the AIPrompt.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Events(ev => ev.CommandExecute("onCommandExecute").PromptRequest("onPromptRequest"))
        .Views(views =>
        {
            views.Add().Type(ViewType.Prompt)
            .PromptSuggestions(new string[] { "Out of office (contact colleague)", "LinkedIn post for well-being" });
            views.Add().Type(ViewType.Output);
            views.Add().Type(ViewType.Commands)
            .PromptCommands(commands =>
            {
                commands.Add().Id("1").Text("Extend").Icon("arrows-left-right");
            });
        })
    )

```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvcl
    @{
        var promptSuggestionsList = new string[] { "Out of office (contact colleague)", "LinkedIn post for well-being" };
    }
    
    <kendo-aiprompt name="aiprompt" 
        on-command-execute="onCommandExecute"
        on-prompt-request="onPromptRequest">
        <aiprompt-views>
            <aiprompt-view type="ViewType.Prompt" prompt-suggestions="promptSuggestionsList"></aiprompt-view>
            <aiprompt-view type="ViewType.Output"></aiprompt-view>
            <aiprompt-view type="ViewType.Commands">
                <prompt-commands>
                    <prompt-command id="1" text="Extend" icon="arrows-left-right"></prompt-command>
                </prompt-commands>
            </aiprompt-view>
        </aiprompt-views>
    </kendo-aiprompt>
```
{% endif %}
```Scripts
    <script>
        var defaultResponse = 'For real prompt processing, please connect the component to a preferred AI service.';
        var promptData = [
        {
            suggestion: "Out of office (contact colleague)",
            output: "This is an example of out-of-office template content.",
            extend: "This is an extended version of out-of-office template content."

        },
        {
            suggestion: "LinkedIn post for well-being",
            output: "This is an example of post content.",
            extend: "This is an extended version of the post content."
        }];

        function onCommandExecute(ev) {
            var aipromptWidget = ev.sender; // Get a reference to the AIPrompt.
            if (this.promptOutputs.length > 0) { // Check if the Output view is not empty.
                let output = this.promptOutputs[0].prompt; // Get the first prompt in the Output view.
                const response = promptData.find((s) => s.suggestion === output); // Find the prompt item in the data collection.
                if (response) {
                    let result = { // Construct the modified output.
                        id: kendo.guid(),
                        output: response[ev.item.text.toLowerCase()], // Pass the extended version of the output.
                        prompt: output,
                        isRetry: ev.isRetry
                    };
                    aipromptWidget.addPromptOutput(result); // Add the modified output content when the 'Extend' command is clicked.
                }
            }
        }

        function onPromptRequest(ev) {
            var aipromptWidget = ev.sender; // Get a reference to the AIPrompt.
            const response = promptData.find((s) => s.suggestion === ev.prompt); // Find the prompt item in the data collection.
            const output = {
                id: kendo.guid(),
                output: response?.output || defaultResponse,
                prompt: ev.prompt,
                isRetry: ev.isRetry,
            };

            aipromptWidget.addPromptOutput(output); // Set the output based on the selected prompt suggestion.
            aipromptWidget.activeView(1); // Activate the Output view.
        }
    </script>
```

## Functionality and Features

* [Views]({% slug htmlhelpers_views_aiprompt %})&mdash;The AIPrompt provides predefined and custom views.
* [Templates]({% slug htmlhelpers_templates_aiprompt %})&mdash;The available templates allow you to control the rendering of the views and prompt suggestions layout.
* [Events]({% slug htmlhelpers_events_aiprompt %})&mdash;The component emits a variety of events that allow you to implement custom functionality.
* [Accessibility]({% slug accessibility_aspnetcore_aiprompt %})&mdash;The AIPrompt is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts({% slug keynav_aspnetcore_aiprompt %})] for faster navigation.

## Next Steps

* [Getting Started with the AIPrompt]({% slug aiprompt_getting_started %})
* [Basic Usage of the AIPrompt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt)
{% if site.core %}
* [Basic Usage of the AIPrompt TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/aiprompt)
{% endif %}

## See Also

* [Using the API of the AIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt/api)
* [Server-Side API of the AIPrompt HtmlHelper](/api/aiprompt)
{% if site.core %}
* [Server-Side API of the AIPrompt TagHelper](/api/taghelpers/aiprompt)
{% endif %}
* [Client-Side API of the AIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/aiprompt)
