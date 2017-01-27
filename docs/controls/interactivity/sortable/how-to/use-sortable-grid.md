---
title: Reorder Rows in Grids
page_title: Reorder Rows in Grids | Kendo UI Sortable
description: "Learn how to use the Kendo UI Sortable widget with a Kendo UI Grid either in editable or non-editable modes."
previous_url: /controls/interactivity/sortable/how-to/reorder-grid-rows, /controls/interactivity/sortable/how-to/batch-editable-grid, /web/sortable/how-to/angularjs-reorder-grid-rows
slug: howto_usesortablewithgrid_inincellediting_sortable
---

# Reorder Rows in Grids

The examples below demonstrate how to use the Kendo UI Sortable widget with a Kendo UI Grid either in an editable or in a non-editable mode.

## Non-Editable Grid Mode

The example below demonstrates how to reorder the rows of a Kendo UI Grid in a non-editable mode by using the Kendo UI Sortable.

###### Example

```html
    <div id="grid" style="width: 800px; margin: 0 auto;"></div>
    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <script>
      var grid = $("#grid").kendoGrid({
        dataSource: {
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" }
              }
            }
          },
          pageSize: 16
        },
        scrollable: false,
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
          { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
          { field: "Discontinued", width: "130px" }
        ]
      }).data("kendoGrid");

      grid.table.kendoSortable({
        filter: ">tbody >tr",
        hint: function(element) { //customize the hint
          var table = $('<table style="width: 600px;" class="k-grid k-widget"></table>'),
              hint;

          table.append(element.clone()); //append the dragged element
          table.css("opacity", 0.7);

          return table; //return the hint element
        },
        cursor: "move",
        placeholder: function(element) {
          return $('<tr colspan="4" class="placeholder"></tr>');
        },
        change: function(e) {
          var skip = grid.dataSource.skip(),
              oldIndex = e.oldIndex + skip,
              newIndex = e.newIndex + skip,
              data = grid.dataSource.data(),
              dataItem = grid.dataSource.getByUid(e.item.data("uid"));

          grid.dataSource.remove(dataItem);
          grid.dataSource.insert(newIndex, dataItem);
        }
      });
    </script>
    <style>
      .k-grid tbody tr {
        cursor: move;
      }

      .placeholder {
        outline-style: dashed;
        outline-width: 1px;
        outline-color: red;
      }
    </style>
```

## Editable Grid Mode

The example below demonstrates how to reorder the rows of a Kendo UI Grid in an in-cell editable mode by using the Kendo UI Sortable.

The main milestones of the approach are:

* The standard HTML inputs that are used as editors should have a `data-value-update="input"` attribute. If this attribute is not attached to the HTML element, the Grid will not update its data.

###### Example

       var textEditor = function (container, options) {
         $('<input data-value-update="input" data-bind="value:' + options.field + '"/>')
           .appendTo(container);
       };

* If a Kendo UI widget is used as an editor, its `change` event should be manually triggered in the `edit` event of the Grid widget.

###### Example

       //Kendo UI widget used as editor
       var numericEditor = function (container, options) {
         $('<input data-role="numerictextbox" data-bind="value:' + options.field + '"/>')
           .appendTo(container);
       };

       //Grid edit event handler
       edit: function(e) {
         var input = e.container.find("[data-role=numerictextbox]");
         var widget = input.data("kendoNumericTextBox");
         var model = e.model;

         input.on("keyup", function(e) {
           if(e.key === kendo.culture().numberFormat["."]) {
             // for Kendo UI NumericTextBox only
             return;
           }
           widget.value(input.val());
           widget.trigger("change");
         });
       },

> **Important**
> * For simplicity the demo uses local data with a dummy order field. This may not be the case in a real-world scenario.
> * The `change` event handler of the Sortable widget updates the **Order** field, which is a sample implementation. The `change` event handler should be modified to fit your real-world scenario.

