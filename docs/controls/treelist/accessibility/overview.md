---
title: Overview
page_title: jQuery TreeList Documentation - TreeList Accessibility
description: "Get started with the jQuery TreeList by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_treelist
position: 1
---

# TreeList Accessibility

The TreeList is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI TreeList]({% slug keynav_kendoui_treelist_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug wai_aria_accessibility_support %}).

## Section 508

The TreeList is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.2

The TreeList supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

For more information, refer to:
* [WCAG 2.2 support by the TreeList (demo)](https://demos.telerik.com/kendo-ui/treelist/index)
* [WCAG 2.2 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %})

## Scrollable TreeList

To achieve a better level of accessibility, disable the TreeLists's [scrollable](/api/javascript/ui/treelist/configuration/scrollable) configuration.

        $("#treelist").kendoTreeList({
            scrollable: false,
            // other configurations
        });

## See Also

* [WCAG 2.2 Support by the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/index)
* [Keyboard Navigation by the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation)
* [Keyboard Navigation by the TreeList]({% slug keynav_kendoui_treelist_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
