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

The Switch displays two exclusive choices, and when initialized, the Switch renders the currently selected value. 

* [Demo page for the Switch](https://demos.telerik.com/{{ site.platform }}/switch/index)

> By default, the labels of the Switch are not visible when using Bootstrap or Material themes.

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
* [Events]({% slug events_switch %})&mdash;The Switch allows you to handle its events and implement custom functionality.
* [Accessibility]({% slug htmlhelpers_switch_accessibility %})&mdash;The Switch provides accessibility support through its keyboard navigation.

>tip To learn more about the appearance, anatomy, and accessibility of the Switch, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/switch/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the Switch ]({% slug aspnetcore_switch_getting_started %})
* [Basic Usage of the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/index)
{% if site.core %}
* [Switch in Razor Pages]({% slug htmlhelpers_switch_aspnetcore_razor_page %})
{% endif %}

## See Also

* [Basic Usage by the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch)
* [Using the API of the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/api)
* [Server-Side API](/api/switch)
