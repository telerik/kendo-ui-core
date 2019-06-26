---
title: Overview
page_title: Button Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Button HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/button
slug: htmlhelpers_button_aspnetcore
position: 1
---

# Button HtmlHelper Overview

The [Button](http://docs.telerik.com/kendo-ui/controls/navigation/button/overview) provides a styled clickable UI functionality with arbitrary content.

Apart from consistent Kendo UI styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

The Button HtmlHelper extension is a server-side wrapper for the [Kendo UI Button](http://demos.telerik.com/kendo-ui/button/index) widget. For more information on the Button HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/button/overview).

## Initializing the Button

The following example demonstrates how to define the Button by using the Button HtmlHelper.

```
@(Html.Kendo().Button()
    .Name("textButton")
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```

## Basic Configuration

* The `Name()` configuration method is mandatory as its value will be used for the `id` and the `name` attributes of the Button element. Moreover, the `id` is used in order to properly initialize the Button widget. The `id` attribute value is also used to retrieve its client-side instance.
* The `Content()` configuration specifies the text that would be rendered in the button. This option does not accept HTML, but only string values.
* The `Enable()` option determines whether the widget will be initially enabled (by default) of disabled.
* The `Tag()` method allows the developer to determine whether the widget will be initialized from a `<button>` element (by default), or from an `<a>` element.

The following example demonstrates the available configuration options for the Button HtmlHelper.

```
@(Html.Kendo().Button()
	.Name("textButton")
	.Content("Sample Button")
	.Enable(false)
	.Tag("a")
)

<script type="text/javascript">
    $(function() {
        // The Name() of the Button is used to get its client-side instance.
        var button = $("#textButton").data("kendoButton");
    });
</script>
```

## Functionality and Features

The Button provides options for rendering [icons in the button]({% icons_button_aspnetcore %}).

## Events

The Button HTML helper exposes only a `Click()` event that can be handled. For a complete example on basic Button events, refer to the [demo on using the events of the Button](https://demos.telerik.com/aspnet-core/button/events).

```
@(Html.Kendo().Button()
	.Name("button")
	.Content("Sample Button")
	.Events(e => e.Click("onClick"))
)

<script>
	function onClick() {
		alert('Button clicked!')
	}
</script>
```

## See Also

* [Basic Usage of the Button HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/button/index)
* [Using the API of the Button HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/button/api)
* [JavaScript API Reference of the Button](http://docs.telerik.com/kendo-ui/api/javascript/ui/button)
