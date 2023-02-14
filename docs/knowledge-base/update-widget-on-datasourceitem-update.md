---
title: Update the ListView on Updating a Data Source Item
page_title: Update the ListView on DataSource Item Update
description: "Learn how to filter the ListView datasource based on Kendo UI Slider selection."
slug: howto_updatelistviewondatasitemupdate_listview
previous_url: /controls/data-management/listview/how-to/update-widget-on-datasourceitem-update
tags: listview, update, on, updating, datasource, item
component: listview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I update the ListView when an update of a data source items occurs?

## Solution

The ListView does not update the content dynamically on model field update.

To re-render the widget, manually trigger the `change` event of the `dataSource` after the model update. The following example demonstrates how to achieve this behavior.

```dojo
     <div id="example">
      <div class="demo-section k-content wide">
        <fieldset>
          <dd>
            ProductName (first data item):
          </dd>
          <dt>
            <input data-bind="value: newProductName" />
            <button data-bind="click: updateValue">Set</button>
          </dt>
        </fieldset>
        <div>
          <h4>Update a record</h4>
          <div data-role="listview"
               data-edit-template="edit-template"
               data-template="template"
               data-bind="source: products,
                          visible: isVisible,
                          events: {
                          save: onSave
                          }"
               style="height: 300px; overflow: auto"></div>
        </div>

      </div>
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
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
        </div>
        </div>
      </script>

      <script type="text/x-kendo-tmpl" id="edit-template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>
                    <span class="k-textbox k-input k-input-md k-rounded-md k-input-solid">
                        <input type="text" class="k-input-inner" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
        </span>
                    <span data-for="ProductName" class="k-invalid-msg"></span>
        </dd>
                <dt>Unit Price</dt>
                <dd>
                    <input type="text" data-bind="value:UnitPrice" data-role="numerictextbox" data-type="number" name="UnitPrice" required="required" min="1" validationMessage="required" />
                    <span data-for="UnitPrice" class="k-invalid-msg"></span>
        </dd>
                <dt>Units In Stock</dt>
                <dd>
                    <input type="text" data-bind="value:UnitsInStock" data-role="numerictextbox" name="UnitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
                    <span data-for="UnitsInStock" class="k-invalid-msg"></span>
        </dd>
                <dt>Discontinued</dt>
                <dd><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" name="Discontinued" data-bind="checked:Discontinued"></dd>
        </dl>
            <div class="edit-buttons">
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-icon-button k-update-button" href="\\#"><span class="k-button-icon k-icon k-i-check"></span></a>
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-icon-button k-cancel-button" href="\\#"><span class="k-button-icon k-icon k-i-cancel"></span></a>
        </div>
        </div>
      </script>

      <script>
        var viewModel = kendo.observable({
          newProductName: "test",
          updateValue: function() {
            this.products.at(0).set("ProductName", this.newProductName);
            this.products.trigger("change");
          },
          isVisible: true,
          onSave: function(e) {
          },
          products: new kendo.data.DataSource({
            schema: {
              model: {
                id: "ProductID"
              }
            },
            batch: true,
            transport: {
              read: {
                url: "//demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
              },
              update: {
                url: "//demos.telerik.com/kendo-ui/service/products/update",
                dataType: "jsonp"
              },
              destroy: {
                url: "//demos.telerik.com/kendo-ui/service/products/create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            }
          })
        });
        kendo.bind($("#example"), viewModel);
      </script>
      <style>
        .product-view
        {
          float: left;
          width: 50%;
          height: 300px;
          box-sizing: border-box;
          border-top: 0;
          position: relative;
        }
        .product-view:nth-child(even) {
          border-left-width: 0;
        }
        .product-view dl
        {
          margin: 10px 10px 0;
          padding: 0;
          overflow: hidden;
        }
        .product-view dt, dd
        {
          margin: 0;
          padding: 0;
          width: 100%;
          line-height: 24px;
          font-size: 18px;
        }
        .product-view dt
        {
          font-size: 11px;
          height: 16px;
          line-height: 16px;
          text-transform: uppercase;
          opacity: 0.5;
        }

        .product-view dd
        {
          height: 46px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

        }

        .product-view dd .k-widget,
        .product-view dd .k-textbox {
          font-size: 14px;
        }
        .k-listview
        {
          border-width: 1px 1px 1px 0;
          padding: 0;
          overflow: hidden;
          min-height: 298px;
        }
        .edit-buttons
        {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: right;
          padding: 5px;
          background-color: rgba(0,0,0,0.1);
        }
        span.k-invalid-msg
        {
          position: absolute;
          margin-left: 6px;
        }

        .k-add-button {
          margin-bottom: 2em;
        }

        @media only screen and (max-width : 620px) {

          .product-view
          {
            width: 100%;
          }
          .product-view:nth-child(even) {
            border-left-width: 1px;
          }
        }
      </style>
    </div>
```

## See Also

* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
* [How to Persist Row Selection during Data Operations]({% slug howto_persists_row_selection_listview %})
* [How to Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})
