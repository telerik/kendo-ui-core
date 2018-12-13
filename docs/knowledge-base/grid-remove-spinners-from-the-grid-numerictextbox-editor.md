---
title: Remove Up and Down Arrows from the Grid NumericTextBox Editors
description: An example on how to remove the Up Arrow and Down Arrow from the Kendo UI Grid editor.
type: how-to
page_title: Remove Spinners from the NumericTextbox Editor | Kendo UI Grid
slug: grid-remove-spinners-from-the-grid-numerictextbox-editor
tags: grid, numerictextbox, spinners
ticketid: 1142901
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

How can I remove the spinners of the NumericTextBoxes which are used as default Grid editors?

## Solution

Set a custom editor for the numeric columns by using the [`column.editor`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editor) property of the Grid.

````dojo
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
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120,editor: editNumber },
              { field: "Discontinued", width: 120, editor: customBoolEditor },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
          });
        });

        function customBoolEditor(container, options) {
          var guid = kendo.guid();
          $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
          $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
        }

        function editNumber(container, options) {
          $('<input data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
            spinners : false
          });
        }
      </script>
    </div>
````

## See Also

* [Remove Spinners from NumericTextBox Editors in MVC Grid](https://docs.telerik.com/kendo-ui/knowledge-base/grid-mvc-remove-spinner-numerictextbox-editor)
