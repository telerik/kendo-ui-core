---
title: Responsive Pager
page_title: jQuery Pager Documentation - Responsive Pager
description: "Get started with the jQuery Pager by Kendo UI and learn about its responsive feature."
components: ["pager"]
slug: responsive_kendoui_pager_widget
---


## Responsive Design

The Kendo UI for jQuery Pager is designed to automatically adjust its layout and visible elements based on the available width, ensuring a smooth experience across desktops, tablets, and mobile devices. No manual configuration is needed—responsiveness is enabled by default, but you can turn it off using the [`responsive`](/api/javascript/ui/pager/configuration/responsive) property.

## How Responsiveness Works

As the Pager's width changes, it adapts by showing or hiding certain controls to maintain usability:

- **600px and above:** All Pager features are visible, including the page size dropdown, numeric page buttons, and info label.
- **480–599px:** The info label is hidden, but navigation and page size controls remain accessible.
- **360–479px:** The page selector switches to a native dropdown for compactness, and both the page size dropdown and info label are hidden.
- **Below 360px:** Only the essential page selector (dropdown) is shown for maximum space efficiency.

This responsive behavior ensures that users can easily navigate and interact with the Pager, regardless of device or screen size.

## See Also

* [Pager Adaptive Mode]({% slug adaptivemode_kendoui_pager_widget %})
* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Pager Settings and Types]({% slug settings_kendoui_pager_widget %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
* [Globalization and Messages]({% slug globalization_kendoui_pager_widget %})
