---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI DateTimePicker component for {{ site.framework }}."
slug: htmlhelpers_datetimepicker_floatinglabel_aspnetcore
position: 14
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI DateTimePicker for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
            .Name("datetimepicker")
            .Label(label => {
                label.Content("Remind me on");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker" title="datetimepicker" style="width:100%">
        <label content="Remind me on" floating="true" />
    </kendo-datetimepicker>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
            .Name("datetimepicker")
            .Label(label => {
                label.ContentHandler("contentHandler");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    )

    <script>
        function contentHandler(){
            return "Remind me on";
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker" title="datetimepicker" style="width:100%">
        <label content-handler="contentHandler" floating="true" />
    </kendo-datetimepicker>

    <script>
        function contentHandler(){
            return "Remind me on";
        }
    </script>
```
{% endif %}

## See Also

* [DateTimePicker Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/datetimepicker)
