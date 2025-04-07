---
title: Wai-Aria Support
page_title: jQuery Spreadsheet Documentation | Spreadsheet Accessibility
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_spreadsheet_accessibility
position: 1
---

# Spreadsheet Accessibility

The Spreadsheet is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery Spreadsheet provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Spreadsheet is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Spreadsheet is a composite component that is used to render spreadsheet data and provide the proper means for its editing. It consists of the following structural elements:


 - Quick access elements - Undo and Redo buttons
 - Menu
 - ToolBars
 - Name editor
 - Formula input
 - Sheet area
 - Sheets bar Add Button
 - Sheets bar Menu Button
 - Sheets bar TabStrip

### SpreadSheet Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-spreadsheet` | `role=application` | Indicates the Spreadsheets' role as an application. |

### Quick access elements

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-spreadsheet-quick-access-toolbar>.k-button` | `role=button` | The two quick access elements are buttons. |
|  | `aria-label` or `title` | The two quick access elements must have labels as they do not have text content. |

### ToolBar Menu


The Menu used for selecting the active ToolBar must implement the Menu specification.

[Menu accessibility specification]({{menu_a11y_link}})

### ToolBars


All ToolBars must implement the ToolBar specification. Apart from that, they also need to be labeled as per their purpose.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-spreadsheet-toolbar` | `aria-label` or `title` | Each ToolBar must have a label specifying its purpose. |

[ToolBar accessibility specification]({{toolbar_a11y_link}})

### Name editor


The Name editor must implement the spec for a ComboBox component.

[ComboBox accessibility specification]({{combobox_a11y_link}})

### Formula input

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-spreadsheet-formula-input` | `aria-haspopup=menu` | Specifies that the formula input opens a popup. |
|  | `aria-controls=.k-spreadsheet-formula-list id` | Points to the formulas list with role `menu`. Signifies that the formula input element controls the popup. |
|  | `aria-expanded=true/false` | Announces the state of the popup visibility. |
|  | `title` | The Formula input of the Spreadsheet must have a title specifying its purpose. |
|  | `role=combobox` | The focusable element of the component should have role `combobox` (an input with popup). |

### Formula list

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-spreadsheet-formula-list` | `id` | Unique and deterministic id linked to the `aria-controls` attribute of the corresponding formula input. |
| `.k-spreadsheet-formula-list` | `role=menu` | Announces the `menu` role of the popup. |
| `.k-list-item` | `role=menuitem` | Announces the `menuitem` role of the popup items. |

### Sheet area


The Sheet area must implement the spec for a Grid component. The column header cells are header cells are the members of the `.k-spreadsheet-column-header` element. The row header cells are the members of the `.k-spreadsheet-row-header` element.

[Grid accessibility specification]({{grid_a11y_link}})

### Add new sheet button

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-spreadsheet-sheet-add:not(button)` | `role=button` | The add new sheet element is a button. |
| `.k-spreadsheet-sheet-add` | `aria-label` or `title` | The add new sheet element must have a label as it does not have text content. |
| `.k-spreadsheet-sheet-add` | `aria-controls=.k-tabstrip-items id` | Points to the `ul` element of the TabStrip that contains all tabs. Signifies that the `button` element controls the `tablist` one. |

### Menu sheet button


The Menu sheet button must implement the spec for a DropDownButton component.

[DropDownButton accessibility specification]({{dropdownbutton_a11y_link}})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-spreadsheet-sheets-menu` | `aria-controls=.k-tabstrip-items id` | Points to the `ul` element of the TabStrip that contains all tabs. Signifies that the `button` element controls the `tablist` one. |

### Sheets bar


The Sheets bar of the Spreadsheet must implement the TabStrip specification.

[TabStrip accessibility specification]({{tabstrip_a11y_link}})

### Tab Menu button


The Menu button is each TabStrip tab must implement the DropDownButton specification.

[DropDownButton accessibility specification]({{dropdownbutton_a11y_link}})

## Section 508


The Spreadsheet is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Spreadsheet has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Spreadsheet has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Spreadsheet has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Spreadsheet component could be found here: https://demos.telerik.com/kendo-ui/accessibility/spreadsheet
## See Also
* [Keyboard Navigation by the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/keyboard-navigation)
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)