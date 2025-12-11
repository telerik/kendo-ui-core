---
title: Date Formatting
page_title: Date Formatting
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to define its date format."
components: ["daterangepicker"]
slug: dateformatting_daterangepicker_aspnetcore
position: 6
---

# Date Formatting

The DateRangePicker's default date format is *MM-dd-yyyy*. You can set a preferred date format in the {{ site.product }} DateRangePicker with the `Format` property.

The following example demonstrates how to define the date format.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Format("{0:dd/MM/yyyy}")
    )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker" format="{0:dd/MM/yyyy}">
    </kendo-daterangepicker>
```
{% endif %}

You can find more information about the available formatting options in our [Date Formatting](https://docs.telerik.com/kendo-ui/globalization/intl/dateformatting) article. At the client-side you are also able to format dates by using the Kendo UI [`kendo.toString`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/tostring) method.


## See Also

* [Using the API of the DateRangePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/api)
* [Server-Side API](/api/daterangepicker)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker)
