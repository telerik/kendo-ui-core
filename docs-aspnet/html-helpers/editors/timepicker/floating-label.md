---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI TimePicker component for {{ site.framework }}."
slug: htmlhelpers_timepicker_floatinglabel_aspnetcore
position: 7
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI TimePicker for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
        @(Html.Kendo().TimePicker()
            .Name("timepicker")
            .Label(label => {
                label.Content("Set alarm for:");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width: 100%", title = "timepicker" })
        )
```
{% if site.core %}
```TagHelper
    <kendo-timepicker name="timepicker" title="timepicker" style="width:100%">
        <label content="Set alarm for:" floating="true" />
    </kendo-timepicker>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
        @(Html.Kendo().TimePicker()
            .Name("timepicker")
            .Label(label => {
                label.ContentHandler("contentHandler");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width: 100%", title = "timepicker" })
        )

        <script>
            function contentHandler(){
                return "Set alarm for:";
            }
        </script>
```
{% if site.core %}
```TagHelper
    <kendo-timepicker name="timepicker" title="timepicker" style="width:100%">
        <label content-handler="contentHandler" floating="true" />
    </kendo-timepicker>

    <script>
        function contentHandler(){
            return "Set alarm for:";
        }
    </script>
```
{% endif %}

## See Also

* [TimePicker Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/timepicker)
