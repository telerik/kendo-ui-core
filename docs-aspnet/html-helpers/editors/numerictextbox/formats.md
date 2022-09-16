---
title: Formats
page_title: Formats
description: "Get started with the Telerik UI NumericTextBox for {{ site.framework }} and learn how to create currency and percentage textboxes."
slug: formats_numerictextbox_aspnetcore
position: 2
---

# Formats

The NumericTextBox accepts only numeric entries and its specific format defines the conversion data type&mdash;for example, currency or percentage. You can use different formats, if you want to display a numeric specific for a particular country/region. The purpose of number formatting is to convert a Number object to a human readable string using the culture-specific settings. For setting a Format in the Telerik UI NumericTextBox for MVC and Core the "Format" property could be used.

The following example demonstrates how to render a currency NumericTextBox by using the "Format" property.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("currency")
        .Format("c")
    )
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="numeric"
                      format="c">
</kendo-numerictextbox>
```
{% endif %}

The following example demonstrates how to render a percentage NumericTextBox by using the "Format" property.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("percentage")
        .Format("p0")
    )
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="percentage"
                      format="p0">
</kendo-numerictextbox>
```
{% endif %}

More examples of the available formatting options you can find below. The runnable example in the demo represents how to format numbers by using the kendo.toString method in Kendo UI:

[Number Formatting](https://docs.telerik.com/kendo-ui/globalization/intl/numberformatting)

## See Also

* [Using the API of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)
* [Server-Side API](/api/numerictextbox)
