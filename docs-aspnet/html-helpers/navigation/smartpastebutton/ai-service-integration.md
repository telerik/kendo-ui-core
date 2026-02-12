---
title: AI Service Integration
page_title: Telerik UI SmartPasteButton Documentation - AI Service Integration
description: "Learn how to configure the Telerik UI SmartPasteButton for {{ site.framework }} to use an AI SmartPaste service."
components: ["smartpastebutton"]
slug: smartpastebutton_ai_service_integration
position: 3
---

# AI Service Integration

The SmartPasteButton requires an AI service endpoint that processes clipboard text and returns structured values for the form fields.

In the demos, the SmartPasteButton is configured with the Telerik demo AI service.

## Configuring the SmartPasteButton Service

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

## Using the Service through the Form SmartPaste Configuration

```HtmlHelper
@(Html.Kendo().Form<ResponsiveFormViewModel>()
    .Name("responsiveForm")
    .Orientation("vertical")
    .ClearButton(true)
    .SmartPaste(s => s
        .Name("smartPaste")
        .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
        .Text("Smart Paste")
        .Events(e => e.RequestStart("onRequestStart").RequestEnd("onRequestEnd").Error("onError"))
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-form name="responsiveForm"
            orientation="vertical"
            clear-button="true">

    <form-smart-paste
                 text="Smart Paste"
                 on-request-start="onRequestStart"
                 on-request-end="onRequestEnd"
                 on-error="onError">
        <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
    </form-smart-paste>

</kendo-form>
```
{% endif %}

> When using the SmartPaste configuration through the Form TagHelper (`form-smart-paste`), the available event handler attributes are `on-request-start` and `on-request-end`.

## See Also

* [SmartPasteButton Overview]({% slug htmlhelpers_overview_smartpastebutton %})
* [Events of the SmartPasteButton]({% slug smartpastebutton_events %})
* [Error Handling]({% slug smartpastebutton_error_handling %})
* [Server-Side API of the SmartPasteButton ](/api/smartpastebutton)
{% if site.core %}
* [Server-Side API of the SmartPasteButton TagHelper](/api/taghelpers/smartpastebutton)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
