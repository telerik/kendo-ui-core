---
title: Adaptive Mode
page_title: jQuery Pager Documentation - Adaptive Mode
description: "Learn about the adaptive mode of the jQuery Pager by Kendo UI and how it enhances the responsive behavior of the component."
components: ["pager"]
slug: adaptivemode_kendoui_pager_widget
---


# Adaptive Mode

The Kendo UI for jQuery Pager features an [adaptive mode](/api/javascript/ui/pager/configuration/adaptivemode) that improves usability on mobile and small screens by transforming the page selection interface. When enabled via the `adaptiveMode` option, the Pager automatically switches its page selector to a DropDownList, which adapts its appearance based on the device's screen size.

Depending on the screen width, the DropDownList for page selection may appear as a standard popup, docked to the bottom, or as a full-screen modal—ensuring optimal accessibility and touch support. Typical breakpoints are up to 500px for small screens, 501–768px for medium, and above 768px for large screens.

This adaptive behavior allows users to easily navigate pages regardless of device, without manual configuration for different resolutions.

To enable, set `adaptiveMode: true` in the Pager configuration.

<demo metaUrl="pager/adaptive-mode/" height="600"></demo>

## See Also

* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Responsive Pager]({% slug responsive_kendoui_pager_widget %})
* [Pager Settings and Types]({% slug settings_kendoui_pager_widget %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
