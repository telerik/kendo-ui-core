---
title: Events
page_title: Events
description: "Learn more about the events that the Telerik UI for {{ site.framework }} PromptBox features."
slug: htmlhelpers_promptbox_events_aspnetcore
position: 5
components: ["promptbox"]
---

# PromptBox Events

The PromptBox component emits various events that let you handle user interactions and customize the behavior.

This article provides an overview of all available events of the PromptBox.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .Events(e => e
            .InputValueChange("onInputValueChange")
            .Focus("onFocus")
            .Blur("onBlur")
        )
    )

    <script>
        function onInputValueChange(e) {
            console.log("Content changed");
        }
        function onFocus(e) {
            console.log("Focused");
        }
        function onBlur(e) {
            console.log("Blurred");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox"
        on-input-value-change="onInputValueChange"
        on-focus="onFocus"
        on-blur="onBlur">
    </kendo-promptbox>
    
    <script>
        function onInputValueChange(e) {
            console.log("Content changed");
        }
        function onFocus(e) {
            console.log("Focused");
        }
        function onBlur(e) {
            console.log("Blurred");
        }
    </script>
```
{% endif %}

You can subscribe to the events by the handler name.

```javascript
    var promptbox = $("#promptBox").data("kendoPromptBox");
    promptbox.bind("inputValueChange", function(e) {
        console.log("Content changed");
    });
```

## See Also

* [Server-Side API of the PromptBox HtmlHelper](/api/promptbox)
{% if site.core %}
* [Server-Side API of the PromptBox TagHelper](/api/taghelpers/promptbox)
{% endif %}
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
