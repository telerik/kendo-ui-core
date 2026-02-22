---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} SmartPasteButton component in a form."
components: ["smartpastebutton"]
slug: smartpastebutton_getting_started
position: 2
---

# Getting Started with the SmartPasteButton

This guide demonstrates how to set up the Telerik UI for {{ site.framework }} SmartPasteButton and use it to populate form fields based on clipboard text.

For a complete example, refer to the [SmartPasteButton demo](https://demos.telerik.com/{{ site.platform }}/smartpastebutton).

## 1. Add the Target Editors

The following example shows the editors that will receive the extracted values.

```HtmlHelper
<form id="form-getting-started">
    @(Html.Kendo().TextBox()
        .Name("fullName")
        .Label(l => l.Content("Full Name"))
        .Placeholder("Full Name")
    )

    @(Html.Kendo().TextBox()
        .Name("city")
        .Label(l => l.Content("City"))
        .Placeholder("City")
    )

    @(Html.Kendo().MaskedTextBox()
        .Name("phone_number")
        .Label(l => l.Content("Phone Number"))
        .HtmlAttributes(new { placeholder = "e.g. XXXXXXXX" })
        .Mask("(000) 000-00-00")
    )
</form>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<form id="form-getting-started">
    <kendo-textbox name="fullName" placeholder="Full Name">
        <textbox-label content="Full Name" />
    </kendo-textbox>

    <kendo-textbox name="city" placeholder="City">
        <textbox-label content="City" />
    </kendo-textbox>

    <kendo-maskedtextbox name="phone_number"
                         mask="(000) 000-00-00"
                         placeholder="e.g. XXXXXXXX">
        <maskedtextbox-label content="Phone Number" />
    </kendo-maskedtextbox>
</form>
```
{% endif %}

## 2. Add the SmartPasteButton

Use the `Service()` configuration to point the component to your AI SmartPaste service.

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPaste")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .Events(e => e.RequestStart("onRequestStart").RequestEnd("onRequestEnd"))
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPaste"
                        text="Smart Paste"
                        on-request-start="onRequestStart"
                        on-request-end="onRequestEnd">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

## 3. Handle the Request Lifecycle

In the demo, the `RequestStart` and `RequestEnd` handlers show and hide a Loader.

```JS Scripts
<script>
    function onRequestStart() {
        var loader = $("#loader").data("kendoLoader");
        loader.show();

        $("#copyButton").find(".k-button-text").text("Copy Text");
        clearSelection();
    }

    function onRequestEnd() {
        var loader = $("#loader").data("kendoLoader");
        loader.hide();
        $("input").addClass("k-valid");
    }

    function clearSelection(){
        var selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
            selection.removeAllRanges();
        }
    }
</script>
```

## See Also

* [SmartPasteButton Overview]({% slug htmlhelpers_overview_smartpastebutton %})
* [Events of the SmartPasteButton]({% slug smartpastebutton_events %})
* [AI Service Integration]({% slug smartpastebutton_ai_service_integration %})
* [Server-Side API of the SmartPasteButton ](/api/smartpastebutton)
{% if site.core %}
* [Server-Side API of the SmartPasteButton TagHelper](/api/taghelpers/smartpastebutton)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
