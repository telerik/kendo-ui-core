---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI DatePicker component for {{ site.framework }}."
slug: htmlhelpers_datepicker_floatinglabel_aspnetcore
position: 11
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI DatePicker for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
    @(Html.Kendo().DatePicker()
              .Name("datepicker")
              .Label(label => {
                  label.Content("Show e-mails from...");
                  label.Floating(true);
              })
              .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-datepicker name="datepicker" title="datepicker" style="width:100%">
          <label content="Show e-mails from..." floating="true" />
    </kendo-datepicker>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
    @(Html.Kendo().DatePicker()
              .Name("datepicker")
              .Label(label => {
                  label.ContentHandler("contentHandler");
                  label.Floating(true);
              })
              .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
    )

    <script>
        function contentHandler(){
            return "Show e-mails from...";
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-datepicker name="datepicker" title="datepicker" style="width:100%">
          <label content-handler="contentHandler" floating="true" />
    </kendo-datepicker>

    <script>
        function contentHandler(){
            return "Show e-mails from...";
        }
    </script>
```
{% endif %}

## See Also

* [DatePicker Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/datepicker)