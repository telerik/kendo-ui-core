---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure the adaptive behavior of the the Telerik UI ColorPickеr component for {{ site.framework }}."
components: ["colorpicker"]
slug: htmlhelpers_colorpicker_adaptive_mode_aspnetcore
position: 7
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} ColorPicker supports an adaptive mode that renders a mobile-friendly popup. To enable the adaptive rendering mode, set the `AdaptiveMode()` property to `AdaptiveMode.Auto`.

> Starting with the 2025 Q2 release, when the adaptive rendering mode is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user began typing.

The ColorPicker component automatically adapts to the current screen size and changes its rendering accordingly. On medium-sized screens, the suggestion list is displayed as docked to the bottom of the screen, while on smaller screens, it is rendered as a full-screen modal dialog. In all other scenarios, including when the `AdaptiveMode()` option is not specified or is set to its default value of `AdaptiveMode.None`, the standard popup is rendered docked to the input of the component.
The adaptive mode changes the rendering of the ColorPicker popup element based on the screen resolution of the device (the horizontal value in `px`) with the following breakpoints:

* Small screens&mdash;up to 500 px.
* Medium screens&mdash;between 501 px and 768 px.
* Large screens&mdash;over 768 px.


The following example demonstrates how to enable the adaptive mode of the ColorPicker by using the `AdaptiveMode()` option.

<demo metaUrl="colorpicker/adaptive_mode/" height="600"></demo>

## See Also

* [Using the ColorPicker in Adaptive Mode (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/adaptive-mode)
* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the ColorPicker HtmlHelper](/api/colorpicker)
{% if site.core %}
* [Server-Side API of the ColorPicker TagHelper](/api/taghelpers/colorpicker)
{% endif %}
