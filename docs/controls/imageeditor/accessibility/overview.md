---
title: Overview
page_title: jQuery ImageEditor Documentation | ImageEditor Accessibility
description: "Get started with the jQuery ImageEditor by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_imageeditor_widget
position: 1
---

# ImageEditor Accessibility

The ImageEditor is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI ImageEditor]({% slug keynav_kendoui_imageeditor_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery ImageEditor provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ImageEditor is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The ImageEditor is a composite component containing:


 - ToolBar (`role=toolbar`);
 - Image canvas (`role=img`);
 - Edit action pane (`role=form`);


The ToolBar follows the spec for the ToolBar component:

[ToolBar accessibility specification]({{toolbar_a11y_link}})


The image canvas must have an appropriate role and accessible name assigned:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-imageeditor-canvas>canvas` | `role=img` | Indicates the canvas' role as an image. |
|  | `aria-label` or `aria-labelledby` | Provides an accessible name for the canvas by describing the image content. |


The Edit pane (present on performing crop and resize of image) follows the spec for the Form component:

[Form accessibility specification]({{form_a11y_link}})

## Resources

[HTML Canvas Accessibility](https://pauljadam.com/demos/canvas.html)

## Section 508


The ImageEditor is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ImageEditor has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ImageEditor has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The ImageEditor has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the ImageEditor component could be found here: https://demos.telerik.com/kendo-ui/accessibility/imageeditor
## See Also
* [Keyboard Navigation by the ImageEditor (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/keyboard-navigation)
* [Keyboard Navigation by the ImageEditor]({% slug keynav_kendoui_imageeditor_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})