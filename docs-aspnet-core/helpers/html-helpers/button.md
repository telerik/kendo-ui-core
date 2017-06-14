---
title: Button
page_title: Button | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Button HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_button_aspnetcore
---

# Button HtmlHelper Overview

The Button HtmlHelper extension is a server-side wrapper for the [Kendo UI Button](http://demos.telerik.com/kendo-ui/button/index) widget.

It enables you to configure the Kendo UI Button widget from server-side code. The [Button](http://docs.telerik.com/kendo-ui/controls/navigation/button/overview) provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

For more information on the HtmlHelper, refer to the article on the [Button HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/upload/overview).

## Basic Usage

The following example demonstrates how to define the Button by using the Button HtmlHelper.

###### Example

```tab-Razor
@(Html.Kendo().Button()
    .Name("textButton")
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```


## Configuration

The following example demonstrates the basic configuration of the Button HtmlHelper and how to get the Button instance.

###### Example

```tab-Razor

@(Html.Kendo().Button()
    .Name("textButton")
    .Tag("span")
    .Content("Text button")
    .HtmlAttributes( new { @class = "k-primary" } )
    .Events(ev => ev.Click("onClick"))
)

<script type="text/javascript">
$(function() {
    //Notice that the Name() of the Button is used to get its client-side instance.
    var button = $("#textButton").data("kendoButton");
});
</script>
```

## See Also

* [JavaScript API Reference of the Button](http://docs.telerik.com/kendo-ui/api/javascript/ui/button)
* [Button HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/button/overview)
* [Button Official Demos](http://demos.telerik.com/aspnet-core/button/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
