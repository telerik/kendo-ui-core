---
title: Overview
page_title: Dialog Documentation | Dialog Accessibility
description: "Get started with the {{ site.product }} Dialog and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessbility_aspnetcore_dialog
position: 1
---

# Dialog Accessibility

Out of the box, the {{ site.product }} Dialog provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Dialog is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Dialog component

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-dialog` | `role=dialog` | Announces the dialog role of the component. |
|  | `aria-labelledby=.k-dialog-titlebar id` | Associates the title of the dialog. |
|  | `aria-describedby=.k-dialog-content id` | Associates the dialog content to the wrap element. |
| `.k-overlay + .k-dialog` | `aria-modal=true` | Announces that the dialog is modal. Attribute is added only when the dialog is modal. |

### Predefined dialogs

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-dialog.k-prompt,.k-dialog.k-alert,.k-dialog.k-confirm` | `role=alertdialog` | Announces the dialog role of the component. |

## Resources

[ARIA practices Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog)

## Section 508

The Dialog is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Dialog has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Dialog has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Dialog component, refer to the [Dialog Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dialog).

## Keyboard Navigation

For details on how the Dialog keyboard navigation works, refer to the [Dialog Keyboard Navigation]({%slug keynav_aspnetcore_dialog%}) article.

## See Also

* [Keyboard Navigation by the Dialog for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dialog/keyboard-navigation)
* [Keyboard Navigation by the Dialog for {{ site.framework }}]({% slug keynav_aspnetcore_dialog %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})