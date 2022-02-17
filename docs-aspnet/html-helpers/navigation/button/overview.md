---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Button component for {{ site.framework }}."
previous_url: /helpers/html-helpers/button, /helpers/navigation/button/overview
slug: htmlhelpers_button_aspnetcore
position: 1
---

# Button Overview

{% if site.core %}
The Telerik UI Button TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Button widget.
{% else %}
The Telerik UI Button HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Button widget.
{% endif %}

The Button provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI for jQuery styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

* [Demo page for the Button HtmlHelper](https://demos.telerik.com/{{ site.platform }}/button/index)
{% if site.core %}
* [Demo page for the Button TagHelper](https://demos.telerik.com/aspnet-core/button/tag-helper)
{% endif %}

## Initializing the Button

The following example demonstrates how to define the Button.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
	<kendo-button name="textButton">Click here!</kendo-button>
```
{% endif %}

## Basic Configuration

* The `Name()` configuration method is mandatory as its value will be used for the `id` and the `name` attributes of the Button element. Moreover, the `id` is used in order to properly initialize the Button widget. The `id` attribute value is also used to retrieve its client-side instance.
* The `Content()` configuration specifies the text that would be rendered in the button. This option does not accept HTML, but only string values.
* The `Enable()` option determines whether the widget will be initially enabled (by default) of disabled.
* The `Tag()` method allows the developer to determine whether the widget will be initialized from a `<button>` element (by default), or from an `<a>` element.

The following example demonstrates the available configuration options for the Button.

```HtmlHelper
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
{% if site.core %}
```TagHelper
	<kendo-button name="imageButton" enable="true" tag="a" image-url="/shared/icons/sports/snowboarding.png">
			<badge text="+1" 
			shape="@BadgeShape.Circle" 
			size="@BadgeSize.Medium" 
			theme-color="@BadgeColor.Success"
			position="@BadgePosition.Edge"
			align="@BadgeAlign.TopEnd" />
	Image button
	</kendo-button>
```
{% endif %}

## Functionality and Features

* [Disabled Button]({% slug disabled_buttonhelper_aspnetmvc %})
* [Icon Button]({% slug icons_button_aspnetcore %})
* [Badge Button]({% slug badges_button_aspnetcore %})

## Events

The Button HTML helper exposes only a `Click()` event that can be handled. For a complete example on basic Button events, refer to the [demo on using the events of the Button](https://demos.telerik.com/{{ site.platform }}/button/events).

```HtmlHelper
	@(Html.Kendo().Button()
		.Name("button")
		.Content("Sample Button")
		.Events(e => e.Click("onClick"))
	)

	<script>
		function onClick() {
			alert('Button clicked!')
			window.location.href = 'https://en.wikipedia.org/';
		}
	</script>
```

## See Also

* [Basic Usage of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/index)
{% if site.core %}
* [Basic Usage of the Button TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/button/tag-helper)
{% endif %}
* [Using the API of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/api)
* [Button Server-Side API](/api/button)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)
