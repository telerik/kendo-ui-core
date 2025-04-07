---
title: Overview
page_title: Editor Documentation | Editor Accessibility
description: "Get started with the {{ site.product }} Editor and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_editor_accessibility
position: 1
---

# Editor Accessibility





Out of the box, the {{ site.product }} Editor provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Editor is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Editor component has two distinctive modes - one with `<textarea>` and an `<iframe>` containing an HTML document and another one with only a contenteditable `<div>` (Inline Editor). The inline mode of the Editor does not require any particular ARIA attributes to be present in the widget.

### Editor with textarea

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-iframe` | `tabindex=0` | The element must be part of the page tabsequence. |
|  | `label for` or `aria-label` or `aria-labelledby` | The component focusable element needs an accessible name to be assigned to it. |
| `.k-editor.k-readonly div[contenteditable=false]` | `aria-readonly=true` | Attribute is rendered only when the Editor is readonly. |

### Editor with contenteditable div


When in its inline mode (with a contenteditable `div` element), the editor does not represent a form input. Hence, no additional attributes are required in that scenario.

## Resources

[WAI-ARIA specification for textbox](https://www.w3.org/TR/wai-aria-1.2/#textbox)

## Section 508


The Editor is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Editor has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Editor has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Editor component, refer to the [Editor Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/editor).

## Keyboard Navigation

For details on how the Editor keyboard navigation works, refer to the [Editor Keyboard Navigation]({%slug keynav_aspnetcore_editor%}) article.

## See Also

* [Keyboard Navigation by the Editor for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/keyboard-navigation)
* [Keyboard Navigation by the Editor for {{ site.framework }}]({% slug keynav_aspnetcore_editor %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})