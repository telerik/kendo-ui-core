---
title: Disabled RadioButton
page_title: Disabled RadioButton | Kendo UI RadioButton HtmlHelper for ASP.NET Core
description: "Enable or disable the Kendo UI RadioButton for ASP.NET MVC."
slug: disabledstate_radiobutton_aspnetcore
position: 2
---

# Disabled RadioButton

The business logic of an application often requires a certain radio button to be temporarily enabled or disabled.

The RadioButton can be configured to be initially disabled through its `.Enable()` setting. The widget can also be enabled or disabled at any time by using jQuery.

The following example demonstrates how to use the `.Enable()` configuration option.

    @(Html.Kendo().RadioButton()
        .Name("disabledRadioButton")
        .Enable(false)
        .Label("Disabled radio button")
        .Checked(false))

## See Also

* [Telerik UI for ASP.NET Core API Reference: RadioButtonBuilder](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Overview of the Kendo UI RadioButton Widget](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#customize-checkboxes-and-radio-buttons)
