---
title: Overview
page_title: RadioButton Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Get started with the server-side wrapper for the Telerik UI RadioButton for ASP.NET MVC."
slug: htmlhelpers_radiobutton_aspnetcore
position: 1
---

# RadioButton HtmlHelper Overview

The Telerik UI RadioButton HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI RadioButton widget.

The RadioButton is rendered as an `input type='radio'` element that is immediately followed by a `label` element. The styling is implemented with the `k-radio` class that is attached to the `input` element and the `k-radio-label` class that is attached to the `label` element.

* [Demo page for the RadioButton](https://demos.telerik.com/aspnet-core/styling/index)

## Initializing the RadioButton

The following example demonstrates how to initialize the RadioButton.

    @(Html.Kendo().RadioButton()
        .Name("MyRadioButton")
        .Label("I agree")
        .Checked(true))

## Functionality and Features

* [Disabled RadioButton]({% slug disabledstate_radiobutton_aspnetcore %})
* [Checked RadioButton]({% slug modelbinding_radiobutton_aspnetcore %})
* [Model binding]({% slug modelbinding_radiobutton_aspnetcore %})

## See Also

* [RadioButton Server-Side API](/api/radiobutton)
* [RadioButtonBuilder Server-Side API](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
