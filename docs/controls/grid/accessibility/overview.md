---
title: Overview
page_title: jQuery Grid Documentation - Grid Accessibility
description: "Get started with the jQuery Grid by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_grid_widget
position: 1
---

# Grid Accessibility

The Grid is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI Grid]({% slug keynav_kendoui_grid_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug wai_aria_accessibility_support %}).

## Section 508

The Grid is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.2

The Grid supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

For more information, refer to:
* [WCAG 2.2 support by the Grid (demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [WCAG 2.2 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %})

## Hierarchical Grid

Customization of the text in the column header for the expand or collapse columns in Hierarchical Grids can be made via the [messages.expandCollapseColumnHeader property](/api/javascript/dataviz/ui/chart#configuration-series.spacing). This sets the value to make the component compliant with the web accessibility standards.

## Scrollable Grid

To achieve a better level of accessibility, disable the Grid's [scrollable](/api/javascript/ui/grid/configuration/scrollable) configuration.

        $("#grid").kendoGrid({
            scrollable: false,
            // other configurations
        });

## See Also

* [WCAG 2.2 Support by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Keyboard Navigation by the Grid (Demo)](https://demos.telerik.com/kendo-ui/web/grid/navigation.html)
* [Keyboard Navigation by the Grid]({% slug keynav_kendoui_grid_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
