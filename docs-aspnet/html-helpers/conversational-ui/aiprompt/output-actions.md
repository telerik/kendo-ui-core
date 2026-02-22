---
title: Output Actions
page_title: Telerik UI AIPrompt Documentation - Output Actions
description: "Configure built-in and custom actions that can be applied to the generated output of the Telerik UI for {{ site.framework }} AIPrompt component."
components: ["aiprompt"]
slug: htmlhelpers_output_actions_aiprompt
position: 3
---

# Output Actions

The output actions are interactive controls shown on every generated output card in the `Output` view of the AIPrompt. Users can click these actions to copy, retry, rate, or run custom logic against the specific AI response.

You can use the [built-in actions](#built-in-actions) or define [custom actions](#custom-actions) to let users modify or further process the respective prompt response.

## Built-in Actions

The AIPrompt supports the following built-in output actions:

* `Copy()`&mdash;Copies the output content to the clipboard. The action is displayed by default.
* `Retry()`&mdash;Regenerates the output using the same prompt and settings. The action is displayed by default.
* `Rating()`&mdash;Shows positive and negative rating buttons so users can provide feedback.

To display a specified output action to the right side of the output card, define a `Spacer` element before the action.

```HtmlHelper
@(Html.Kendo().AIPrompt()
    .Name("aiprompt")
    .OutputActions(action =>
    {
        action.Copy();
        action.Retry();
        action.Custom().Type(ItemType.Spacer);
        action.Rating();
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-aiprompt name="aiprompt">
    <output-actions>
        <aiprompt-output-action command="copy" />
        <aiprompt-output-action command="retry" />
        <aiprompt-output-action type="ItemType.Spacer" />
        <aiprompt-output-action command="rating" />
    </output-actions>
</kendo-aiprompt>
```
{% endif %}

## Custom Actions

Custom actions let you add domain-specific commands, such as **Export**, **Translate**, **Summarize**, and more. 

The custom output actions support the following appearance options:

| Option | Description |
|---|---|
| `Comamnd()` | Defines the name of the action (a command identifier). |
| `Type()` | Sets the command type (a `Button` or a `Spacer`). |
| `Icon()` | Specifies an icon for the button. |
| `FillMode()` | Defines how the color is applied to the action button. |
| `Rounded()` | Determines the border radius of the button. |
| `ThemeColor()` | Sest what color will be applied to the button. |
| `Text()` | Sets the button's text. |
| `Title()` | Configures a title to the button's element (a tooltip). |

When a custom action is clicked, the AIPrompt triggers the `OutputAction` client-side event. You can handle the event, identify the selected action, and implement the desired custom logic.

The example below shows how to define custom output actions and handle their `click` events.

```HtmlHelper
@(Html.Kendo().AIPrompt()
    .Name("aiprompt")
    .OutputActions(action =>
    {
        action.Custom().Icon("heart-outline").Command("like");
        action.Custom().Text("Share").Icon("share").Command("share");
    })
    .Events(ev => ev.OutputAction("onOutputAction"))
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-aiprompt name="aiprompt" on-output-action="onOutputAction">
    <output-actions>
        <aiprompt-output-action type="ItemType.Button" command="like" icon="heart-outline" />
        <aiprompt-output-action type="ItemType.Button" text="Share" command="share" icon="share" />
    </output-actions>
</kendo-aiprompt>
```
{% endif %}
```JS Scripts
<script>
    function onOutputAction (e) {
        if (e.command === "like") {
            let output = e.output; // The output text content associated with the action.
            // For example, store the liked output result.
        } else if (e.command === "share") {
            let output = e.output;
            let prompt = e.prompt; // The prompt text that was used to generate the output.
            // For example, redirect the user to a social media.
        }
    }
</script>
```

## See Also

* [Output Actions in the AIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt/output-actions)
* [Configuring the AIPrompt Templates]({% slug htmlhelpers_templates_aiprompt %})
* [Server-Side API of the AIPrompt HtmlHelper](/api/aiprompt)
{% if site.core %}
* [Server-Side API of the AIPrompt TagHelper](/api/taghelpers/aiprompt)
{% endif %}