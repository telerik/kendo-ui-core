---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure the adaptive behavior of the the Telerik UI DropDownList component for {{ site.framework }}."
slug: htmlhelpers_dropdownlist_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} DropDownList supports an adaptive mode that renders a mobile-friendly rendering of its popup. To enable the adaptive rendering mode, set the [`AdaptiveMode()`](/api/kendo.mvc.ui.fluent/dropdownlistbuilder#adaptivemodekendomvcuiadaptivemode) property to `AdaptiveMode.Auto`.

The DropDownList component automatically adapts to the current screen size and changes its rendering accordingly. On medium-sized screens, the suggestion list is displayed as docked to the bottom of the screen, while on smaller screens, it is rendered as a full-screen modal dialog. In all other scenarios, including when the `AdaptiveMode()` option is not specified or is set to its default value of `AdaptiveMode.None`, the standard popup is rendered docked to the input of the component.

The adaptive mode changes the rendering of the DropDownList popup element based on the screen resolution of the device (the horizontal value in `px`) with the following breakpoints:

* Small screens&mdash;up to 500 px.
* Medium screens&mdash;between 501 px and 768 px.
* Large screens&mdash;over 768 px.

The following example demonstrates how to enable the adaptive mode of the DropDownList by using the `AdaptiveMode()` option.

<demo metaUrl="dropdownlist/adaptive_mode/" height="600"></demo>

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the DropDownList HtmlHelper](/api/dropdownlist)
{% if site.core %}
* [Server-Side API of the DropDownList TagHelper](/api/taghelpers/dropdownlist)
{% endif %}
