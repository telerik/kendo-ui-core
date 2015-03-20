---
title: Use the High Contrast Theme in Kendo UI
related: a11y-accessibility-overview
position: 4
---

# Use the High-Contrast Theme in Kendo UI

## The Need for High-Contrast Visual Representations

In addition to providing WAI-ARIA and Keyboard support, Kendo UI ships with a high-contrast theme that can be used to serve users with low vision or
other visual disabilities requiring a high contrast ratio between foreground and background elements.

The high contrast theme is a full Kendo UI theme that you'd use in place of an existing theme like BlueOpal or Metro. To use it, You should add a
reference to the stylesheet in your app (assuming Kendo stylesheets are in a `stylesheets` directory:

	<link rel='stylesheet' href='/stylesheets/kendo.highcontrast.min.css' />

Once You've added this reference, all Kendo UI widgets and visual elements with a Kendo UI class (like `k-textbox`) will receive high-contrast styles.
This may cause the rest of your site, for example the background an other visual elements, to look out of sync with the new theme.

To address this, you can apply the high contrast styles to all or part of a page by applying the `k-content` class to a container element. For
example, to apply the high-contrast theme to my entire page, and not only Kendo UI elements, apply this class to the `body` element:

	<body class='k-content'>
		<!-- your app here -->
	</body>

## WCAG 2.0 Contrast Support

Sections [1.4.3](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) and [1.4.6](http://www.w3.org/TR/WCAG20/#visual-audio-contrast7) of the
W3C's [Web Content Accessibility Guidelines](http://www.w3.org/TR/WCAG20) state that text and images in a web page should adhere to minimum contrast
ratios (respective to their background elements) in order to be compliant. The Kendo UI high contrast theme has been tested using an [online color
contrast checker](http://www.snook.ca/technical/colour_contrast/colour.html), which yielded the following results:

1. Normal Text Color / Background = 15.9
2. Selected Text Color / Background = 8.59
3. Hover Text Color (Large Text) / Background = 5.94

Items #1 and #2 well-exceed the enhanced minimum ratio of 7 specified in WCAG 2.0, while #3 exceeds the enhanced minimum ratio of 4.5 for large-scale
text. As such, the Kendo UI high-contrast theme is WCAG 2.0 AAA Compliant.
