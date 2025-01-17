---
title: Compliance
page_title: Accessibility Compliance
description: "Compliance with the accessibility standards and requirements in the {{ site.product }} suite."
slug: compliance_accessibility
position: 2
---

# Accessibility Standards Compliance

This article lists the accessibility compliance of the {{ site.product }} components.

## Accessibility Conformance Report

The <a href="https://www.section508.gov/sell/acr/" target="_blank">Accessibility Conformance Report (ACR)</a> is a document that explains how information and communication technology products such as software, hardware, electronic content, and support documentation conform to leading global accessibility standards. {{ site.product }} provides an ACR through the <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank">Voluntary Product Accessibility Template (VPAT®)</a>.

>tip Download the latest version of the <a href="assets/kendo-ui-vpat2.4.doc" download>{{ site.product }} Accessibility Conformance Report</a>.

## Compliance Table

The table below specifies the level of WCAG 2.2 compliance of each {{ site.product }} component.

* The *Accessibility Example* column links to component-specific accessibility demo. For general information on how the keyboard support works, see the [Keyboard Navigation]({%slug overview_accessibility%}#keyboard-navigation) section.
* The *Accessibility Documentation* column links to component-specific details and information about WAI-ARIA attributes.
* For information about **Section 508** of the US Rehabilitation Act, the **European Accessibility Act** in the EU, or any other national accessibility legislation, see section [Legal and Technical Compliance]({%slug overview_accessibility%}#legal-and-technical-compliance).

Also check the [notes below the table](#accessibility-compliance-notes).

{% include_relative accessibility-compliance-table.html %}

## Accessibility Compliance Notes

The information in the compliance table above is subject to the following considerations:

* All components implement the required WAI-ARIA attributes without the need for any extra configuration. Some components may provide parameters that render additional optional WAI-ARIA attributes, for example, `aria-label` or `aria-describedby`.
* The compliance levels are achievable with the [*Default Ocean Blue A11y* theme swatch]({%slug overview_accessibility%}#color-contrast) or any other [custom theme swatch]({%slug sassbasedthemes_customization_telerikui%}) that provides the minimum required color contrast.
* The accessibility and compliance of some components may depend on the enabled features. In such cases, the compliance table information is based on the default component configuration.
* Component templates introduce custom markup that may not be accessible. Test any modifications to ensure the web content still meets the desired level of accessibility compliance. Be mindful of components that work with user input such as images, text, or HTML content.
* Due to the complexity of some components, there are scenarios that are not covered by the WAI-ARIA specification.

## See Also

* [Accessibility Overview]({%slug overview_accessibility%})
* [Globalization Overview]({%slug overview_globalization_core%})

