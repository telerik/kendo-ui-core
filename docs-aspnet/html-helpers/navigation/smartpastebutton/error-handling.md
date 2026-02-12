---
title: Error Handling
page_title: Telerik UI SmartPasteButton Documentation - Error Handling
description: "Learn how to clear validation error states when using the Telerik UI SmartPasteButton for {{ site.framework }}."
components: ["smartpastebutton"]
slug: smartpastebutton_error_handling
position: 6
---

# Error Handling

When the SmartPasteButton is used in a form scenario, the pasted clipboard content may not contain values for all required fields. In such cases, the form validation indicates which fields require user input.

For a complete example, refer to the [demo on error handling of the SmartPasteButton](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/error-handling).

## Clearing Validation Error States

In the demo, the reset button calls `onClear()` to remove invalid state classes and validation messages when the clipboard content is incomplete.

```HtmlHelper
@(Html.Kendo().Form<ResponsiveFormViewModel>()
    .Name("responsiveForm")
    .Orientation("vertical")
    .SmartPaste(s => s
        .Name("smartPaste")
        .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
        .Text("Smart Paste")
    )
    .ButtonsTemplate(
        "<button id='clearButton' type='reset' onclick='onClear()' " +
            "data-role='button' class='k-button k-button-md k-rounded-md k-button-flat k-button-flat-base' " +
            "role='button' aria-disabled='false' tabindex='0'>" +
            "<span class='k-icon k-font-icon k-i-arrow-rotate-ccw'></span>" +
        "</button>"
    )
    .Validatable(v => v.ValidationSummary(false))
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-form name="responsiveForm"
            orientation="vertical">

    <form-smart-paste text="Smart Paste">
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

</kendo-form>
```
{% endif %}

```JS Scripts
<script>
    function onClear() {
        $(".k-form-field").removeClass("k-form-field-error");
        $(".k-input").removeClass("k-invalid");
        $(".k-invalid-msg").remove();

        $("#copyButton").find(".k-button-text").text("Copy");

        clearSelection();

        $(".k-input").removeClass("k-valid");
    }

    function clearSelection(){
        var selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
            selection.removeAllRanges();
        }
    }
</script>
```

For details on handling request lifecycle and errors during processing, refer to the [Events]({% slug smartpastebutton_events %}) article.

## See Also

* [Error Handling by the SmartPasteButton (Demo)](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/error-handling)
* [SmartPasteButton Overview]({% slug htmlhelpers_overview_smartpastebutton %})
* [Events of the SmartPasteButton]({% slug smartpastebutton_events %})
* [Server-Side API of the SmartPasteButton ](/api/smartpastebutton)
{% if site.core %}
* [Server-Side API of the SmartPasteButton TagHelper](/api/taghelpers/smartpastebutton)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
