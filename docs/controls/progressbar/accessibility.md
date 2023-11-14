---
title: Accessibility
page_title: jQuery ProgressBar Documentation - ProgressBar Accessibility
description: "Get started with the jQuery ProgressBar by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_progressbar_widget
position: 3
---

# ProgressBar Accessibility

When used as a loading indicator, the ProgressBar and its status can also be made available to assistive technologies.

## WAI-ARIA

When used as a loading indicator, the component should follow [the WAI-ARIA specification for a progressbar](https://www.w3.org/TR/wai-aria/#progressbar). According to that, the progressbar is *"An element that displays the progress status for tasks that take a long time."*. To guarantee compliance with the spec, the [`ariaRole`](/api/javascript/ui/progressbar/configuration/ariaRole) configuration option should be set to `true` and a label should be provided using either the [`label`](/api/javascript/ui/progressbar/configuration/label) or the [`labelId`](/api/javascript/ui/progressbar/configuration/labelId) options.

## Section 508

The ProgressBar is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.2

The ProgressBar supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.2 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %})

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [JavaScript API Reference of the ProgressBar](/api/javascript/ui/progressbar)
