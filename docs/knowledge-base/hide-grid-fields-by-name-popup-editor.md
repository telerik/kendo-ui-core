---
title: Hiding Grid Fields by Field Name in Popup Editor
description: Learn how to hide specific fields in the Kendo UI for jQuery Grid's popup editor by targeting field names.
type: how-to
page_title: How to Hide Specific Grid Fields by Field Name in Popup Editor
meta_title: How to Hide Specific Grid Fields by Field Name in Popup Editor
slug: hide-grid-fields-by-name-popup-editor
tags: grid, kendo-ui-for-jquery, popup-editor, editable, fields
res_type: kb
components: ["grid"]
ticketid: 1674334
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Grid
</td>
</tr>
<tr>
<td> Version </td>
<td> 2025.2.520 </td>
</tr>
</tbody>
</table>

## Description

I want to hide specific fields in the Kendo UI for jQuery Grid's popup editor using their field names instead of field indexes. When the popup editor opens, some fields should not be visible if certain conditions are met.

This knowledge base article also answers the following questions:
- How to conditionally hide specific fields in the Kendo UI Grid popup editor?
- Is it possible to hide fields in the Grid popup editor by their names?
- How to customize the appearance of the popup editor in Kendo UI Grid?

## Solution

To hide fields in the popup editor by their field names, target the elements using their `data-container-for` attributes. Use the `edit` event of the Grid to apply the logic. Below is an example:

```javascript
edit: function(e) {
    if(e.model.name !== "Jane") {
        $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='_events']").parent()).hide();
        $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='_handlers']").parent()).hide();
        $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='uid']").parent()).hide();
        $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='parent']").parent()).hide();
    }
}
```

### Explanation
1. The [`edit`](/api/javascript/ui/grid/events/edit) function is triggered when the popup editor is initialized.
2. The condition `if(e.model.name !== "Jane")` checks the value of the `name` field.
3. Use the `data-container-for` attribute to locate specific fields by their names and hide their parent elements.

### Dojo Example

Below is a runnable Dojo example:

```dojo
<div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name",
           editable: function (dataItem) {
             return dataItem.name === "Jane"; // Name editor is created only if dataItem name is Jane
           }
          },
          {
            field: "salary",
            editable: function (dataItem) {
              return dataItem.name === "Jane"; // Salary editor is created only if dataItem name is Jane
            }
          },
          { command: "edit" }
        ],
        editable: "popup",
        edit: function(e) {
          if(e.model.name !== "Jane") {
            $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='_events']").parent()).hide();
            $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='_handlers']").parent()).hide();
            $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='uid']").parent()).hide();
            $(e.container.find(".k-form-field .k-form-field-wrap[data-container-for='parent']").parent()).hide();
          }
        },
        dataSource: [ { name: "Jane", salary: 2000 }, { name: "Bill", salary: 2000 } ]
      });
    </script>
```



## See Also

- [Grid Non-Editable Fields in Popup Editor](https://docs.telerik.com/kendo-ui/knowledge-base/grid-non-editable-fields-in-popup-editor)
- [Kendo UI for jQuery Grid API](/api/javascript/ui/grid)
- [Grid Editing Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/editing/editing)
