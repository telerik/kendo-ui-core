---
title: Overview
page_title: MultiColumnComboBox Documentation | MultiColumnComboBox Accessibility
description: "Get started with the {{ site.product }} MultiColumnComboBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_multicolumncombobox
position: 1
---

# MultiColumnComboBox Accessibility

Out of the box, the {{ site.product }} MultiColumnComboBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The MultiColumnComboBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The MultiColumnComboBox implements the same ARIA specification as the ComboBox component.

[ComboBox accessibility specification]({%slug accessibility_aspnetcore_combobox%})

## Section 508

The MultiColumnComboBox is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

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

### Test Example

To test the MultiColumnComboBox component, refer to the [MultiColumnComboBox Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/multicombobox).

## Keyboard Navigation

For details on how the MultiColumnComboBox keyboard navigation works, refer to the [MultiColumnComboBox Keyboard Navigation]({%slug keynav_aspnetcore_multicolumncombobox%}) article.

## See Also

* [Keyboard Navigation by the MultiColumnComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/keyboard-navigation)
* [Keyboard Navigation by the MultiColumnComboBox for {{ site.framework }}]({% slug keynav_aspnetcore_multicolumncombobox %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})