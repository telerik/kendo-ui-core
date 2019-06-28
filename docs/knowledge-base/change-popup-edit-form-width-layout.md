---
title: Increase Popup Edit Form and Textbox Width
page_title: Popup Edit Form and Textbox Width | Kendo UI Grid for jQuery
description: "An example on how to increase the width of the popup edit form and the textbox in the Kendo UI Grid."
previous_url: /controls/data-management/grid/how-to/Editing/change-popup-edit-form-width-layout
slug: howto_increase_popup_edit_formand_textbox_grid
tags: grid, increase, popup, edit, form, textbox, width
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>

</table>


## Description

How can I increase the width of the popup edit form and the textbox in the Kendo UI Grid?

## Solution

The following example demonstrates how to increase the width of the popup edit form and the textbox width in the Kendo UI Grid.

```dojo
<style>
/*
    Increase the width of the edit form.
    The default one is 400px.
*/

.k-edit-form-container
{
    width: 500px;
}

/*
    Decrease the width of the edit form labels. The default one is 30%.
    The new width should depend on the column titles.
    Switch the text alignment to the left. By default, it is to the right.
*/

.k-popup-edit-form .k-edit-label
{
    width: 20%;
    text-align: left;
}

/*
    Increase the width of the textbox containers. The default one is 60%.
    The sum of label and editor percentage widths should be around 90%, to make up for existing paddings.
*/
.k-popup-edit-form .k-edit-field
{
    width: 70%;
}

/*
    Expand the edit textboxes and any other Kendo UI widgets.
    In case of unexpected side effects, use widget-specific classes, instead of .k-widget.
*/
.k-popup-edit-form .k-edit-field > .k-textbox,
.k-popup-edit-form .k-edit-field > .k-widget:not(.k-tooltip)
{
    width: 98%;
}

</style>

<div id="example">
    <div id="grid"></div>

<script>
  $(document).ready(function () {
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
        dataSource = new kendo.data.DataSource({
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/Products",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/Products/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: crudServiceBaseUrl + "/Products/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: crudServiceBaseUrl + "/Products/Create",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          pageSize: 10,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
              }
            }
          }
        });

    $("#grid").kendoGrid({
      dataSource: dataSource,
      pageable: true,
      height: 300,
      toolbar: ["create"],
      columns: [
        { field:"ProductName", title: "Product Name" },
        { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
        { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
        { field: "Discontinued", width: "120px" },
        { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
      editable: "popup"
    });
  });
</script>
</div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
