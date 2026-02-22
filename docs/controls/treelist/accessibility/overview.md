---
title: Wai-Aria Support
page_title: jQuery TreeList Documentation | TreeList Accessibility
description: "Get started with the jQuery TreeList by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["treelist"]
slug: jquery_treelist_accessibility
position: 1
---

# TreeList Accessibility

The TreeList is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI TreeList]({% slug keynav_kendoui_treelist_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery TreeList provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TreeList is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The TreeList is a composite component that consists of 2 logically separated structural elements:


 - Toolbar (`role=toolbar`);
 - Tree Grid (`role=treegrid`);

### TreeList Toolbar


TreeList Toolbar follows the specification of the ToolBar component.

[ToolBar accessibility specification]({% slug jquery_toolbar_accessibility %})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-toolbar` | `role=toolbar` | The toolbar is a collection of command buttons and inputs. |
|  | `aria-label` | Clarifies the purpose of the toolbar. |
|  | `aria-controls=.k-grid-aria-root id` | Pointing to the id of the element with `role=treegrid`. |

### Tree Grid


The element with `role=treegrid` must not include the ToolBar element as it does not belong to the `role=treegrid` element itself. It implements the ARIA specification for the Grid component with some exceptions listed below.

[Grid accessibility specification]({% slug jquery_grid_accessibility %})


In the Kendo jQuery TreeList, the `role=treegrid` is assigned to the `<table>` in the `k-grid-content` element.


The below table lists the ARIA requirements for the TreeList which are not present in the Grid specification:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-content>table` | `role=treegrid` | The role specifies the element is a TreeGrid. |
| `.k-table-tbody .k-table-row` | `aria-expanded=true/false` | Set on the currently expanded row(s). |
| `.k-table-tbody .k-i-caret-alt-down,.k-table-tbody .k-i-caret-alt-right,.k-table-tbody .k-svg-i-caret-alt-down,.k-table-tbody .k-svg-i-caret-alt-right` | `aria-hidden=true` | Removes the expand/collapse icon from the accessibility tree. |

## Resources

[WAI-ARIA specification for tree grid](https://www.w3.org/TR/wai-aria-1.2/#treegrid)

## Section 508


The TreeList is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TreeList has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TreeList has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The TreeList has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the TreeList component could be found here: https://demos.telerik.com/kendo-ui/accessibility/treelist
## See Also
* [Keyboard Navigation by the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation)
* [Keyboard Navigation by the TreeList]({% slug keynav_kendoui_treelist_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)