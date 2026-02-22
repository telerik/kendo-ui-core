---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure the adaptive behavior of the Telerik UI Pager component for {{ site.framework }}."
components: ["pager"]
slug: htmlhelpers_pager_adaptive_mode
position: 4
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} Pager supports an adaptive mode that provides a mobile-friendly rendering of its [built-in drop-down that allows the user to change the page size]({% slug settings_pager_aspnet%}#settings).

To enable the adaptive rendering mode, set the `AdaptiveMode()` property to `AdaptiveMode.Auto`.

The Pager component automatically adapts to the current screen size and changes the rendering of the drop-down for page size selection accordingly. On medium-sized screens, the options list is displayed as docked to the bottom of the screen, while on smaller screens, it is rendered as a full-screen modal dialog. In all other scenarios, including when the `AdaptiveMode()` option is not specified or is set to its default value of `AdaptiveMode.None`, the standard popup is rendered docked to the input of the drop-down.

The adaptive mode changes the rendering of the Pager's drop-down element based on the screen resolution of the device (the horizontal value in `px`) with the following breakpoints:

* Small screens&mdash;up to 500 px.
* Medium screens&mdash;between 501 px and 768 px.
* Large screens&mdash;over 768 px.

The following example demonstrates how to enable the adaptive mode of the Pager by using the `AdaptiveMode()` option.

<demo metaUrl="pager/adaptive_mode/" height="600"></demo>

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the Pager HtmlHelper](/api/pager)
{% if site.core %}
* [Server-Side API of the Pager TagHelper](/api/taghelpers/pager)
{% endif %}
