---
title: Select the Day Segment in an Empty DateInput
page_title: Select the Day Segment in an Empty DateInput
description: "Learn how to select the day segment in an empty DateInput for {{ site.framework }} with keyboard or mouse focus."
type: how-to
slug: dateinput-select-day-when-empty
tags: dateinput, day, segment, cursor, caret, focus, taghelper
res_type: kb
components: ["dateinput"]
---

## Environment

* Product: {{ site.product }} DateInput
* Framework: {{ site.framework }}
* Client-side version tested: 2026.3.1015
* Browser tested: Chromium

## Description

How can I position the cursor on the day segment when an empty DateInput receives focus or a click?

The DateInput has no configuration option for selecting the initial date segment. Use a DOM event handler with either the HtmlHelper or TagHelper.

## Solution

The following example assumes that you have [configured {{ site.product }}]({% if site.core %}{% slug gettingstartedtelerik_aspnetcore %}{% else %}{% slug gettingstartedtelerik_cli_aspnetmvc %}{% endif %}) in your application.

1. Configure an empty DateInput with the fixed `dd/MM/yyyy` format and explicit, nonempty segment messages.
1. After initialization, handle the input element's DOM `focus` and `click` events.
1. Check both the widget value and the displayed mask to avoid changing populated or partially entered dates.
1. Use `requestAnimationFrame` to select the day after the component processes the interaction.

Choose one of the following declarations:

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Format("dd/MM/yyyy")
        .Messages(messages => messages
            .Day("dd")
            .Month("MM")
            .Year("yyyy")
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-dateinput name="dateinput" format="dd/MM/yyyy">
        <kendo-date-input-messages-settings day="dd" month="MM" year="yyyy" />
    </kendo-dateinput>
```
{% endif %}

Place this script after the chosen component declaration:

```JavaScript
    <script>
        $(document).ready(function () {
            var dateInput = $("#dateinput").data("kendoDateInput");

            dateInput.element.on("focus click", function () {
                var input = this;

                if (dateInput.value() === null && input.value === "dd/MM/yyyy") {
                    requestAnimationFrame(function () {
                        if (document.activeElement === input && input.value === "dd/MM/yyyy") {
                            input.setSelectionRange(0, 2);
                        }
                    });
                }
            });
        });
    </script>
```

Tab into the empty input or click it. The day placeholder is selected, and typing replaces that segment. Populated dates and partially entered dates retain their normal editing behavior.

This example depends on the specified format and messages. If you change the date order, separators, or localized messages, update the empty-mask comparison and selection offsets.

{% if site.core %}
>note Empty message attributes, such as `day=""`, are omitted by the TagHelper during serialization and do not remove the default segment placeholders. This example uses nonempty messages to keep the empty mask and selection positions predictable.
{% endif %}

## See Also

* [DateInput Date Editing]({% slug dateinput_date_editing %})
* [DateInput Localization]({% slug localization_dateinput_aspnetcore %})
* [DateInput Client-Side API](https://docs.telerik.com/kendo-ui/api/ui/dateinput)
