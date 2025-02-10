---
title: Overview
page_title: ImageEditor Documentation | ImageEditor Accessibility
description: "Get started with the {{ site.product }} ImageEditor and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_imageeditor
position: 1
---

# ImageEditor Accessibility





Out of the box, the {{ site.product }} ImageEditor provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ImageEditor is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The ImageEditor is a composite component containing:


 - ToolBar (`role=toolbar`);
 - Image canvas (`role=img`);
 - Edit action pane (`role=form`);


The ToolBar follows the spec for the ToolBar component:

[ToolBar accessibility specification]({% slug accessibility_toolbar_overview %})


The image canvas must have an appropriate role and accessible name assigned:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-imageeditor-canvas>canvas` | `role=img` | Indicates the canvas' role as an image. |
|  | `aria-label` or `aria-labelledby` | Provides an accessible name for the canvas by describing the image content. |


The Edit pane (present on performing crop and resize of image) follows the spec for the Form component:

[Form accessibility specification]({% slug htmlhelpers_form_aspnetcore_accessibility %})

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



### Test Example

To test the ImageEditor component, refer to the [ImageEditor Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/imageeditor/actionsheet).

## Keyboard Navigation

For details on how the ImageEditor keyboard navigation works, refer to the [ImageEditor Keyboard Navigation]({%slug keynav_aspnetcore_imageeditor%}) article.

## See Also

* [Keyboard Navigation by the ImageEditor for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/keyboard-navigation)
* [Keyboard Navigation by the ImageEditor for {{ site.framework }}]({% slug keynav_aspnetcore_imageeditor %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})