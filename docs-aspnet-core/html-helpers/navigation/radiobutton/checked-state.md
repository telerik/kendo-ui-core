---
title: Checked RadioButton
page_title: Checked RadioButton | Telerik UI RadioButton HtmlHelper for ASP.NET Core
description: "Enable the checked or unchecked state of the Telerik UI RadioButton for ASP.NET MVC."
slug: checkedstate_radiobutton_aspnetcore
position: 3
---

# Checked RadioButton

You can configure the RadioButton to be initially checked through its `.Checked()` setting.

The widget can also be checked or unchecked at any time by using jQuery.

The following example demonstrates how to use the `.Checked()` configuration option.

    @(Html.Kendo().RadioButton()
        .Name("MyRadioButton")
        .Label("I agree")
        .Checked(true))

## See Also

* [RadioButton Server-Side API](/api/radiobutton)
* [RadioButtonBuilder Server-Side API](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
