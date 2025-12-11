---
title: Hiding or Disabling Action Buttons in the Sheet Bar
description: Learn how to hide or disable action buttons in the sheet bar of the Kendo UI for jQuery Spreadsheet. 
type: how-to
page_title: How to Hide or Disable Action Buttons in Kendo UI for jQuery Spreadsheet's Sheet Bar
meta_title: How to Hide or Disable Action Buttons in Kendo UI for jQuery Spreadsheet's Sheet Bar
slug: hide-disable-action-buttons-sheet-bar-jquery-spreadsheet
tags: kendo ui for jquery, spreadsheet, css, sheet bar, buttons
res_type: kb
components: ["spreadsheet"]
ticketid: 1696460
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Spreadsheet </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.3.825</td>
</tr>
</tbody>
</table>

## Description

I want to restrict users from interacting with the action buttons in the sheet bar of the [Kendo UI for jQuery Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/overview). The goal is to allow users to navigate sheets but prevent actions such as adding sheets or accessing sheet menus.

This knowledge base article also answers the following questions:
- How can I hide buttons in the sheet bar?
- How can I disable action buttons in the Kendo UI Spreadsheet sheet bar?
- How do I prevent interaction with the sheet bar buttons in Kendo UI for jQuery Spreadsheet?

## Solution

### Hiding the Buttons
To hide the action buttons in the sheet bar, apply the following CSS rules:
```css
.k-spreadsheet-sheets-bar .k-spreadsheet-sheet-add {
    display: none !important;
}

.k-spreadsheet-sheets-bar .k-spreadsheet-sheets-menu {
    display: none !important;
}

.k-spreadsheet-sheets-bar .k-menu-button {
    display: none !important;
}
```

### Disabling the Buttons
To disable the buttons without hiding them, use the following CSS rules:
```css
.k-spreadsheet-sheets-bar .k-spreadsheet-sheet-add,
.k-spreadsheet-sheets-bar .k-spreadsheet-sheets-menu,
.k-spreadsheet-sheets-bar .k-menu-button {
    pointer-events: none;
    opacity: 0.5;
}
```
This prevents user interaction with the buttons while keeping them visible in a disabled state.

Below is a runnable example;

```dojo
  <style>
      .k-spreadsheet-sheets-bar .k-spreadsheet-sheet-add,
      .k-spreadsheet-sheets-bar .k-spreadsheet-sheets-menu,
      .k-spreadsheet-sheets-bar .k-menu-button {
        pointer-events: none;
        opacity: 0.5;
      }
    </style>
    <div id="example">
      <div id="spreadsheet" style="width: 100%"></div>
      <script>
        $(function () {
          $("#spreadsheet").kendoSpreadsheet({          
            sheets: [
              {
                name: "Food Order",
              },
              {
                name: "Drinks Order"
              }
            ],
          });          
        });
      </script>
    </div>
```

## See Also

- [Kendo UI for jQuery Spreadsheet Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)
