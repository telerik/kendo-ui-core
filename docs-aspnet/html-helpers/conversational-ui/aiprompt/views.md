---
title: Views
page_title: Views
description: "Configure the prompt, output, and commands views of the Telerik UI for {{ site.framework }} AIPrompt component."
slug: htmlhelpers_views_aiprompt
position: 2
---

# Views

The AIPrompt provides predefined and custom views that you set through the `Views()` configuration.

## Prompt View

The `Prompt` view contains the input where the user enters the prompt, the list of available prompt suggestions, and the **Generate** button to submit the prompt.

To define a collection of prompt suggestions, use the `PromptSuggestions()` option.

The example below shows how to configure the built-in `Prompt` view and specify the prompt suggestions that must be displayed in the view.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Views(views =>
        {
            views.Add().Type(ViewType.Prompt)
            .PromptSuggestions(new string[] { "Out of office template", "LinkedIn post for well-being" });
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        var promptSuggestionsList = new string[] { "Out of office template", "LinkedIn post for well-being" };
    }

    <kendo-aiprompt name="aiprompt">
        <aiprompt-views>
            <aiprompt-view type="ViewType.Prompt" prompt-suggestions="promptSuggestionsList"></aiprompt-view>
        </aiprompt-views>
    </kendo-aiprompt>
```
{% endif %}

## Output View

The `Output` view is the place where the output of the AI request is displayed. The view contains a list of cards, where each card has the following elements:

* Header&mdash;Shows the prompt text.
* Body&mdash;Contains the generated prompt output.
* Actions&mdash;Displays quick actions like a copy-output button, a retry-output button, and an output rating (like and dislike reactions).

The following example demonstrates how to specify the `Output` view as active when the AIPrompt loads and how to hide the built-in output rating that is visible by default.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .ActiveView(1)
        .ShowOutputRating(false)
        .Views(views =>
        {
            views.Add().Type(ViewType.Prompt);
            views.Add().Type(ViewType.Output);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-aiprompt name="aiprompt" active-view="1" show-output-rating="false">
        <aiprompt-views>
            <aiprompt-view type="ViewType.Prompt"></aiprompt-view>
            <aiprompt-view type="ViewType.Output"></aiprompt-view>
        </aiprompt-views>
    </kendo-aiprompt>
```
{% endif %}

## Commands View

The `Commands` view is a predefined view where you can define commands that the user can execute, for example, **Change the formality of the output**, **Select output language**, and more. 

The commands are rendered in the view as a list of items and sub-items. To define the desired commands, use the `PromptCommands()` option.

Clicking a specified command triggers the `CommandExecute` event. You can handle the event and execute the respective action by using client-side logic.

The example below shows how to configure the `Commands` view and specify a custom command that modifies the already generated output when clicked.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Events(ev => ev.CommandExecute("onCommandExecute")) // Handle the 'CommandExecute' event to execute the command logic when it is clicked.
        .Views(views =>
        {
            views.Add().Type(ViewType.Prompt)
            .PromptSuggestions(new string[] { "Out of office (template)", "LinkedIn post for well-being" });
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
    @addTagHelper *, Kendo.Mvc

    @{
        var promptSuggestions = new string[] { "Out of office (template)", "LinkedIn post for well-being" };
    }

    <kendo-aiprompt name="aiprompt" on-command-execute="onCommandExecute">
        <aiprompt-views>
                <aiprompt-view type="ViewType.Prompt" prompt-suggestions="promptSuggestions">
                </aiprompt-view>
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
        var promptData = [
        {
            suggestion: "Out of office (template)",
            output: "This is an example of out-of-office template content.",
            extend: "This is an extended version of out-of-office template content."

        },
        {
            suggestion: "LinkedIn post for well-being",
            output: "This is an example of post content.",
            extend: "This is an extended version of the post content."
        }];

        function onCommandExecute(ev) {
            if (this.promptOutputs.length > 0) { // Check if the Output view is not empty.
                let output = this.promptOutputs[0].prompt; // Get the first prompt in the Output view.
                const response = promptData.find((s) => s.suggestion === output); // Find the prompt item from the data collection.
                if (response) {
                    let result = { // Construct the modified output.
                        id: kendo.guid(),
                        output: response[ev.item.text.toLowerCase()], // Pass the extended version of the output.
                        prompt: output,
                        isRetry: ev.isRetry
                    };
                    this.addPromptOutput(result); // Add the modified output content when the 'Extend' command is clicked.
                }
            }
        }
    </script>
```

## Custom View

You can create a custom view in the AIPrompt component and add custom elements and components.

Define the custom view through the `Views()` configuration and set the `Type()` option to `ViewType.Custom`. Then, use the following options to define the view content:

* `ButtonText` and `ButtonIcon`&mdash;Set the text and icon of the Toolbar item rendered for the custom view.
* `ViewTemplate` and `FooterTemplate`&mdash;Specify the templates for the view content and footer.
* `InitializeComponents`&mdash;Allows you to pass a JavaScript function that executes when the view is rendered. You can initialize widgets in the view content.

The following example demonstrates how to create a custom view that contains a button.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Views(views =>
        {
            views.Add().Type(ViewType.Custom)
            .Name("custom")
            .ButtonText("Custom View")
            .ButtonIcon("pencil")
            .ViewTemplate("<div><p>Custom View</p></div>")
            .FooterTemplate("<div class='k-actions k-actions-start k-actions-horizontal k-prompt-actions'><button ref-custom-button>Click me</button></div>")
            .InitializeComponents("initializeComponents");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-aiprompt name="aiprompt">
        <aiprompt-views>
            <aiprompt-view type="ViewType.Custom" name="custom"
                button-text="Custom View" 
                button-icon="pencil"
                view-template="<div><p>Custom View</p></div>" 
                footer-template="<div class='k-actions k-actions-start k-actions-horizontal k-prompt-actions'><button ref-custom-button>Click me</button></div>" initialize-components="initializeComponents">
            </aiprompt-view>
        </aiprompt-views>
    </kendo-aiprompt>
```
{% endif %}
```Scripts
    <script>
        function initializeComponents() {
            this.element.find("[ref-custom-button]").kendoButton({
                click: function (e) {
                    alert("Custom button clicked");
                }
            });
        }
    </script>
```

## See Also

* [Configuring the AIPrompt Templates]({% slug htmlhelpers_templates_aiprompt %})
* [Server-Side API of the AIPrompt HtmlHelper](/api/aiprompt)
{% if site.core %}
* [Server-Side API of the AIPrompt TagHelper](/api/taghelpers/aiprompt)
{% endif %}
