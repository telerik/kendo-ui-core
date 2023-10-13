---
title: Themes and Swatches
page_title: Themes and Swatches - Kendo UI Accessibility Support
related: a11y-accessibility-overview
description: "Accessibility support through themes and swatches for Kendo UI components."
slug: high_contrast_theme_accessibility_support
position: 6
---

# Themes and Swatches

In addition to providing WAI-ARIA and keyboard support, Kendo UI for jQuery ships with a contrast-compliant theme that can be used to serve users with low vision or other visual disabilities, which require a high contrast ratio between the foreground and background elements.

## Ocean Blue A11y Accessibility Swatch

The [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG22/#contrast-minimum) and [1.4.6 Contrast (Enhanced) Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG22/#contrast-enhanced) sections define the required contrast ratio for compliance.

WCAG Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. WCAG Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.

The Kendo UI for Angular library conforms to WCAG Level AA with the Default Ocean Blue A11y theme swatch coming with enabled contrast focus indicators, available as of version 6.0.1 of the Default Theme.

## Setup

Kendo UI for jQuery distributes the Default Ocean Blue A11y theme swatch with the `@progress/kendo-theme-default` package. If you don't need to apply any [customization](/styles-and-layout/sass-themes/customization) to the theme, reference the precompiled CSS directly from CDN:

```
<head>
    ...
    <!--This is an example link and 6.2.0 represents the version of the theme.
    It is recommended to use the latest version.-->
    <link
        rel="stylesheet"
        href="https://cdn.kendostatic.com/themes/6.2.0/default/default-ocean-blue-a11y.css"/>
</head>
```

To customize the provided accessibility swatch, install the Default theme and import the swatch styles directly:

```
// Import the Default theme accessibility swatch
import '@progress/kendo-theme-default/dist/default-ocean-blue-a11y.scss';
```

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.2 Compliance of Kendo UI Components]({% slug section508_wcag21_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
