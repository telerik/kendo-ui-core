---
title: Date Formatting
page_title: Date Formatting
description: "Get started with the Telerik UI DatePicker for {{ site.framework }} and learn how to use different date formats."
slug: formats_datepicker_aspnetcore
position: 2
---

# Date Formatting

The DatePicker's default date format is *month-day-year* or *MM-dd-yyyy*. You can set a preferred date format in the {{ site.product }} DatePicker with the `Format` property.

The following examples demonstrate how to apply different formats in the DatePicker with the `Format` configuration property.

This example showcases how to apply the *day-month-year* format.

```HtmlHelper
    @(Html.Kendo().DatePicker()
              .Name("datepicker")
              .Format("dd-MM-yyyy")
              .Value("11/10/2011")
    )
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                      format="dd-MM-yyyy">
</kendo-datepicker>
```
{% endif %}

The following example demonstrates how to render a date in the *year-month-day* format which is common in China, Japan, Korea, etc.

```HtmlHelper
    @(Html.Kendo().DatePicker()
              .Name("datepicker")
              .Format("yyyy-MM-dd")
              .Value("11/10/2011")
    )
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                      format="MMMM yyyy">
</kendo-datepicker>
```
{% endif %}

The following example demonstrates how to render a month's full name.

```HtmlHelper
    @(Html.Kendo().DatePicker()
              .Name("datepicker")
              .Format("MMMM yyyy")
              .Value("11/10/2011")
    )
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                      format="MMMM yyyy">
</kendo-datepicker>
```
{% endif %}

You can find more information about the available formatting options in our [Date Formatting](https://docs.telerik.com/kendo-ui/globalization/intl/dateformatting) article. At the client-side you are also able to format dates by using the Kendo UI [`kendo.toString`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/tostring) method.



## See Also

* [Using the API of the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/api)
* [Server-Side API](/api/datepicker)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)