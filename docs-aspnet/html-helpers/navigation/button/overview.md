---
title: Overview
page_title: Overview
description: "Discover the Telerik UI Button component for {{ site.framework }} that provides features like Badges, Icons, and numerous built-in configuration options."
previous_url: /helpers/html-helpers/button, /helpers/navigation/button/overview
slug: htmlhelpers_button_aspnetcore
position: 0
---

# {{ site.framework }} Button Overview

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
    <kendo-button name="textButton" type="button">Text Button</kendo-button>
```
{% endif %}

## Basic Configuration

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Button element. Moreover, the `id` is used to properly initialize the Button widget. You can also use the value of the `id` attribute to retrieve the client-side instance of the Button.
* The `Content()` configuration specifies the text that is rendered within the button. This option does not accept HTML, but only string values.
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
<kendo-button name="textButton"
              enable="false"
              tag="a">
            Sample Button
</kendo-button>

<script type="text/javascript">
    $(function() {
        // The Name() of the Button is used to get its client-side instance.
        var button = $("#textButton").data("kendoButton");
    });
</script>
```
{% endif %}

## Functionality and Features

* [Disabled Button]({% slug disabled_buttonhelper_aspnetmvc %})&mdash;You can render the Button as disabled until certain conditions are met.
* [Icon Button]({% slug icons_button_aspnetcore %})&mdash;The variety of icons allow you to enhance the appearance of the button. 
* [Badge Button]({% slug badges_button_aspnetcore %})&mdash;You can add a Badge to the Button to conveniently show its status, a notification, or a short message.
* [Events]({% slug events_button_aspnetcore %})&mdash;The Button allows you to handle its click event and implement custom functionality.

>tip To learn more about the appearance, anatomy, and accessibility of the Button, visit the [Telerik and Kendo UI Design System documentation](https://www.telerik.com/design-system/docs/components/button)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the Button]({% slug aspnetcore_button_getting_started %})
* [Basic Usage of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/index)
{% if site.core %}
* [Basic Usage of the Button TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/button/tag-helper)
* [Button in Razor Pages]({% slug htmlhelpers_button_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the Button for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/api)
* [Knowledge Base Section](/knowledge-base)
