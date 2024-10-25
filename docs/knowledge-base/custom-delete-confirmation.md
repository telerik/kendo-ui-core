---
title: Add a Custom Delete Confirmation Dialog in the ListView
page_title: Add a Custom Delete Confirmation Dialog in the ListView
description: "Learn how to add a custom Delete confirmation dialog to the ListView."
slug: add_custom_delete_confirmation_dialog
previous_url: /controls/data-management/listview/how-to/custom-delete-confirmation
tags: listview, add, custom, confirmation, dialog
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I add a custom **Delete** confirmation dialog for the ListView?

## Solution

The following example demonstrates how to add a custom **Delete** confirmation dialog to the ListView widget.

```dojo
    <div id="example">

      <div id="confirmation"></div>
      <a id="add-new-button" role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" href="#"><span class="k-button-icon k-icon k-i-add"></span>Add new record</a>
      <div id="listView"></div>

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
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-edit-button" href="\\#">Edit<span class="k-button-icon k-icon k-i-edit"></span></a>
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-delete-button" href="\\#">Built-in delete<span class="k-icon k-i-close"></span></a>
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-cancel-button" href="\\#" onClick="deleteItem(event)">Custom delete<span class="k-icon k-i-close"></span></span></a>
        </div>
        </div>
      </script>

      <script type="text/x-kendo-template" id="confirmTemplate">
        Delete <strong>#= ProductName #</strong> ? </p>
        We have #= UnitsInStock # units in stock. </p>
        <a id="yesButton" role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-delete-button" href="\\#">Yes</a>
        <a id="noButton" role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-delete-button" href="\\#">No</a>
      </script>

      <script type="text/x-kendo-tmpl" id="editTemplate">
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
                <dd><input type="checkbox" name="Discontinued" data-bind="checked:Discontinued"></dd>
        </dl>
            <div class="edit-buttons">
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-update-button" href="\\#"><span class="k-button-icon k-icon k-i-check"></span></a>
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-cancel-button" href="\\#"><span class="k-button-icon k-icon k-i-cancel"></span></a>
        </div>
        </div>
      </script>

      <script>
        function deleteItem(e){
          var listView = $("#listView").getKendoListView();
          var productContainer = $(e.target).closest(".product-view");
          var product = listView.dataItem(productContainer);
          var confirmPopup = $("#confirmation").getKendoWindow();
          var confirmTemplate = kendo.template($("#confirmTemplate").html());
          confirmPopup.content(confirmTemplate(product)); //send the row data object to the template and render it
          confirmPopup.center().open();

          $("#yesButton").click(function(){
            listView.dataSource.remove(product)  //prepare a "destroy" request
            listView.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
            confirmPopup.close();
          })
          $("#noButton").click(function(e){
            e.preventDefault()
            confirmPopup.close();
          })
        }

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
                pageSize: 4,
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

          $("#confirmation").kendoWindow({
            title: "Are you sure?",
            visible: false,
            width: "250px",
            height: "180px",
          })

          var listView = $("#listView").kendoListView({
            dataSource: dataSource,
            remove: function(e) {
              if(!confirm("Do you want to delete " + e.model.get("ProductName") + "?")){
                e.preventDefault();
              }
            },
            template: kendo.template($("#template").html()),
            editTemplate: kendo.template($("#editTemplate").html()),
            pageable: true
          }).data("kendoListView");

          $("#add-new-button").click(function(e) {
            listView.add();
            e.preventDefault();
          });
        });
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

        .product-view dd .k-widget {
          font-size: 14px;
        }
        #example .k-listview
        {
          border-width: 1px 0 0;
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
        .k-pager
        {
          border-top: 0;
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

        .k-textbox, .k-numerictextbox {
          width: 12.4em;
        }
      </style>
    </div>
```

## See Also

* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
* [Filter Using Slider Selection]({% slug howto_filter_using_slider_selection_listview %})
* [Persist Row Selection during Data Operations]({% slug howto_persists_row_selection_listview %})
