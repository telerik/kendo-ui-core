---
title: Overview
page_title: Button Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC."
slug: overview_buttonhelper_aspnetmvc
position: 1
---

# Button HtmlHelper Overview

The Telerik UI Button HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Button widget.

The Button provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI for jQuery styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

* [Demo page for the Button](https://demos.telerik.com/aspnet-mvc/button)

## Initializing the Button

The following example demonstrates how to define the Button by using the Button HtmlHelper.

```Razor

        @(Html.Kendo().Button()
            .Name("textButton")
            .HtmlAttributes( new {type = "button"} )
            .Content("Text button"))
```
```ASPX

        <%= Html.Kendo().Button()
            .Name("textButton")
            .HtmlAttributes( new {type = "button"} )
            .Content("Text button") %>
```

The following example demonstrates how to initialize the Button by using the `anchor` tag.

```Razor

        @(Html.Kendo().Button()
            .Name("linkButton")
            .Tag("a")
            .Content("Link button"))
```
```ASPX

        <%= Html.Kendo().Button()
            .Name("linkButton")
            .Tag("a")
            .Content("Link button") %>
```

## Basic Configuration

* The `Name()` configuration method is mandatory as its value will be used for the `id` and the `name` attributes of the Button element. Moreover, the `id` is used in order to properly initialize the Button widget. The `id` attribute value is also used to retrieve its client-side instance.
* The `Content()` configuration specifies the text that would be rendered in the button. This option does not accept HTML, but only string values.
* The `Enable()` option determines whether the widget will be initially enabled (by default) of disabled.
* The `Tag()` method allows the developer to determine whether the widget will be initialized from a `<button>` element (by default), or from an `<a>` element.

For a runnable example, refer to the [demo on the basic usage of the Button](https://demos.telerik.com/aspnet-mvc/button).

## Functionality and Features

* [Disabled Button]({% slug disabled_buttonhelper_aspnetmvc %})
* [Icon Button]({% slug iconbuttonhelper_aspnetmvc %})

## Events

For a complete example on basic Button events, refer to the [demo on using the events of the Button](https://demos.telerik.com/aspnet-mvc/button/events).

## Referencing Existing Instances

To reference an existing Button instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Button client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button).

## See Also

* [Basic Usage of the Button HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/button)
* [Using the API of the Button HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/button/api)
* [ButtonBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ButtonBuilder)
* [Button Server-Side API](/api/button)
