---
title: Overview
page_title: Overview
description: "Discover the Telerik UI ToggleButton component for {{ site.framework }} that provides features like Badges, Icons, and numerous built-in configuration options."
components: ["togglebutton"]
slug: htmlhelpers_togglebutton_aspnetcore
position: 0
---

# {{ site.framework }} ToggleButton Overview

{% if site.core %}
The Telerik UI ToggleButton TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ToggleButton widget.
{% else %}
The Telerik UI ToggleButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ToggleButton widget.
{% endif %}

The ToggleButton provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI for jQuery styling, the ToggleButton enables you to indicate whether it is active or inactive, as well as group related options between various of ToggleButton components. 

* [Demo page for the ToggleButton HtmlHelper](https://demos.telerik.com/{{ site.platform }}/togglebutton/index)

## Initializing the ToggleButton

The following example demonstrates how to define the ToggleButton.

```HtmlHelper
@(Html.Kendo().ToggleButton()
    .Name("toggleButton")
    .Tag("button")
    .Content("Text ToggleButton")
)
```
{% if site.core %}
```TagHelper
    <kendo-togglebutton name="toggleButton" tag="button">Text ToggleButton</kendo-togglebutton>
```
{% endif %}

## Basic Configuration

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the ToggleButton element. Moreover, the `id` is used to properly initialize the ToggleButton widget. You can also use the value of the `id` attribute to retrieve the client-side instance of the ToggleButton.
* The `Content()` configuration specifies the text that is rendered within the button. This option does not accept HTML, but only string values.
* The `Enable()` option determines whether the widget will be initially enabled (by default) of disabled.
* The `Group()` option specifies a group of ToggleButtons the current instance belongs to.
* The `Tag()` method allows the developer to determine whether the widget will be initialized from a `<button>` element (by default), or from an `<a>` element.

The following example demonstrates the available configuration options for the ToggleButton.

```HtmlHelper
@(Html.Kendo().ToggleButton()
	.Name("toggleButton")
	.Content("Sample Button")
	.Enable(false)
    .Group("myGroup")
	.Tag("a")
)

<script type="text/javascript">
    $(function() {
        // The Name() of the ToggleButton is used to get its client-side instance.
        var togglebutton = $("#toggleButton").data("kendoToggleButton");
    });
</script>
```
{% if site.core %}
```TagHelper
<kendo-togglebutton name="toggleButton"
              enable="false"
              group="myGroup"
              tag="a">
            Sample Button
</kendo-togglebutton>

<script type="text/javascript">
    $(function() {
        // The Name() of the ToggleButton is used to get its client-side instance.
        var togglebutton = $("#toggleButton").data("kendoToggleButton");
    });
</script>
```
{% endif %}

## Functionality and Features

* [Appearance]({% slug togglebutton_appearance %})&mdash;Use different configuration settings that control the styling of the component.
* [Icons]({% slug icons_togglebutton_aspnetcore %})&mdash;The variety of icons allows you to enhance the appearance of the ToggleButton.
* [Group]({% slug htmlhelpers_togglebutton_aspnetcore_group %})&mdash;You can group several ToggleButton instances.
* [Badges]({% slug badges_togglebutton_aspnetcore %})&mdash;Add a [Badge]({% slug overview_badgehelper_aspnetcore %}) to the ToggleButton to conveniently show its status, a notification, or a short message.
* [Accessibility]({% slug htmlhelpers_togglebutton_accessibility %})&mdash;The ToggleButton is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_togglebutton%}) for faster navigation.

## Next Steps

* [Basic Usage of the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/index)

## See Also

* [Using the API of the ToggleButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/api)
* [Knowledge Base Section](/knowledge-base)
