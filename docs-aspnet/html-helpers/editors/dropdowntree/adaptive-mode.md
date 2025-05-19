---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure the adaptive behavior of the the Telerik UI DropDownTree component for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} DropDownTree supports an adaptive mode that renders a mobile-friendly rendering of its popup. To enable the adaptive rendering mode, set the [`AdaptiveMode()`](/api/kendo.mvc.ui.fluent/dropdowntreebuilder#adaptivemodekendomvcuiadaptivemode) property to `AdaptiveMode.Auto`.

> Starting with the 2025 Q2 release, when the adaptive rendering mode is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user began typing.

The DropDownTree component automatically adapts to the current screen size and changes its rendering accordingly. On medium-sized screens, the suggestion list is displayed as docked to the bottom of the screen, while on smaller screens, it is rendered as a full-screen modal dialog. In all other scenarios, including when the `AdaptiveMode()` option is not specified or is set to its default value of `AdaptiveMode.None`, the standard popup is rendered docked to the input of the component.

The adaptive mode changes the rendering of the DropDownTree popup element based on the screen resolution of the device (the horizontal value in `px`) with the following breakpoints:

* Small screens&mdash;up to 500 px.
* Medium screens&mdash;between 501 px and 768 px.
* Large screens&mdash;over 768 px.

The following example demonstrates how to enable the adaptive mode of the DropDownTree by using the `AdaptiveMode()` option.

<demo metaUrl="dropdowntree/adaptive_mode/" height="600"></demo>

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the DropDownTree HtmlHelper](/api/dropdowntree)
{% if site.core %}
* [Server-Side API of the DropDownTree TagHelper](/api/taghelpers/dropdowntree)
{% endif %}
