---
title: Use Sortable with Grid in Incell Editing Mode
page_title: Use Sortable with Grid in Incell Editing Mode | Kendo UI Sortable
description: "Learn how to use the Kendo UI Sortable widget with a Kendo UI Grid in a incell editable mode."
slug: howto_usesortablewithgrid_inincellediting_sortable
---

# Use Sortable with Grid in Incell Editing Mode

The example below demonstrates how to use the Kendo UI Sortable widget with a Kendo UI Grid in its incell editable mode.

The main milestones of the approach are:

* The standard HTML inputs that are used as editors should have a `data-value-update="input"` attribute. If this attribute is not attached to the HTML element, the Grid will not update its data.

###### Example

       var textEditor = function (container, options) {
         $('<input data-value-update="input" data-bind="value:' + options.field + '"/>')
           .appendTo(container);
       };

* If a Kendo UI widget is used as an editor, its `change` event should be manually triggered at the `edit` event of the Grid widget.

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

         input.on("keyup", function() {
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

           input.on("keyup", function() {
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
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
