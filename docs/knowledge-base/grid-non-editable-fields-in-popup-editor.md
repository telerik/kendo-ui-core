---
title: Display Non-Editable Fields in Popup Editor
description: "An example showcasing how to display the non-editable Grid fields in the popup editor."
type: how-to
page_title: Display Non-Editable Fields in Popup Editor - Kendo UI Hierarchy Grid for jQuery
slug: display-non-editable-fields-in-popup-editor
tags: jquery, grid, popup, noneditable, fields, readonly, hidden, missing
ticketid: 1588359
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>


## Description

I upgraded the Kendo UI for jQuery library to version `2022.2.802` and I no longer see the fields that are marked as `editable: false` in the popup editor. How do I display these fields in the popup?

## Solution

The R2 2022 SP2 release of Kendo UI integrated the Kendo UI for jQuery Form inside the Grid's popup editor. By default, the non-editable fields from the `dataSource` are not visible in the Form editor. To add them back to the Grid popup, utilize the [`edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/edit) event of the Grid and manually append them to the container.

The following example demonstrates how to append the non-editable `age` and `salary` fields to the popup template.

```dojo
    <div id="grid"></div>

    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" },
          { field: "salary"},
          { command: "edit" }
        ],
        edit: function(e) {
          let fieldsAsArray = Object.entries(this.dataSource.options.schema.model.fields);

          fieldsAsArray.forEach((field) => {
            let editable = field[1].editable,
                name = field[0],
                formContainer = e.container.find(".k-edit-form-container"),
                value = e.model[name];

            if(editable === false) {
              // This is the HTML for the label and value that will appear in the popup.
              let formFieldHtml = `<div class="k-form-field"><label class="k-label k-form-label" for="${name}">${name}</label><div class="k-form-field-wrap" data-container-for="${name}">${value}</div></div>`;

              // You can choose where to append the non-editable fields. In this example, they are rendered before all other editors.
              formContainer.prepend(formFieldHtml);
            }
          });
        },
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30, salary: 25000 },
            { id: 2, name: "John Doe", age: 33, salary: 15000 }
          ],
          schema:{
            model: {
              id: "id",
              fields: {
                name: {type: "string"},
                age: { type: "number", editable: false},
                salary: { type: "number", editable: false}
              }
            }
          }
        },
        editable: {
          mode: "popup",
        }
      });
    </script>
```