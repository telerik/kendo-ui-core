---
title: Overview
page_title: PDFViewer Documentation | PDFViewer Accessibility
description: "Get started with the {{ site.product }} PDFViewer and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_pdfviewer_accessibility
position: 1
---

# PDFViewer Accessibility





Out of the box, the {{ site.product }} PDFViewer provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The PDFViewer is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The PDFViewer component contains two inner elements - a toolbar and a page container.

[ToolBar accessibility specification]({% slug htmlhelpers_toolbar_accessibility %})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pdfviewer .k-canvas` | `tabindex=0` | Defines the focusable page container element. |
|  | `aria-label` | Describes the purpose of the focusable container. Translatable message. |
|  | `role=document` | Defines that content should be evaluated in reader mode by assistive technologies. |
| `.k-pdfviewer .k-toolbar .k-button:has(.k-svg-i-search, .k-i-search)` | `aria-haspopup=dialog` | Describes that the Search tool button opens a dialog element. |
| `.k-pdfviewer .k-canvas .k-search-panel` | `role=dialog` | Describes the role of the Search panel. |
|  | `aria-label` | Translatable message, same label as the one, used to describe the Toolbar Search tool. |

## Section 508


The PDFViewer is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The PDFViewer has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The PDFViewer has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the PDFViewer component, refer to the [PDFViewer Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/pdfviewer).

## Keyboard Navigation

For details on how the PDFViewer keyboard navigation works, refer to the [PDFViewer Keyboard Navigation]({%slug keynav_aspnetcore_pdfviewer%}) article.

## See Also

* [Keyboard Navigation by the PDFViewer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/keyboard-navigation)
* [Keyboard Navigation by the PDFViewer for {{ site.framework }}]({% slug keynav_aspnetcore_pdfviewer %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})