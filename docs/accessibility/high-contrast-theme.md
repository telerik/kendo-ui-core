---
title: High-Contrast Theme
page_title: High-Contrast Theme | Kendo UI Accessibility Support
related: a11y-accessibility-overview
description: "Accessibility support through setting Kendo UI high-contrast theme for HTML5 UI controls."
slug: high_contrast_theme_accessibility_support
position: 7
---

# High-Contrast Theme

In addition to providing WAI-ARIA and keyboard support, Kendo UI ships with a high-contrast theme that can be used to serve users with low vision or other visual disabilities, which require a high contrast ratio between foreground and background elements.

## Overview

The high contrast theme is a full Kendo UI theme that you can use in place of an existing theme like BlueOpal or Metro. Assuming Kendo UI stylesheets are in a `stylesheets` directory, add a reference to the stylesheet in your application to use the high-contrast theme.

		<link rel='stylesheet' href='/stylesheets/kendo.highcontrast.min.css' />

Once you add this reference, all Kendo UI widgets and visual elements with a Kendo UI class, such as `k-textbox`, will receive high-contrast styles. This may cause the rest of your site, for example, the background and other visual elements, to look out of sync with the new theme.

To address this issue, apply the high-contrast styles to all or part of a page by applying the `k-content` class to a container element. For example, to apply the high-contrast theme to your entire page, and not only to Kendo UI elements, apply this class to the `body` element:

	<body class='k-content'>
		<!-- your app here -->
	</body>

## WCAG 2.1

The [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21) sections [1.4.3 Contrast (Minimum)](hhttps://www.w3.org/TR/WCAG21/#contrast-minimum) and [1.4.6 Contrast (Enhanced)](https://www.w3.org/TR/WCAG21/#contrast-enhanced) state that to be compliant, text and images in a web page must adhere to minimum contrast ratios (with respect to their background elements). The Kendo UI High Contrast theme was tested by using an [online color contrast checker](http://www.snook.ca/technical/colour_contrast/colour.html) which yielded the following results:

1. Normal Text Color / Background = 15.9
2. Selected Text Color / Background = 8.59
3. Hover Text Color (Large Text) / Background = 5.94

The first two results exceed the enhanced minimum ratio of seven that is specified in WCAG 2.1 while the third result exceeds the enhanced minimum ratio of 4.5 for large-scale text. As such, the Kendo UI High Contrast theme is WCAG 2.1 AAA compliant.

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.0 Compliance of Kendo UI Widgets]({% slug section508_wcag20_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
