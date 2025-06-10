---
title: Add Custom Buttons in MultiCheckBox Filter in Kendo UI for jQuery Grid
description: Learn how to repurpose the MultiCheckBox Filter in Kendo UI for jQuery Grid and Add Custom Buttons
type: how-to
page_title: How to Add Custom Buttons to MultiCheckBox Filter in Kendo UI for Angular Grid
slug: customize-multicheckbox-filter-kendo-ui-jquery-grid
tags: kendo-ui-for-jquery, grid, multicheckbox, filter, customize
res_type: kb
ticketid: 1681456
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

I'm exploring the possibility of repurposing the MultiCheckBox Filter component in the Kendo UI for jQuery Grid to allow users to update database values. Specifically, I want to populate the filter with a list of items and then change the "Filter" button to "Update" and the "Clear" button to "Cancel." Users would select items and click "Update" to insert those values into a database table. This knowledge base article also answers the following questions:

- How can I customize the MultiCheckBox Filter buttons in Kendo UI for jQuery Grid?

## Solution

To customize the MultiCheckBox Filter popup and add custom buttons to it:

1. Replace the default dataSource of the filterMenu checkboxes by using the dataSource `data` method. Refer to the official Telerik documentation for more details: [DataSource Data Method](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/data).

2. Hide the default 'Filter' and 'Clear' buttons and add custom button elements to the popup actions. Implement this by emptying the `.k-actions` container and appending your custom 'Update' and 'Cancel' buttons.

```javascript
$(e.container)
    .find(".k-actions")
    .empty()
    .append(
      '<button class="btn-update">Update</button><button class="btn-cancel">Cancel</button>',
    );
```

3. In the custom button click event handlers, implement the logic according to your application requirements. For example, when the 'Update' button is clicked, you can have the selected items processed for database insertion. When the 'Cancel' button is clicked, the filter menu can be closed.

A practical example demonstrating custom 'Update' and 'Cancel' buttons for specific columns, and how selected items appear in an alert upon 'Update', can be found below: 

```dojo
<div id="client"></div>
    <script>
      $(document).ready(function () {
        var telerikWebServiceBase =
          "https://demos.telerik.com/service/v2/core/";
        $("#client").kendoGrid({
          dataSource: {
            transport: {
              read: {
                url: telerikWebServiceBase + "/Products"
              },
              parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                  return kendo.stringify(options.models);
                }
              },
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: {
                    type: "number",
                    validation: { required: true, min: 1 },
                  },
                  Discontinued: { type: "boolean" },
                  UnitsInStock: {
                    type: "number",
                    validation: { min: 0, required: true },
                  },
                },
              },
            },
          },
          filterMenuInit: function (e) {
            let container = e.container;
            
            if (e.field === "UnitPrice" || e.field === "UnitsInStock") {
              
              var filterMultiCheck = this.thead
                .find("[data-field=" + e.field + "]")
                .data("kendoFilterMultiCheck");
              filterMultiCheck.container.empty();

              var ds = new kendo.data.DataSource({
                data: [
                  { UnitPrice: 0, UnitsInStock: 1 },
                  { UnitPrice: 1, UnitsInStock: 2 },
                  { UnitPrice: 2, UnitsInStock: 3 },
                  { UnitPrice: 3, UnitsInStock: 3 },
                  { UnitPrice: 4, UnitsInStock: 4 },
                ],
              });

              ds.fetch(function () {
                filterMultiCheck.checkSource.data(ds.view().toJSON());
              });

              filterMultiCheck.createCheckBoxes();

              $(e.container)
                .find(".k-actions")
                .empty()
                .append(
                  '<button class="btn-update">Update</button><button class="btn-cancel">Cancel</button>',
                );

              $(".btn-update").kendoButton({
                themeColor: "success",
                click: function (e) {
                  let checked = $(container).find(".k-checkbox:checked");
                  let values = "";
                  checked.each(function (i, e) {
                    values += $(e).val() + " ";
                  });

                  alert(values);
                },
              });

              $(".btn-cancel").kendoButton({
                themeColor: "warning",
                click: function (e) {
                  container.data("kendoPopup").close();
                },
              });
            }
          },
          filterable: true,
          pageable: true,
          height: 550,
          columns: [
            { field: "ProductName", filterable: { multi: true } },
            {
              field: "UnitPrice",
              title: "Unit Price",
              format: "{0:c}",
              width: 120,
              filterable: { multi: true },
            },
            {
              field: "UnitsInStock",
              title: "Units In Stock",
              width: 120,
              filterable: { multi: true },
            },
            {
              field: "Discontinued",
              width: 120,
              filterable: {
                multi: true,
                dataSource: [{ Discontinued: true }, { Discontinued: false }],
              },
            },
            { command: "destroy", title: "&nbsp;", width: 150 },
          ],
        });
      });
    </script>
```




## See Also

- [Kendo UI for jQuery Grid - Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [DataSource API Reference](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
- [Use MultiSelect for Column Filtering in Kendo UI Grid](https://docs.telerik.com/kendo-ui/knowledge-base/multiselect-used-for-column-filtering)