###### Example

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

 <div id="example">
   <div id="grid"></div>

   <script>

     $(document).ready(function() {

       var textEditor = function (container, options) {
         $('<input data-value-update="input" data-bind="value:' + options.field + '"/>')
           .appendTo(container);
       };

       var numericEditor = function (container, options) {
         $('<input data-role="numerictextbox" data-bind="value:' + options.field + '"/>')
           .appendTo(container);
       };

       // Initialize the product Order field
       for(var j=0; j < products.length; j++){
         products[j].Order = j;
       }

       var grid = $("#grid").kendoGrid({
         dataSource: {
           data: products,
           schema: {
             model: {
               id: "ProductID",
               fields: {
                 ProductName: { type: "string" },
                 UnitPrice: { type: "number" },
                 UnitsInStock: { type: "number" },
                 Discontinued: { type: "boolean" }
               }
             }
           },
           sort: { field: "Order", dir: "asc" }
         },
         scrollable: false,
         pageable: false,
         editable: true,
         edit: function(e) {
           var input = e.container.find("[data-role=numerictextbox]");
           var widget = input.data("kendoNumericTextBox");
           var model = e.model;

           if(widget) {
                widget.bind("spin", function(e) {
                  e.sender.trigger("change");
                });
              }

           input.on("keyup", function(e) {
             if(e.key === kendo.culture().numberFormat["."]) {
                // for Kendo UI NumericTextBox only
               return;
             }
             widget.value(input.val());
             widget.trigger("change");
           });
         },
         toolbar: ["cancel"],
         columns: [
           { field: "Order" },
           { field: "ProductName", editor: textEditor},
           { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px",
            editor: numericEditor},
           { field: "UnitsInStock", title: "Units In Stock", width: "130px",editor: numericEditor },
           { field: "Discontinued", width: "130px" }
         ]
       }).data("kendoGrid");

       grid.table.kendoSortable({
         hint: hintElement,
         cursor: "move",
         placeholder: function(element) {
           return element.clone().addClass("k-state-hover").css("opacity", 0.65);
         },
         container: "#grid tbody",
         filter: ">tbody >tr",
         change: function(e) {
           var grid = $("#grid").data("kendoGrid"),
               oldIndex = e.oldIndex , // The old position
               newIndex = e.newIndex , // The new position
               view = grid.dataSource.view(),
               dataItem = grid.dataSource.getByUid(e.item.data("uid")); // Retrieve the moved dataItem

           dataItem.Order = newIndex; // Update the order
           dataItem.dirty = true;

           // Shift the order of the records
           if (oldIndex < newIndex) {
             for (var i = oldIndex + 1; i <= newIndex; i++) {
               view[i].Order--;
               view[i].dirty = true;
             }
           } else {
             for (var i = oldIndex - 1; i >= newIndex; i--) {
               view[i].Order++;
               view[i].dirty = true;
             }
           }

           grid.dataSource.sync();
         }
       });
     });

     function hintElement(element) { // Customize the hint

       var grid = $("#grid").data("kendoGrid"),
           table = grid.table.clone(), // Clone Grid's table
           wrapperWidth = grid.wrapper.width(), //get Grid's width
           wrapper = $("<div class='k-grid k-widget'></div>").width(wrapperWidth),
           hint;

       table.find("thead").remove(); // Remove Grid's header from the hint
       table.find("tbody").empty(); // Remove the existing rows from the hint
       table.wrap(wrapper); // Wrap the table
       table.append(element.clone().removeAttr("uid")); // Append the dragged element

       hint = table.parent(); // Get the wrapper

       return hint; // Return the hint element
     }
   </script>

   <style>
     .k-grid tbody tr {
       cursor: move;
     }
   </style>
 </div>
```

## See Also

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})

For more runnable examples on the Kendo UI Sortable, browse its [**How To** documentation folder]({% slug howto_usesortablewithgrid_inincellediting_sortable %}).
