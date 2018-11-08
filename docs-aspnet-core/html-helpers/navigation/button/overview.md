---
title: Overview
page_title: Button | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Button HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/button
slug: htmlhelpers_button_aspnetcore
position: 1
---

# Button HtmlHelper Overview

The Button HtmlHelper extension is a server-side wrapper for the [Kendo UI Button](http://demos.telerik.com/kendo-ui/button/index) widget.

It enables you to configure the Kendo UI Button widget from server-side code. The [Button](http://docs.telerik.com/kendo-ui/controls/navigation/button/overview) provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

For more information on the HtmlHelper, refer to the article on the [Button HtmlHelper for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/button/overview).

## Basic Usage

The following example demonstrates how to define the Button by using the Button HtmlHelper.

###### Example

```
@(Html.Kendo().Button()
    .Name("textButton")
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```

## Configuration

### Basic Configuration

The following example demonstrates the available configuration options for the Button HtmlHelper. It also shows how to get the Button widget instance.

###### Example

```
@(Html.Kendo().Button()
	.Name("textButton")
	.Content("Sample Button")
	.Enable(false)
	.Tag("a")
)

<script type="text/javascript">
    $(function() {
        //Notice that the Name() of the Button is used to get its client-side instance.
        var button = $("#textButton").data("kendoButton");
    });
</script>
```

The `Name()` configuration method is mandatory as its value will be used for the `id` and the `name` attributes of the Button element. Moreover, the `id` is used in order to properly initialize the Button widget. The `id` attribute value is also used to retrieve its client-side instance.

The `Content()` configuration specifies the text that would be rendered in the button. This option does not accept HTML, but only string values.

The `Enable()` option determines whether the widget will be initially enabled (by default) of disabled.

The `Tag()` method allows the developer to determine whether the widget will be initialized from a `<button>` element (by default), or from an `<a>` element.

### Icons Configuration

The Button can accommodate an icon, which enhances the meaning of the text content.

The Button HTML helper provides three methods for configuring icons&mdash;`Icon()`, `SpriteCssClass()` and `ImageUrl()`. Use only one of them with a particular Button instance. If you define multiple properties, only one of them will be obeyed according to the order stated above.

The `Icon()` method would display the appropriate [Kendo UI font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) as a content of a `<spn> :before` pseudo element. When using an icon in the Button, you may want to completely omit any text to be specified for its contents:

###### Example

```
@(Html.Kendo().Button()
	.Name("textButton")
	.Icon("delete")
)
```

The `SpriteCssClass()` method instead would display the icon as a background of a `span` element:

###### Example

```
@(Html.Kendo().Button()
	.Name("textButton")
	.Content("Sample Button")
	.SpriteCssClass("myDeleteIcon")
)
```

Image icons are applied via the `ImageUrl()` method and are displayed as a `img` element:

###### Example

```
@(Html.Kendo().Button()
	.Name("textButton")
	.Content("Sample Button")
	.ImageUrl("url/to/myDeleteIcon.png")
)
```

## Events

The Button HTML helper exposes only a `Click()` event that could be handled:

###### Example

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

* [JavaScript API Reference of the Button](http://docs.telerik.com/kendo-ui/api/javascript/ui/button)
* [Button HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/button/overview)
* [Button Official Demos](http://demos.telerik.com/aspnet-core/button/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
