---
title: Overview
page_title: Window Documentation | Window Accessibility
description: "Get started with the {{ site.product }} Window and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_window
position: 1
---

# Window Accessibility

Out of the box, the {{ site.product }} Window provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Window is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-window:not(.k-dialog)` | `role=dialog` | Announces the `dialog` role of the component. |
|  | `aria-labelledby=.k-window-title id` | Associates the title of the dialog. |
| `.k-overlay + .k-window` | `aria-modal=true` | Announces that the dialog is modal. Attribute is added only when the dialog is modal. |

Action buttons follow the Button component specification.

[Button accessibility specification]({% slug accessibility_aspnetcore_button %})

## Resources

[ARIA practices Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog)

## Section 508

The Window is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Window has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Window has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Window component, refer to the [Window Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/window).

## Keyboard Navigation

For details on how the Window keyboard navigation works, refer to the [Window Keyboard Navigation]({%slug keynav_aspnetcore_window%}) article.

## See Also

* [Keyboard Navigation by the Window for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/window/keyboard-navigation)
* [Keyboard Navigation by the Window for {{ site.framework }}]({% slug keynav_aspnetcore_window %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})