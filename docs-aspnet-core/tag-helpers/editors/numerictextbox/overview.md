---
title: Overview
page_title: NumericTextBox | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI NumericTextBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/numeric-text-box, /aspnet-core/helpers/tag-helpers/numeric-text-box
slug: taghelpers_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox Tag Helper Overview

The NumericTextBox tag helper helps you configure the Kendo UI NumericTextBox widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the NumericTextBox by using the NumericTextBox tag helper.

###### Example

        <kendo-numerictextbox name="numeric"></kendo-numerictextbox>

You can also bind the NumericTextBox to a particular model field by using the `for` attribute. This is equivalent to using the `Html.Kendo().NumericTextBoxFor<decimal>()` HtmlHelper.

###### Example

        @model Kendo.Mvc.Examples.Models

        <kendo-numerictextbox for="CustomerID"></kendo-numerictextbox>

## Configuration

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
