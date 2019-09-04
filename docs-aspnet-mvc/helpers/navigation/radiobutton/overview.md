---
title: Overview
page_title: RadioButton Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI RadioButton HtmlHelper for ASP.NET MVC."
slug: overview_radiobuttonhelper_aspnetmvc
position: 1
---

# RadioButton HtmlHelper Overview

The Telerik UI RadioButton HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI RadioButton widget.

The RadioButton is rendered as an `input type='radio'` element that is immediately followed by a `label` element. The styling is implemented with the `k-radio` class that is attached to the `input` element and the `k-radio-label` class that is attached to the `label` element.

* [Demo page for the RadioButton](https://demos.telerik.com/aspnet-mvc/styling/radios)

## Initializing the RadioButton

The following example demonstrates how to initialize the RadioButton.

```Razor
    @(Html.Kendo().RadioButton()
        .Name("MyRadioButton")
        .Label("I agree")
        .Checked(true))
```
```ASPX
    <%= Html.Kendo().RadioButton()
        .Name("MyRadioButton")
        .Label("I agree")
        .Checked(true) %>
```

## Functionality and Features

* [Disabled RadioButton]({% slug disabledstate_radiobuttonhelper_aspnetmvc %})
* [Checked RadioButton]({% slug checkedstate_radiobuttonhelper_aspnetmvc %})
* [Model binding]({% slug modelbinding_radiobuttonhelper_aspnetmvc %})

## See Also

* [Basic Usage of the RadioButton HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/styling/radios)
* [RadioButtonBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
* [RadioButton Server-Side API](/api/radiobutton)
