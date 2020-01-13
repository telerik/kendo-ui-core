---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Button HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/button, /helpers/navigation/button/overview
slug: htmlhelpers_button_aspnetcore
position: 1
---

# Button HtmlHelper Overview

The Telerik UI Button HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Button widget.

The Button provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI for jQuery styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

* [Demo page for the Button](https://demos.telerik.com/{{ site.platform }}/button/index)

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

The Button provides options for rendering [icons in the button]({% slug icons_button_aspnetcore %}).

## Events

The Button HTML helper exposes only a `Click()` event that can be handled. For a complete example on basic Button events, refer to the [demo on using the events of the Button](https://demos.telerik.com/{{ site.platform }}/button/events).

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

* [Basic Usage of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/index)
* [Using the API of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/api)
* [Server-Side API](/api/button)
