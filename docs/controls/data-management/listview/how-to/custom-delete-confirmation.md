---
title: Add Custom Delete Confirmation Dialog
page_title: Add Custom Delete Confirmation Dialog | Kendo UI ListView
description: "Learn how to add a custom Delete confirmation dialog to the ListView."
slug: add_custom_delete_confirmation_dialog
---

# Add Custom Delete Confirmation Dialog

The example below demonstrates how to add a custom **Delete** confirmation dialog to the Kendo UI ListView widget.

###### Example

```html
<div id="example">

    <div class="demo-section k-content wide">
        <div id="confirmation"></div>
        <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
        <div id="listView"></div>
        <div id="pager" class="k-pager-wrap"></div>
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
                <a class="k-button k-edit-button" href="\\#">Edit<span class="k-icon k-edit"></span></a>
                <a class="k-button k-delete-button" href="\\#">Built-in delete<span class="k-icon k-delete"></span></a>
                <a class="k-button k-custom-delete-button" href="\\#" onClick="deleteItem(event)">Custom delete<span class="k-icon k-delete"></span></a>
            </div>
        </div>
    </script>

    <script type="text/x-kendo-template" id="confirmTemplate">
        Delete <strong>#= ProductName #</strong> ? </p>
        We have #= UnitsInStock # units in stock. </p>
        <button class="k-button" id="yesButton">Yes</button>
        <button class="k-button" id="noButton"> No</button>
    </script>
    <script type="text/x-kendo-tmpl" id="editTemplate">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>
                    <input type="text" class="k-textbox" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
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
                <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
                <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
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
        $("#noButton").click(function(){
          confirmPopup.close();
        })
      }
    $(document).ready(function () {
      var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
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


      $("#pager").kendoPager({
        dataSource: dataSource
      });

      $("#confirmation").kendoWindow({
        title: "Are you sure?",
        visible: false,
        width: "250px",
        height: "120px",
      })

      $("#listView").kendoListView({
        remove: function(e) {                
          if(!confirm("Do you want to delete " + e.model.get("ProductName") + "?")){
            e.preventDefault();
          }
        },
        dataSource: dataSource,
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html())
      })

      $(".k-add-button").click(function(e) {
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

    .product-view dd .k-widget,
    .product-view dd .k-textbox {
      font-size: 14px;
    }
    .k-listview
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
    .k-pager-wrap
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
  </style>
</div>
```

## See Also

Other articles on Kendo UI ListView:

* [ListView JavaScript API Reference](/api/javascript/ui/listview)
* [How to Filter Using Slider Selection]({% slug howto_filter_using_slider_selection_listview %})
* [How to Persist Row Selection during Data Operations]({% slug howto_persists_row_selection_listview %})
* [How to Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})
