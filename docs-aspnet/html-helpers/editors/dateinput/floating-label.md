---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI DateInput component for {{ site.framework }}."
slug: htmlhelpers_dateinput_floatinglabel_aspnetcore
position: 2
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI DateInput for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("datepicker")
        .Label(label =>
        {
            label.Content("Enter a date...");
            label.Floating(true);
        })
        .HtmlAttributes(new { style = "width: 100%", title = "dateinput" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="datepicker" title="dateinput" style="width:100%">
        <label content="Enter a date..." floating="true" />
    </kendo-dateinput>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
  @(Html.Kendo().DateInput()
        .Name("datepicker")
        .Label(label =>
        {
            label.ContentHandler("contentHandler");
            label.Floating(true);
        })
        .HtmlAttributes(new { style = "width: 100%", title = "dateinput" })
  )

  <script>
      function contentHandler(){
        return "Enter a date...";
      }
  </script>
```

{% if site.core %}
```TagHelper
    <kendo-dateinput name="datepicker" title="dateinput" style="width:100%">
        <label content-handler="contentHandler" floating="true" />
    </kendo-dateinput>

   <script>
       function contentHandler(){
         return "Enter a date...";
       }
   </script>
```
{% endif %}

## See Also

* [DateInput Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/dateinput)
