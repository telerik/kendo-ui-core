---
title: Overview
page_title: jQuery Grid Documentation | Grid Accessibility
description: "Get started with the jQuery Grid by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_grid_widget
position: 1
---

# Grid Accessibility

The Grid is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI Grid]({% slug keynav_kendoui_grid_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Grid provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Grid is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Grid is a composite component that consists of 4 logically separated structural elements:


 - Toolbar (`role=toolbar`);
 - Group header (`role=toolbar`);
 - Data Grid (`role=grid`);
 - Pager (`role=application`);

### Grid Toolbar


Grid Toolbar follows the specification of the ToolBar component.

[ToolBar accessibility specification]({{toolbar_a11y_link}})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-toolbar` | `role=toolbar` | The toolbar is a collection of command buttons and inputs. |
|  | `aria-label` | Clarifies the purpose of the toolbar. |
|  | `aria-controls=.k-grid-content>table id` | Pointing to the id of the element with `role=grid`. |

### Grid Grouping Header


Grid Grouping Header follows the specification of the ToolBar component.

[ToolBar accessibility specification]({{toolbar_a11y_link}})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grouping-header` | `role=toolbar` | The Grouping header is a ToolBar (collection of buttons). |
|  | `aria-label` | Clarifies the purpose of the header. |
|  | `aria-controls=.k-grid-content>table id` | Pointing to the id of the element with `role=grid`. |
| `.k-grouping-header .k-chip-list .k-chip` | `role=button` | If the element used is not `<button>`, then the role must be specified. |
| `.k-grouping-header .k-chip-list` | `role=none/` | The ChipList default listbox role is removed to keep the toolbar --> button roles hierarchy. |
|  | `title` | Present on the element or its child if sorting is enabled for that field. |

### Data Grid (excluding Toolbars and Pager)


The element with `role=grid` must not include the ToolBar and the Pager elements as those do not belong to the `role=grid` element itself.


In the Kendo jQuery Grid, the `role=grid` is assigned to the `<table>` in the `k-grid-content` element.

#### Grid element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid:not(.k-treelist) .k-grid-content>table` | `role=grid` | The role specifies the element is a Data Grid. |
| `.k-grid-aria-root` | `aria-colcount` | The total number of columns in the Grid. Needed only for Virtual columns and Hidden columns scenarios, when not all columns are rendered in the DOM. If the total number of columns is unknown, the value of `aria-colcount` must be set to -1. |
|  | `aria-rowcount` | The total number of rows in the table (header rows + master rows + detail rows + data rows + footer rows + aggregates rows). Needed only when Paging (and more that 1 page is present in the component), Virtual rows, or Master/Detail rows (Hierarchical Grid, Detail Template Grid) are enabled. If data is also Grouped, the proper number of all rows could not be calculated. In that case the value must be set to -1. |


In scenarios when master and detail rows are present in the Grid (Hierarchical Grid, Detail Template Grid), the `aria-rowcount` (the total number of rows) must be calculated: 2 * (total number of items) + header rows + footer rows. That is because for each item in the Grid there is a master row and a detail row duplicating this way the number of rows.


If the Grid is composed of a single table (there is no separate `<table>` element for its header), no `role` attributes should be set on its inner elements(`<thead>`, `<body>`, `<tr>`, `<th>`, and `<td>`). Their semantic meaning will be used instead.

#### Grid header

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-header-wrap>table` | `role=presentation/none` | Negates the default semantic role of the `<table>` element. |
| `.k-grid-header-wrap>table>thead` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
|  | `id` | Id must be present on the element, so that it can be properly referenced in the `role=grid` element. |
| `.k-grid-header-wrap>table>thead>tr` | `role=row` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-rowindex` | Row number including all headers, data (including master and detail) rows, and footers starting from 1. Needed only when Paging (and more that 1 page is present in the component), Virtual rows, or Master/Detail rows (Hierarchical Grid, Detail Template Grid) are enabled. If data is also Grouped, the proper indexing could not be calculated. Hence, the attribute must not be set. |
| `.k-grid-header-wrap>table>thead>tr>th:not(.k-hierarchy-cell):not(.k-group-cell):not(.k-drag-cell)` | `role=columnheader` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-sort=none/ascending/descending` | Present if sorting is enabled for that column. |
|  | `title` or `aria-label` | Present on the element or its child if sorting is enabled for that field. |
|  | `aria-colindex` | Col number, based on leaf columns, starting from 1. Needed only for Virtual columns and Hidden columns scenarios, when not all columns are rendered in the DOM. Otherwise, can be interpreted from the DOM structure. Can be calculated by summing previous columns colspans. |
|  | `aria-haspopup=dialog` | The attribute must be present if the column has a ColumnMenu. |
|  | `aria-haspopup=dialog` | The attribute must be present if the column has a FilterMenu and no ColumnMenu. |

#### Grid locked header

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-header-locked>table` | `role=none/presentation` | Negates the default semantic role of the `<table>` element. |
| `.k-grid-header-locked>table>thead>tr>th` | `role=columnheader` | Required as the owner `<table>` element has its semantic role removed. |
|  | `title` or `aria-label` | Present on the element or its child if sorting is enabled for that field. |
|  | `aria-colindex` | Col number, based on leaf columns, starting from 1. Needed only for Virtual columns and Hidden columns scenarios, when not all columns are rendered in the DOM. Otherwise, can be interpreted from the DOM structure. Can be calculated by summing previous columns colspans. |
|  | `id` | Id must be present on the element, so that it can be properly referenced in the respective `<tr>` element in the `k-grid-header-wrap <thead>` element. |
| `.k-grid-header-locked .k-header[data-role='columnsorter']` | `aria-sort=none/ascending/descending` | Present if sorting is enabled for that column. |
| `.k-grid-header-locked .k-header[data-role='columnmenu']` | `aria-haspopup=menu` | The attribute must be present if the column has a ColumnMenu. |
| `.k-grid-header-locked .k-header[data-role='filtermenu']` | `aria-haspopup=dialog` | The attribute must be present if the column has a FilterMenu and no ColumnMenu. |

#### Grid filter row


Even if part of the `<thead>`, the Filter row must be composed of `<td>` elements.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-header-wrap>table>thead>tr.k-filter-row>td` | `role=gridcell` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-label` | Has a label indicating that the cell is part of a filter row. |

#### Grid locked filter row


Even if part of the `<thead>`, the Filter row must be composed of `<td>` elements.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-header-locked>table>thead>tr.k-filter-row>td` | `role=gridcell` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-label` | Has a label indicating that the cell is part of a filter row. |
|  | `id` | Id must be present on the element, so that it can be properly referenced in the respective `<tr>` filter row element in the `k-grid-header-wrap <thead>` element. |

#### Grid filter menu


Implements the FilterMenu specification.

[FilterMenu accessibility specification]({{filtermenu_a11y_link}})

#### Grid column menu


Implements the ColumnMenu specification.

[ColumnMenu accessibility specification]({{columnmenu_a11y_link}})

#### Grid content

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid:not(.k-treelist) .k-grid-content>table` | `role=grid` | This is the main focusable Grid element (see above). |
| `.k-grid-content>table>tbody` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
| `.k-grid-content>table>tbody>tr` | `role=row` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-rowindex` | Row number including all headers, data (including master and detail) rows, and footers starting from 1. Needed only when Paging (and more that 1 page is present in the component), Virtual rows, or Master/Detail rows (Hierarchical Grid, Detail Template Grid) are enabled. If data is also Grouped, the proper indexing could not be calculated. Hence, the attribute must not be set. In scenarios when master and detail rows are present in the Grid (Hierarchical Grid, Detail Template Grid), both master and detail rows must always be indexed. For example, if the first master row has `aria-rowindex=2`, even if its detail row is not present in the DOM, the next master row must have `aria-rowindex=4`. When rendered, the detail row must receive the missing index between the two master rows. In this example it would be `aria-rowindex=3`. |
| `.k-grid-content tr.k-selected` | `aria-selected=true` | Set on the currently selected row(s). Only used wen selection mode is set to `row`. |
| `.k-grid-content-locked + .k-grid-content tr` | `aria-owns` | If the Grid contains locked columns, the attribute points to the ids of the locked cells belonging visually to the same row. |
| `.k-grid-content>table>tbody>tr>td` | `role=gridcell` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-colindex` | Col number, based on leaf columns, starting from 1. Needed only for Virtual columns and Hidden columns scenarios, when not all columns are rendered in the DOM. Otherwise, can be interpreted from the DOM structure. Can be calculated by summing previous columns colspans. |
| `td.k-selected` | `aria-selected=true` | Set on the currently selected cell(s). Only used when selection mode is set to cell. |
| `.k-master-row .k-hierarchy-cell,.k-grouping-row>td` | `aria-expanded=true/false` | Optionally for cells holding grouping criteria values and for Master row cells in Detail template scenario. |
| `.k-drag-cell` | `aria-label` | Must be present in a Drag Row scenario on the cell containing the drag handle. |

#### Grid locked content

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-content-locked>table` | `role=none/presentation` | Negates the default semantic role of the `<table>` element. |
| `.k-grid-content-locked>table>tbody>tr>td` | `role=gridcell` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-colindex` | Col number, based on leaf columns, starting from 1. Needed only for Virtual columns and Hidden columns scenarios, when not all columns are rendered in the DOM. Otherwise, can be interpreted from the DOM structure. Can be calculated by summing previous columns colspans. |
|  | `id` | Id must be present on the element, so that it can be properly referenced in the respective `<tr>` element in the `k-grid-content <tbody>` element. |

#### Grid footer


The Aggregates totals are placed within a `<tfoot>` element in the Content `<table>`.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-footer-wrap>table` | `role=none/presentation` | Negates the default semantic role of the `<table>` element. |
| `tfoot` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
|  | `id` | Id must be present on the element, so that it can be properly referenced in the `role=grid` element. |
| `tfoot>tr` | `role=row` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-rowindex` | Row number including all headers, data (including master and detail) rows, and footers starting from 1. Footer rows are always the last ones in a Grid. Needed only when Paging (and more that 1 page is present in the component), Virtual rows, or Master/Detail rows (Hierarchical Grid, Detail Template Grid) are enabled. If data is also Grouped, the proper indexing could not be calculated. Hence, the attribute must not be set. |
| `tfoot>tr>td` | `role=gridcell` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-colindex` | Col number, based on leaf columns, starting from 1. Needed only for Virtual columns and Hidden columns scenarios, when not all columns are rendered in the DOM. Otherwise, can be interpreted from the DOM structure. Can be calculated by summing previous columns colspans. |

#### Grid locked footer

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-footer-locked>table` | `role=none/presentation` | Negates the default semantic role of the `<table>` element. |
| `.k-grid-footer-locked>table>tfoot>tr>td` | `role=gridcell` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-colindex` | Col number, based on leaf columns, starting from 1. Needed only for Virtual columns and Hidden columns scenarios, when not all columns are rendered in the DOM. Otherwise, can be interpreted from the DOM structure. Can be calculated by summing previous columns colspans. |
|  | `id` | Id must be present on the element, so that it can be properly referenced in the respective `<tr>` element in the `k-grid-footer-wrap <tfoot>` element. |

### Pager


For the Grid Pager WAI-ARIA spec, please review the Pager component.

[Pager accessibility specification]({{pager_a11y_link}})

#### Grid selection aggregates


The selection aggregates are placed within a `.k-grid-selection-aggregates` element after the Grid `.k-grid-aria-root` element.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-selection-aggregates` | `aria-live=polite` | Ensures that changes in the calculated selection aggregates are announced by assistive technologies. |

## Resources

[WAI-ARIA specification for grid](https://www.w3.org/TR/wai-aria-1.2/#grid)

## Section 508


The Grid is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Grid has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Grid has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Grid has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Grid component could be found here: https://demos.telerik.com/kendo-ui/accessibility/grid
## See Also
* [Keyboard Navigation by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/keyboard-navigation)
* [Keyboard Navigation by the Grid]({% slug keynav_kendoui_grid_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})