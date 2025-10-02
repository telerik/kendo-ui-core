---
title: Overview
page_title: jQuery Charts Documentation - Charts Accessibility
description: "Get started with the jQuery Charts by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_chart_accessibility
position: 1
---

# Chart Accessibility

The Chart is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI Charts]({% slug keynav_kendoui_charts_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#wai-aria).

## Section 508

The Chart is compliant with the Section 508 requirements. For more information, refer to the article on [Accessibility Compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %}).

## WCAG 2.2

The Chart supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

Meeting some of the Success Criteria in WCAG 2.2 may require additional customization:
* ***1.4.3** Contrast (Minimum)*

  The color of chart elements may need to be customized to meet the minimum required contrast level. Some [Theme Swatches]({% slug sassbasedthemes_kendoui %}) like the [Ocean Blue A11y Accessibility Swatch]({%slug sassbasedthemes_kendoui%}#swatch) meet and exceed this criteria.
* ***2.5.8:** Target Size (Minimum)*

  The size of [Series Markers](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.markers) and the font size of [Legend Items](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/legend.item) may need to be customized to meet the minimum size of 24x24px required by this criteria.

For more information, refer to:
* [WCAG 2.2 support by the Chart (demo)](https://demos.telerik.com/kendo-ui/charts/index)
* [Accessibility Compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %})

## See Also

* [WCAG 2.2 Support by the Chart (Demo)](https://demos.telerik.com/kendo-ui/charts/index)
* [Keyboard Navigation by the Chart (Demo)](https://demos.telerik.com/kendo-ui/charts/keyboard-navigation)
* [Keyboard Navigation by the Chart]({% slug keynav_kendoui_charts_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
