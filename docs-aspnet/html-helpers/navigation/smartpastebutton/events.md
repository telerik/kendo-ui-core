---
title: Events
page_title: Telerik UI SmartPasteButton Documentation - Client Events
description: "Learn how to handle the events of the Telerik UI SmartPasteButton component for {{ site.framework }}."
components: ["smartpastebutton"]
slug: smartpastebutton_events
position: 5
---

# Events

The SmartPasteButton exposes client-side events that allow you to handle the request lifecycle and customize the component behavior.

For a complete example, refer to the [demo on using the events of the SmartPasteButton](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/events).

## Supported Events

The SmartPasteButton exposes the following client-side events:

- `RequestStart`&mdash;Fires when the component starts processing a paste operation.
- `RequestEnd`&mdash;Fires when the component completes processing a paste operation.
- `Error`&mdash;Fires when an error occurs during processing.

## Handling Events of the SmartPasteButton

To handle the SmartPasteButton events, configure the `Events()` option.

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .Events(e => e
        .RequestStart("onRequestStart")
        .RequestEnd("onRequestEnd")
        .Error("onError")
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste"
                        on-request-start="onRequestStart"
                        on-request-end="onRequestEnd"
                        on-error="onError">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

## Handling SmartPaste Events in a Form

In the demo, the SmartPaste configuration of the Telerik UI Form subscribes to the SmartPaste events.

The example toggles a Loader component (`loader`) during the request lifecycle and resets the text of a separate Copy button (`copyButton`).

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
    .ButtonsTemplate(
        "<button id='clearButton' type='reset' onclick='onClear()' " +
            "data-role='button' class='k-button k-button-md k-rounded-md k-button-flat k-button-flat-base' " +
            "role='button' aria-disabled='false' tabindex='0'>" +
            "<span class='k-icon k-font-icon k-i-arrow-rotate-ccw'></span>" +
        "</button>"
    )
    .Validatable(v => v.ValidationSummary(false))
    .Items(i =>
    {
        i.Add().Field(f => f.FullName).Label("Full Name").Editor(e => e.TextBox().Placeholder("e.g. John Doe"));
        i.Add().Field(f => f.Email).Label("Email").Editor(e => e.TextBox().Placeholder("e.g. john.doe@company.com"));
        i.Add().Field(f => f.Phone)
            .Label("Phone Number")
            .InputHtmlAttributes(new { placeholder = "e.g. XXXXXXXX" })
            .Editor(e => e.MaskedTextBox().Mask("(000) 000-00-00"));
    })
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

    <buttons-template>
        <button id="clearButton"
                type="reset"
                onclick="onClear()"
                data-role="button"
                class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
                role="button"
                aria-disabled="false"
                tabindex="0">
            <span class="k-icon k-font-icon k-i-arrow-rotate-ccw"></span>
        </button>
    </buttons-template>

    <validatable validation-summary="false" />

    <form-items>
        <form-item field="FullName" label="Full Name">
            <textbox-editor placeholder="Full Name"></textbox-editor>
        </form-item>

        <form-item field="Email" label="Email">
            <textbox-editor placeholder="Email"></textbox-editor>
        </form-item>

        <form-item field="Phone" label="Phone Number" html-attributes='new Dictionary<string, object> { ["placeholder"] = "e.g. XXXXXXXX" }'>
            <maskedtextbox-editor mask="(000) 000-00-00"></maskedtextbox-editor>
        </form-item>
    </form-items>

</kendo-form>
```
{% endif %}

> When using the SmartPaste configuration through the Form TagHelper (`form-smart-paste`), the available event handler attributes are `on-request-start` and `on-request-end`.

```JS Scripts
<script>
    function onRequestStart(e){
        $("#loader").data("kendoLoader").show();

        $("#copyButton").find(".k-button-text").text("Copy");

        console.log("Processing started for content:", e.content);

        clearSelection();
    }

    function onRequestEnd(e){
        $("#loader").data("kendoLoader").hide();

        console.log("Processing completed with values:", e.fieldValues);

        $("#Phone").blur();
    }

    function onError(e){
        console.log("Error occurred: " + e.error);
    }

    function onClear(e) {
       $(".k-input-inner").css("background-color", "white");
       $(".k-form-field").removeClass("k-form-field-error");
       $(".k-input").removeClass("k-invalid");
       $(".k-invalid-msg").remove();

       clearSelection();

       $("#copyButton").find(".k-button-text").text("Copy");
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

* [SmartPasteButton Events (Demo)](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/events)
* [SmartPasteButton Overview]({% slug htmlhelpers_overview_smartpastebutton %})
* [AI Service Integration]({% slug smartpastebutton_ai_service_integration %})
* [Error Handling]({% slug smartpastebutton_error_handling %})
* [Server-Side API of the SmartPasteButton ](/api/smartpastebutton)
{% if site.core %}
* [Server-Side API of the SmartPasteButton TagHelper](/api/taghelpers/smartpastebutton)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
