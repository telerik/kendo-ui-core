---
title: Wai-Aria Support
page_title: jQuery Window Documentation | Window Accessibility
description: "Get started with the jQuery Window by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["window"]
slug: jquery_window_accessibility
position: 1
---

# Window Accessibility

The Window is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI Window]({% slug keynav_window %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Window provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Window is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-window:not(.k-dialog)` | `role=dialog` | Announces the dialog role of the component. |
|  | `aria-labelledby=.k-window-title id` | Associate the title of the dialog. |
| `.k-overlay + .k-window` | `aria-modal=true` | Announces that the dialog is modal. Attribute is added only when the dialog is modal. |


Action buttons follow the **Button** specification.

[Button accessibility specification]({% slug jquery_button_accessibility %})

## Resources

[ARIA practices Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)

## Section 508


The Window is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

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



### Automated Testing
The Window has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Window component could be found here: https://demos.telerik.com/kendo-ui/accessibility/window
## See Also
* [Keyboard Navigation by the Window (Demo)](https://demos.telerik.com/kendo-ui/window/keyboard-navigation)
* [Keyboard Navigation by the Window]({% slug keynav_window %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
