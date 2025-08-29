---
title: Output Actions
page_title: Kendo UI AIPrompt Documentation - Output Actions
description: "Configure built-in and custom actions that can be applied to the generated output of the Kendo UI UI for jQuery AIPrompt component."
slug: output_actions_kendoui_aiprompt
position: 4
---

# Output Actions

The output actions are interactive controls shown on every generated output card in the `Output` view of the AIPrompt. Users can click these actions to copy, retry, rate, or run custom logic against the specific AI response.

You can use the [built-in actions](#built-in-actions) or define [custom actions](#custom-actions) to let users modify or further process the respective prompt response.

## Built-in Actions

The AIPrompt supports the following built-in [`outputActions`](/api/javascript/ui/aiprompt/configuration/outputactions):

* `copy`&mdash;Copies the output content to the clipboard. The action is displayed by default.
* `retry`&mdash;Regenerates the output using the same prompt and settings. The action is displayed by default.
* `rating`&mdash;Shows positive and negative rating buttons so users can provide feedback.

To display a specified output action to the right side of the output card, define a `Spacer` element before the action.

```dojo
<div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: ["copy", "retry", "rating"]
    });
    </script>
```

## Custom Actions

Custom actions let you add domain-specific commands, such as **Export**, **Translate**, **Summarize**, and more. 

The custom output actions support the following appearance options:

| Option | Description |
|---|---|
| `comamnd` | Defines the name of the action (a command identifier). |
| `type` | Sets the command type (a `Button` or a `Spacer`). |
| `icon` | Specifies an icon for the button. |
| `fillMode` | Defines how the color is applied to the action button. |
| `rounded` | Determines the border radius of the button. |
| `themeColor` | Sest what color will be applied to the button. |
| `text` | Sets the button's text. |
| `title` | Configures a title to the button's element (a tooltip). |

When a custom action is clicked, the AIPrompt triggers the `OutputAction` client-side event. You can handle the event, identify the selected action, and implement the desired custom logic.

The example below shows how to define custom output actions and handle their `click` events.

```dojo
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "export", text: "Export", icon: "download" },
            "spacer",
            { command: "share", text: "Share", icon: "share" }
        ],
        outputAction: function(e) {
            if (e.command === "export") {
                // Handle export action
                // e.output contains the text content directly
                console.log("Exporting output ID:", e.outputId);
                console.log("Content:", e.output);
                console.log("Original prompt:", e.prompt);
            } else if (e.command === "share") {
                // Handle share action
                console.log("Sharing output:", e.output);
            }
        }
    });
    </script>
```

## See Also

* [Output Actions in the AIPrompt for jQuery (Demo)](https://demos.telerik.com/kendo-ui/aiprompt/output-actions)
* [Configuring the AIPrompt Templates]({% slug templates_aiprompt_component %})
* [Getting Started with the AIPrompt]({% slug getting_started_kendoui_aiprompt_component %})
* [JavaScript API Reference of the AIPrompt](/api/javascript/ui/aiprompt)