---
title: Overview
page_title: jQuery Notification Documentation | Notification Accessibility
description: "Get started with the jQuery Notification by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_notification_widget
position: 1
---

# Notification Accessibility

The Notification is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery Notification provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Notification is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-notification` | `role=alert` | Notification element should be marked as an alert. |
|  | `aria-live=polite` | The aria-live value must be set to `polite`, so that it will not obscure other essential information while announced. |
|  | `aria-label` or `aria-labelledby` | The Notification needs an accessible name to be assigned to it. The label holds info about the type of the Notification (error, warning, info, etc.) |
|  | `aria-describedby=.k-notification-content id` | USed so that the content of the Notification will be announced by the assistive technologies. |
| `.k-i-close,.k-svg-i-close` | `aria-hidden=true` | The close button of the notification (if any) should not be present in the accessibility tree. |

## Resources

[WAI-ARIA spec: Role Alert](https://www.w3.org/TR/wai-aria-1.2/#alert)

[ARIA Practices: Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

## Section 508


The Notification is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Notification has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Notification has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Notification has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Notification component could be found here: https://demos.telerik.com/kendo-ui/accessibility/notification
## See Also
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})