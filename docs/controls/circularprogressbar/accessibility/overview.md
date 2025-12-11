---
title: Wai-Aria Support
page_title: jQuery CircularProgressBar Documentation | CircularProgressBar Accessibility
description: "Get started with the jQuery CircularProgressBar by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["circularprogressbar"]
slug: jquery_circularprogressbar_accessibility
position: 1
---

# CircularProgressBar Accessibility

The CircularProgressBar is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery CircularProgressBar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The CircularProgressBar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The CircularProgressBar follows the specification for the ProgressBar component.

[ProgressBar accessibility specification]({% slug jquery_progressbar_accessibility %})

## Resources

[WAI-ARIA specification for progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

[MDN reference for the progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role#associated_wai-aria_roles_states_and_properties)

## Section 508


The CircularProgressBar is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The CircularProgressBar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The CircularProgressBar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The CircularProgressBar has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the CircularProgressBar component could be found here: https://demos.telerik.com/kendo-ui/accessibility/circularprogressbar

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)