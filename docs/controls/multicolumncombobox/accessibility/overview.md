---
title: Overview
page_title: jQuery MultiColumnComboBox Documentation | MultiColumnComboBox Accessibility
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_multicolumncombobox_widget
position: 1
---

# MultiColumnComboBox Accessibility

The MultiColumnComboBox is accessible by screen readers and provides [`WAI-ARIA`](https://www.w3.org/WAI/ARIA/apg/), [`Section 508`](https://www.section508.gov/), [`WCAG 2.2`](https://www.w3.org/TR/WCAG22/), and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI MultiColumnComboBox]({% slug keynav_kendoui_multicolumncombobox_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery MultiColumnComboBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The MultiColumnComboBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The MultiColumnComboBox implements the same ARIA specification as the **ComboBox** component.

[ComboBox accessibility specification]({{combobox_a11y_link}})

## Section 508


The MultiColumnComboBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The MultiColumnComboBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The MultiColumnComboBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The MultiColumnComboBox has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the MultiColumnComboBox component could be found here: https://demos.telerik.com/kendo-ui/accessibility/multicombobox

## See Also

* [Keyboard Navigation by the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/keyboard-navigation)
* [Keyboard Navigation by the MultiColumnComboBox]({% slug keynav_kendoui_multicolumncombobox_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})