---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Switch for {{ site.framework }}."
previous_url: /helpers/editors/switch/overview
slug: overview_switchhelper_aspnetcore
position: 0
---

# {{ site.framework }} Switch Overview

{% if site.core %}
The Telerik UI Switch TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Switch widget.
{% else %}
The Telerik UI Switch HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Switch widget.
{% endif %}

The Switch displays two exclusive choices. With the new Switch variables introduced in the Kendo UI for jQuery R1 2019 release, the default styling of the Switch component for each of the [Sass-based Kendo UI for jQuery themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout. For more information and examples, refer to the article on implementing a [custom layout for the Switch](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout).

* [Demo page for the Switch](https://demos.telerik.com/{{ site.platform }}/switch/index)
{% if site.core %}
* [Demo page for the Switch](https://demos.telerik.com/aspnet-core/switch/tag-helper)
{% endif %}

## Initializing the Switch

The following example demonstrates how to define the Switch.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch") // The name of the Switch is mandatory. It specifies the "id" attribute of the widget.
        .Checked(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch"
            checked="true">
    </kendo-switch>
```
{% endif %}

## Basic Configuration

The configuration options of the Switch are passed as attributes.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Checked(true)
        .Enabled(true))
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch"
            checked="true"
            enabled="true">
    </kendo-switch>
```
{% endif %}

## Functionality and Features

* [Appearance]({% slug switch_appearance %})&mdash;The Switch enables you to customize its appearance based on your requirements.
* [Accessibility]({% slug accessibility_aspnetcore_switch %})&mdash;The Switch provides accessibility support through its keyboard navigation.
* [Events]({% slug events_switch %})&mdash;The Switch allows you to handle its events and implement custom functionality.

>tip To learn more about the appearance, anatomy, and accessibility of the Switch, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/switch/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the Switch ]({% slug aspnetcore_switch_getting_started %})
* [Basic Usage of the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/index)

## See Also

* [Basic Usage by the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch)
* [Using the API of the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/api)
* [Server-Side API](/api/switch)
