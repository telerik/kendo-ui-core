---
title: Checked RadioButton
page_title: Checked RadioButton | Telerik UI PanelBar HtmlHelper for ASP.NET MVC
description: "Enable the checked or unchecked state of the Telerik UI RadioButton for ASP.NET MVC."
slug: checkedstate_radiobuttonhelper_aspnetmvc
position: 3
---

# Checked RadioButton

You can configure the RadioButton to be initially checked through its `.Checked()` setting.

The widget can also be checked or unchecked at any time by using jQuery.

The following example demonstrates how to use the `.Checked()` configuration option.

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

## See Also

* [Basic Usage of the RadioButton HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/styling/radios)
* [RadioButtonBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
* [RadioButton Server-Side API](/api/radiobutton)
