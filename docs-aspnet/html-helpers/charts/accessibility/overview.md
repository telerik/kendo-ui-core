---
title: Overview
page_title: Telerik UI Charts for {{ site.framework }} Documentation - Charts Accessibility
description: "Get started with the Telerik UI Chart component for {{ site.framework }} and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_charts
position: 1
---

# Chart Accessibility

The Chart is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Telerik UI Charts for {{ site.framework }}]({% slug keynav_aspnetcore_charts %})
* [Accessibility in Telerik UI for {{ site.framework }}]({% slug overview_accessibility %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [Accessibility Compliance Table in Telerik UI for {{ site.framework }}]({% slug compliance_accessibility %}).

## Section 508

The Chart is compliant with the Section 508 requirements. For more information, refer to the article on [Accessibility Compliance Table in Telerik UI for {{ site.framework }}]({% slug compliance_accessibility %}).

## WCAG 2.2

The Chart supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

Meeting some of the Success Criteria in WCAG 2.2 may require additional customization:
* ***1.4.3** Contrast (Minimum)*

  The color of chart elements may need to be customized to meet the minimum required contrast level. Some Theme Swatches like the Ocean Blue A11y Accessibility Swatch meet and exceed this criteria.
* ***2.5.8:** Target Size (Minimum)*

  The size of Series Markers and the font size of Legend Items may need to be customized to meet the minimum size of 24x24px required by this criteria.


## See Also

* [WCAG 2.2 Support by the Chart (Demo)](https://demos.telerik.com/{{ site.platform }}/charts/index)
* [Keyboard Navigation by the Chart (Demo)](https://demos.telerik.com/{{ site.platform }}/charts/keyboard_navigation)
* [Keyboard Navigation by the Chart]({% slug keynav_aspnetcore_charts %})
* [Accessibility in Telerik UI for {{ site.framework }}]({% slug overview_accessibility %})
