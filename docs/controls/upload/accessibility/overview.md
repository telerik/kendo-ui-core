---
title: Wai-Aria Support
page_title: jQuery Upload Documentation | Upload Accessibility
description: "Get started with the jQuery Upload by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["upload"]
slug: jquery_upload_accessibility
position: 1
---

# Upload Accessibility

The Upload is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI Upload]({% slug keynav_upload %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Upload provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Upload is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AAA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Upload selected files list implements roving tabindex navigation. Meaning that only one file has tabindex=0.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-upload .k-upload-button` | `aria-disabled=true/false` | Announces the disabled state of the upload button. |
|  | `aria-expanded=true/false` | Indicates whether the controlled list of files is present/visible |
|  | `aria-controls=.k-upload-files id` | Creates the relationship between the button and the list of selected files when the list is present. Remove the attribute when list is not present. |
| `.k-upload input` | `tabindex=-1` | Assures that the input element inside the upload is not focusable. |
|  | `aria-hidden=true` | The input needs to be hidden from the readers. |
| `.k-upload-files` | `role=list` | Explicitly sets the UL role to list because of https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns |
|  | `id` | Unique and deterministic id linked to the button aria-controls attribute. |
| `.k-upload-files .k-file` | `role=listitem` | Explicitly sets the LI role to listitem because of https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role#best_practices (note 2). |
|  | `tabindex=0/-1` | The element should be focusable. Value should be changed dynamically based on the roving tabindex navigation. |
| `.k-upload .k-file .k-file-validation-message` | `aria-live=polite` | Announces the change in the upload status of the file. |
| `.k-upload .k-upload-actions .k-upload-action` | `aria-hidden=true` | The list file action buttons must be hidden from the readers. |
|  | `tabindex=-1` | Assures that the list file action buttons are not focusable elements. |

## Resources

[WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

## Section 508


The Upload is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Upload has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Upload has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Upload has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Upload component could be found here: https://demos.telerik.com/kendo-ui/accessibility/upload
## See Also
* [Keyboard Navigation by the Upload (Demo)](https://demos.telerik.com/kendo-ui/upload/keyboard-navigation)
* [Keyboard Navigation by the Upload]({% slug keynav_upload %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)