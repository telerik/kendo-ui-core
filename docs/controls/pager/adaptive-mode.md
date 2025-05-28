---
title: Adaptive Mode
page_title: jQuery Pager Documentation - Adaptive Mode
description: "Learn about the adaptive mode of the jQuery Pager by Kendo UI and how it enhances the responsive behavior of the component."
slug: adaptivemode_kendoui_pager_widget
---

# Adaptive Mode

Starting with Q2 2025, the Pager provides an adaptive mode that enhances its responsive behavior and optimizes the user experience on different screen sizes.

The adaptive mode is an enhancement to the default [`responsive behavior`]({% slug responsive_kendoui_pager_widget %}) of the Pager. When enabled, it provides a more streamlined interface when the available space is limited.

To enable the adaptive mode, set the `adaptiveMode` option to `true`:

<demo metaUrl="pager/adaptive-mode/" height="600"></demo>

For details on related breaking changes introduced in this release, refer to the [Breaking Changes in 2025 Releases article](({% slug breakingchanges2025_kendoui %})).

## Responsive vs. Adaptive Mode

While the standard [responsive behavior]({% slug responsive_kendoui_pager_widget %}) of the Pager uses specific breakpoints to determine which elements to show or hide, the adaptive mode takes a different approach:

* The adaptive mode emphasizes optimizing available space without relying solely on fixed breakpoints.
* When space is limited, UI elements transform to more compact alternatives (like NumericTextBox replacing page buttons).
* The adaptive mode prioritizes usability in constrained spaces while maintaining all essential pagination functionality.

## See Also

* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Responsive Pager]({% slug responsive_kendoui_pager_widget %})
* [Pager Settings and Types]({% slug settings_kendoui_pager_widget %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
