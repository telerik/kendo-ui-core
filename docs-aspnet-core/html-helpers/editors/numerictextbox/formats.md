---
title: Formats
page_title: Formats | Telerik UI NumericTextBox HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI NumericTextBox for ASP.NET Core and learn how to create currency and percentage textboxes."
slug: formats_numerictextbox_aspnetcore
position: 2
---

# Formats

The NumericTextBox accepts only numeric entries and its specific format defines the conversion data type&mdash;for example, currency or percentage.

The following example demonstrates how to render a currency NumericTextBox.

```
    @(Html.Kendo().NumericTextBox()
        .Name("currency")
        .Format("c")
    )
```

The following example demonstrates how to render a percentage NumericTextBox.

```
    @(Html.Kendo().NumericTextBox()
        .Name("percentage")
        .Format("p0")
    )
```

## See Also

* [Using the API of the NumericTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/api)
* [Server-Side API](/api/numerictextbox)
