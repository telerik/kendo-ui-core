---
title: Responsive Pager
page_title: jQuery Pager Documentation | Responsive Pager
description: "Get started with the jQuery Pager by Kendo UI and learn about its responsive feature."
slug: responsive_kendoui_pager_widget
---

## Responsive Design

The Kendo UI Pager is responsive by default. To disable the responsive behavior and have all of its elements visible at all times set the [`responsive`](/api/javascript/ui/pager/configuration/responsive) property to `false`.

## Visible Elements

The Pager widget determines which internal elements to render based on its width. When the Pager width is greater than or equal to 600 pixels, all elements are visible:

- [`Page Sizes Dropdown`](/api/javascript/ui/pager/configuration/pagesizes)
- [`Numeric Page Number Buttons`](/api/javascript/ui/pager/configuration/numeric) or a [`Numeric Input`](/api/javascript/ui/pager/configuration/input) if the pager is an `input` one.
- [`Info element`](/api/javascript/ui/pager/configuration/info) 

## Breaking Points

When the Pager width is greater than or equal to 600 pixels, all elements are visible:

![A Pager widget at over 600px resolution](../../../images/pager-responsive/over600.png)

When the Pager width is greater than 480 and less than 600 pixels, the label showing the current paging information is hidden:

![A Pager widget between 480 and 600px resolution](../../../images/pager-responsive/480_600.png)

When the Pager width is greater than 360 and less than 480 pixels, the current page is represented by a native `<select/>` element. The `pageSizes` dropdown and the label showing the current paging information are hidden.

![A Pager widget between 360 and 480px resolution](../../../images/pager-responsive/360_480.png)

When the Pager width is less than 360 pixels, the current page is represented by a native `<select/>` element. The `pageSizes` dropdown and the label showing the current paging information are hidden.

![A Pager widget under 360 pixels](../../../images/pager-responsive/under360.png)

## See Also

* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Pager Settings and Types]({% slug settings_kendoui_pager_widget %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
* [Globalization and Messages]({% slug globalization_kendoui_pager_widget %})
