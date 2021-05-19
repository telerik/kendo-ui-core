---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI NumericTextBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/numeric-text-box, /helpers/tag-helpers/numeric-text-box
slug: taghelpers_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox TagHelper Overview

The Telerik UI NumericTextBox TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MultiSelect widget.

The NumericTextBox converts an `input` element into a numeric, percentage, or currency textbox.

* [Demo page for the NumericTextBox](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)

## Initializing the NumericTextBox

The following example demonstrates how to define the NumericTextBox by using the NumericTextBox TagHelper.

        <kendo-numerictextbox name="numeric"></kendo-numerictextbox>

You can also bind the NumericTextBox to a particular model field by using the `for` attribute. This is equivalent to using the `Html.Kendo().NumericTextBoxFor<decimal>()` HtmlHelper.

        @model Kendo.Mvc.Examples.Models

        <kendo-numerictextbox for="CustomerID"></kendo-numerictextbox>

## Basic Configuration

The NumericTextBox TagHelper supports all the configuration options that the HtmlHelper does. They are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().NumericTextBox<decimal>()
            .Name("currency")
            .Format("c")
            .Min(0)
            .Enable(true)
            .Max(100)
            .Value(30)
        )
```
```tagHelper

        <kendo-numerictextbox name="currency" format="c" min="0"
            enable="true" max="100" value="30">
        </kendo-numerictextbox>
```

## See Also

* [Basic Usage of the NumericTextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)
* [Server-Side API](/api/numerictextbox)
