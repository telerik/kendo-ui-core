---
title: Disabled RadioButton
page_title: Disabled RadioButton | Telerik UI PanelBar HtmlHelper for ASP.NET MVC
description: "Enable or disable the Telerik UI RadioButton for ASP.NET MVC."
slug: disabledstate_radiobuttonhelper_aspnetmvc
position: 2
---

# Disabled RadioButton

The business logic of an application often requires a certain radio button to be temporarily enabled or disabled.

The RadioButton can be configured to be initially disabled through its `.Enable()` setting. The widget can also be enabled or disabled at any time by using jQuery.

The following example demonstrates how to use the `.Enable()` configuration option.

```Razor
    @(Html.Kendo().RadioButton()
        .Name("disabledRadioButton")
        .Enable(false)
        .Label("Disabled radio button")
        .Checked(false))
```
```ASPX
    <%= Html.Kendo().RadioButton()
        .Name("disabledRadioButton")
        .Enable(false)
        .Label("Disabled radio button")
        .Checked(false) %>
```

## See Also

* [Basic Usage of the RadioButton HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/styling/radios)
* [RadioButtonBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
* [RadioButton Server-Side API](/api/radiobutton)
