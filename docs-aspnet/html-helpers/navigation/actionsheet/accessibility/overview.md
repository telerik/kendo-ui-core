---
title: Overview
page_title: ActionSheet Documentation | ActionSheet Accessibility
description: "Get started with the {{ site.product }} ActionSheet and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_accessibility_actionsheet_aspnetcore
position: 1
---

# ActionSheet Accessibility

Out of the box, the {{ site.product }} ActionSheet provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The ActionSheet is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### ActionSheet component

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-actionsheet` | `role=dialog` | Announces the dialog role of the component. |
|  | `aria-labelledby=.k-actionsheet-title id` | Associates the title of the action sheet. |
|  | `aria-hidden=true/false` | Announces the hidden state of the ActionSheet container. |
|  | `aria-modal=true` | Announces that the action sheet is modal. |
| `.k-actionsheet .k-actionsheet-title` | `id` | Used to associate the title with the action sheet wrapper element. |
| `.k-list-ul` | `role=group` | Sets the role attribute of the action sheet items wrapper to group. |
| `.k-actionsheet-item` | `tabindex=0` | Makes items focusable and includes them in the natural tab sequence. |
|  | `role=button` | Sets action sheet items role to button. |
| `.k-actionsheet-item.k-disabled` | `aria-disabled=true` | Announces action items as disabled as necessary. |

## Resources

[ARIA practices Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog)

## Section 508

The ActionSheet is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The ActionSheet has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The ActionSheet has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the ActionSheet component, refer to the [ActionSheet Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/actionsheet).

## Keyboard Navigation

For details on how the ActionSheet keyboard navigation works, refer to the [ActionSheet Keyboard Navigation]({%slug htmlhelpers_actionsheet_keyboardnavigation_aspnetcore%}) article.

## See Also
* [Keyboard Navigation by the ActionSheet for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet/keyboard-navigation)
* [Keyboard Navigation by the ActionSheet for {{ site.framework }}]({% slug htmlhelpers_actionsheet_keyboardnavigation_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})