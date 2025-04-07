---
title: Overview
page_title: Splitter Documentation | Splitter Accessibility
description: "Get started with the {{ site.product }} Splitter and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_splitter_accessibility
position: 1
---

# Splitter Accessibility




Out of the box, the {{ site.product }} Splitter provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Splitter is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Splitter Pane

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pane` | `role=group` | Sets the proper role for the Splitter pane that identifies a set of user interface objects that is not intended to be included in the page's summary or table of contents. |

> Note: The value of the `aria-label` attribute of the split-bar elements will be provided to their respective preceding pane element through the API.

### SplitBar

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-splitbar` | `role=separator` | Sets the proper role for the Splitter split-bar element. |
|  | `aria-label` | An accessible name, with aria-label should be included if there is more than one focusable separator. The value is set through the corresponding SplitterPane API. |
| `.k-splitbar-horizontal` | `aria-orientation=vertical` | When a splitbar separates two panes horizontally, its aria-orientation must be explicitly set to 'vertical'. |
|  | `aria-keyshortcuts=ArrowLeft ArrowRight ArrowUp ArrowDown` | Sets the aria-keyshortcuts attribute value to announce available keyboard shortcuts. Some are omitted for brevity. |

> Note: Setting the value-now attribute of the separator element is not applicable, as the Splitter is a complex layout component allowing splitting the content into multiple panes across any number and level of nested Splitters and panes, thus announcing a value would not convey any meaningful information. Moreover, there is no specification, or WAI-ARIA recommendation that explains how value should be set in multiple panes scenario. If needed, developers can still apply attributes as they see fit, using the respective API option. Further information on this complicated scenario could be found in the following WAI-ARIA GitHub issue:

[WAI-ARIA Practices on GitHub](https://github.com/w3c/aria-practices/issues/129#issuecomment-456976215)

## Resources

[WAI-ARIA specification for separator](https://www.w3.org/TR/wai-aria-1.2/#separator)

[MDN reference for the separator role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role)

## Section 508


The Splitter is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Splitter has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Splitter has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Splitter component, refer to the [Splitter Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/splitter).

## Keyboard Navigation

For details on how the Splitter keyboard navigation works, refer to the [Splitter Keyboard Navigation]({%slug keynav_aspnetcore_splitter%}) article.

## See Also

* [Keyboard Navigation by the Splitter for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitter/keyboard-navigation)
* [Keyboard Navigation by the Splitter for {{ site.framework }}]({% slug keynav_aspnetcore_splitter %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})