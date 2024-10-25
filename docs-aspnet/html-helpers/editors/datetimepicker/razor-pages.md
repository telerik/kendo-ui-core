---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI DateTimePicker for {{ site.framework }} in a RazorPages application."
slug: razorpages_datetimepicker_aspnetcore
position: 7
---

# DateTimePicker in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI DateTimePicker for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the DateTimePicker component in a Razor Pages scenario.

For the complete project, refer to the [DateTimePicker in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DateTimePicker/DateTimePickerIndex.cshtml).

```tab-HtmlHelper(cshtml)
@page

<div>
    <h4>Select a date range</h4>
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
    )
</div>

```
{% if site.core %}
```tab-TagHelper(cshtml)
@page

<div>
    <h4>Select a date range</h4>
    <kendo-datepicker name="datepicker">
    </kendo-datepicker>
</div>

```
{% endif %}

```tab-PageModel(cshtml.cs)

 public void OnGet()
 {

 }
  
```

## See Also

* [Server-Side API](/api/datetimepicker)
