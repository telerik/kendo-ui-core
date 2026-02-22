---
title: ListView Popup Editor
description: "Learn how to create a popup editor for the Kendo UI ListView."
type: how-to
page_title: ListView Popup Editor
slug: listview-popup-editor
tags: kendo, kendo-ui, listview, popup, edit, editor
res_type: kb
components: ["popup"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListView for jQuery</td>
 </tr>
</table>

## Description

I have seen the editing demo of the ListView, however I want to create a popup edit dialog similar to the one of the Kendo UI Grid.

How can I achieve this?

## Solution

Use the [Form](https://demos.telerik.com/kendo-ui/form/index) and [Window](https://demos.telerik.com/kendo-ui/window/index) components to create a popup editing dialog.

```dojo
    <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
                <dt>Unit Price</dt>
                <dd>#:kendo.toString(UnitPrice, "c")#</dd>
                <dt>Units In Stock</dt>
                <dd>#:UnitsInStock#</dd>
                <dt>Discontinued</dt>
                <dd>#:Discontinued#</dd>
      </dl>
            <div class="edit-buttons">
                <a role="button" class="k-button k-edit-button" href="\\#"><span class="k-button-icon k-icon k-i-edit"></span></a>
                <a role="button" class="k-button k-delete-button" href="\\#"><span class="k-button-icon k-icon k-i-close"></span></a>
      </div>
      </div>
    </script>

    <div id="listView"></div>

    <!-- create a hidden container element for the Form editor -->
    <div id="form-editor-container" style="display:none;">
      <form id="form-editor">
      </form>
    </div>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read:  {
                            url: crudServiceBaseUrl + "/Products"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/Products/Update",
                            type: "POST",
                    		contentType: "application/json"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "/Products/Destroy",
                            type: "POST",
                    		contentType: "application/json"
                        },
                        create: {
                            url: crudServiceBaseUrl + "/Products/Create",
                            type: "POST",
                    		contentType: "application/json"
                        },
            parameterMap: function (options, operation) {
              if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
              }
            }
          },
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: "ProductName",
                UnitPrice: { type: "number" },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number" }
              }
            }
          }
        });

        // create the ListView
        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          editTemplate: kendo.template($("#template").html()),
          // editTemplate: kendo.template($("#editTemplate").html()),
          // selectable: true,
          edit: function (e) {
            e.preventDefault();
            // get the selected item from the ListView
            var selectedItem = this.dataItem(e.item);
            // create the Form editor with the selected item's properties
            var form = $("#form-editor").getKendoForm();

            form.setOptions({
              formData: {
                ProductID: selectedItem.ProductID,
                ProductName: selectedItem.ProductName,
                UnitPrice: selectedItem.UnitPrice,
                Discontinued: selectedItem.Discontinued,
                UnitsInStock: selectedItem.UnitsInStock
              }
            });
            // show the Form editor
            formWindow.open();
            formWindow.center();
          }
        });

        $("#form-editor").kendoForm({
          items: [
            // { field: "ProductID", title: "ID", width: 100 },
            { field: "ProductName", title: "Name", width: 200 },
            { field: "UnitPrice", title: "Price", width: 100 },
            { field: "Discontinued", title: "Discontinued", width: 100 },
            { field: "UnitsInStock", title: "In Stock", width: 100 }
          ],
          submit: function (e) {
            e.preventDefault();
            // update the item in the DataSource with the form data
            var item = dataSource.get(e.model.ProductID);
            item.set("ProductName", e.model.ProductName);
            item.set("UnitPrice", e.model.UnitPrice);
            item.set("Discontinued", e.model.Discontinued);
            item.set("UnitsInStock", e.model.UnitsInStock);
            dataSource.sync();

            formWindow.close();
          }
        });

        // create the Form editor as a Kendo Window
        var formWindow = $("#form-editor-container").kendoWindow({
          title: "Edit Item",
          visible: false,
          modal: true
        }).data("kendoWindow");
      });
    </script>

    <style>
      #listView .k-listview-content {
        display: flex;
        width: 100%;
        overflow: hidden;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
      }

      .product-view {
        display: flex;
        width: 300px;
        height: 300px;
        box-sizing: border-box;
        border-top: 0;
        position: relative;
      }

      .product-view:nth-child(even) {
        border-left-width: 0;
      }

      .product-view dl {
        margin: 10px 10px 0;
        padding: 0;
        overflow: hidden;
      }

      .product-view dt,
      dd {
        margin: 0;
        padding: 0;
        width: 100%;
        line-height: 24px;
        font-size: 18px;
      }

      .product-view dt {
        font-size: 11px;
        height: 16px;
        line-height: 16px;
        text-transform: uppercase;
        opacity: 0.5;
      }

      .product-view dd {
        height: 46px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

      }

      .product-view dd .k-widget {
        font-size: 14px;
      }

      #example .k-listview {
        border-width: 1px 0 0;
        padding: 0;
        overflow: hidden;
        min-height: 298px;
      }

      .edit-buttons {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: right;
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.1);
      }

      .k-pager-wrap {
        border-top: 0;
      }

      span.k-invalid-msg {
        position: absolute;
        margin-left: 6px;
      }

      .k-add-button {
        margin-bottom: 2em;
      }

      @media only screen and (max-width : 620px) {

        .product-view {
          width: 100%;
        }

        .product-view:nth-child(even) {
          border-left-width: 1px;
        }
      }

      .k-textbox,
      .k-numerictextbox {
        width: 12.4em;
      }
    </style>
```
