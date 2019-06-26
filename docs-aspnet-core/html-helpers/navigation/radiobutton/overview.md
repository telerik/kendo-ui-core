---
title: Overview
page_title: RadioButton Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI RadioButton for ASP.NET MVC."
slug: htmlhelpers_radiobutton_aspnetcore
position: 1
---

# RadioButton HtmlHelper Overview

The Kendo UI RadioButton widget is rendered as an `input type='radio'` element that is immediately followed by a `label` element.

The styling is implemented with the `k-radio` class that is attached to the `input` element and the `k-radio-label` class that is attached to the `label` element.

The RadioButton HtmlHelper extension is a server-side wrapper for the [Kendo UI RadioButton](http://demos.telerik.com/kendo-ui/styling/radios) widget. Make sure you are familiar with the fundamental Kendo UI widget concepts and that the [Kendo UI Core wrappers]({% slug overview_aspnetmvc6_aspnetmvc %}) are set up correctly. For more information on the RadioButton HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/radiobutton/overview).

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

* [Telerik UI for ASP.NET Core API Reference: RadioButtonBuilder](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
* [Overview of the Kendo UI RadioButton Widget](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#customize-checkboxes-and-radio-buttons)
