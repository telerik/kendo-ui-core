---
title: Overview
page_title: NumericTextBox Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI NumericTextBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/numeric-text-box, /aspnet-core/helpers/tag-helpers/numeric-text-box
slug: taghelpers_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox Tag Helper Overview

The Kendo UI NumericTextBox converts an `input` element into a numeric, percentage, or currency textbox.

The NumericTextBox tag helper extension is a server-side wrapper for the [Kendo UI NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/index) widget and enables you to configure the Kendo UI NumericTextBox widget in ASP.NET Core applications.

## Initializing the NumericTextBox

The following example demonstrates how to define the NumericTextBox by using the NumericTextBox tag helper.

        <kendo-numerictextbox name="numeric"></kendo-numerictextbox>

You can also bind the NumericTextBox to a particular model field by using the `for` attribute. This is equivalent to using the `Html.Kendo().NumericTextBoxFor<decimal>()` HtmlHelper.

        @model Kendo.Mvc.Examples.Models

        <kendo-numerictextbox for="CustomerID"></kendo-numerictextbox>

## Basic Configuration

The NumericTextBox tag helper supports all the configuration options that the HtmlHelper does. They are passed as attributes of the tag.

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

* [Basic Usage of the NumericTextBox Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)
* [JavaScript API Reference of the NumericTextBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox)
