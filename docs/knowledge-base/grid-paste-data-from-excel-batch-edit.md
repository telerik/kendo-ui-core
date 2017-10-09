---
title: Copy paste multiple rows from Excel to Kendo Grid
description: How to implement copy paste rows from excel to kendo grid
type: how-to
page_title: Copy paste multiple rows to Kendo UI Grid with CRUD operations 
slug: grid-paste-data-from-excel-batch-edit
tags: grid,excel,copy,paste,multiple,rows,batch,edit,crud
ticketid: 1133411
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid</td>
 </tr>
</table>


## Description

I am trying to implement copy/paste multiple rows from Excel to kendo Grid. I am using the example you have in the documentation:[`Copy Data from Excel`](https://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/excel/copy-from-excel-to-grid) But after the paste is done, none of the events are firing and also its taking a long time to add rows.

## Solution

The Kendo UI Grid which will feature copy/paste of multiple rows should have its CRUD operations configured. The best approach would be to use a [`batch`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-batch) data source so you can send all the requests at once. You can adjust the textarea width and height so it excludes the pager and the scrollbar.

```
if($(e.target).hasClass("k-link")){
  return;
}
 
// crete a textarea element which will act as a clipboard
var textarea = $("<textarea>");
// position the textarea on top of the grid and make it transparent
textarea.css({
  position: 'absolute',
  opacity: 0,
  top: offset.top,
  left: offset.left,
  border: 'none',
  width: $(this).find("table").width(),
  height: $(this).find(".k-grid-content").height()
})
```


Also to give it a more Kendo UI themed look, add the dirty indicator to each new item and its fields.

```
dataBound: function(e){
  var grid = this;
  var rows = grid.items();
  rows.each(function(idx, row){
   var dataItem = grid.dataItem(row);
   if(dataItem.isNew()){
    var td = $(row).find("td");
    td.each(function(idx, cell){
     if($(cell).text()){
       $(cell).prepend("<span class='k-dirty'></span>");
     }
    })
   }
  })
 }
 ```

```html
    <div id="example">
      <p>Click the grid to focus it, then right click and paste content</p>
      <div id="grid"></div>

      <script type="text/x-kendo-template" id="template">
                <div class="refreshBtnContainer">
                    <a href="\\#" class="k-link k-button" title="Refresh"><span class="k-icon k-i-refresh"></span></a>
        </div>
                <div class="toolbar">
                    <label class="category-label" for="category">Show products by category:</label>
                    <input type="search" id="category" style="width: 150px"/>
        </div>
      </script>
      <script>
        $(document).ready(function() {
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

          var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            dataBound: function(e){
              var grid = this;
              var rows = grid.items();
              rows.each(function(idx, row){
                var dataItem = grid.dataItem(row);
                if(dataItem.isNew()){
                  var td = $(row).find("td");
                  td.each(function(idx, cell){
                    if($(cell).text()){
                      $(cell).prepend("<span class='k-dirty'></span>");
                    }
                  })
                }
              })
            },
            toolbar: ["save"],
            height: 550,
            sortable: true,
            pageable: true,
            editable: true,
            columns: [
              { field: "ProductID", title: "Product ID", width: 100 },
              { field: "ProductName", title: "Product Name" },
              { field: "UnitPrice", title: "Unit Price", width: 150 },
            ]
          }) .on('focusin', function (e) {
            if($(e.target).hasClass("k-link")){
              return;
            }
            // get the grid position
            var offset = $(this).find("table").offset();
            // crete a textarea element which will act as a clipboard
            var textarea = $("<textarea>");
            // position the textarea on top of the grid and make it transparent
            textarea.css({
              position: 'absolute',
              opacity:0,
              top: offset.top,
              left: offset.left,
              border: 'none',
              width: $(this).find("table").width(),
              height: $(this).find(".k-grid-content").height()
            })
              .appendTo('body')
              .on('paste', function () {
              // handle the paste event                         
              setTimeout(function () {

                kendo.ui.progress($("#grid"), true);
                var value = $.trim(textarea.val());
                var grid = $("[data-role='grid']").data("kendoGrid");
                var rows = value.split('\n');
                var data = [];

                for (var i = 0; i < rows.length; i++) {
                  var cells = rows[i].split('\t');
                  var newItem = {
                    ProductName: cells[0],
                    UnitPrice: cells[1]
                  }              
                  grid.dataSource.insert(0,newItem);
                };


                kendo.ui.progress($("#grid"), false);
              });

            }).on('focusout', function () {
              // remove the textarea when it loses focus
              $(this).remove();
            });
            // focus the textarea
            setTimeout(function () {
              textarea.focus();
            });
          });
          var dropDown = grid.find("#category").kendoDropDownList({
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            autoBind: false,
            optionLabel: "All",
            dataSource: {
              type: "odata",
              severFiltering: true,
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
              }
            },
            change: function() {
              var value = this.value();
              if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "CategoryID", operator: "eq", value: parseInt(value) });
              } else {
                grid.data("kendoGrid").dataSource.filter({});
              }
            }
          });

          grid.find(".k-grid-toolbar").on("click", ".k-i-refresh", function (e) {
            e.preventDefault();
            alert("sgdfgd");
          });
        });

      </script>
      <style>
        #grid .k-grid-toolbar
        {
          padding: .6em 1.3em .6em .4em;
        }
        .category-label
        {
          vertical-align: middle;
          padding-right: .5em;
        }
        #category
        {
          vertical-align: middle;
        }
        .refreshBtnContainer {
          display: inline-block;
        }
        .toolbar {
          float: right;
        }
      </style>
    </div>

```