---
title: Adding Tooltips to DropDownList Items in a Grid PopUp Editor
description: Learn how to implement tooltips for both the dropdown list and its items using Kendo UI DropDownList in a Grid PopUp Editor for a more informative UI experience.
type: how-to
page_title: How to Implement Tooltips in DropDownList Items in a Grid PopUp Editor - Kendo UI DropDownList
slug: how-to-add-tooltips-to-dropdownlist-items
tags: kendo, ui, dropdownlist, tooltip, jquery, event handling, grid. popup
res_type: kb
ticketid: 1655113
---

## Environment

| Product | Kendo UI DropDownList |
| Product | Kendo UI Grid |
| --- | --- |
| Version | 2024.2.514 |

## Description

When working with the [DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist) in Kendo UI, you might want to add tooltips to enhance the user experience by providing additional information about the dropdown list or its items. This can be particularly useful when the DropDownList is used as a Grid popup editor. Tooltips can be added to the DropDownList itself and to each of its items when opened. This KB article also answers the following questions:
- How to add a tooltip to the DropDownList component?
- How to initialize tooltips for DropDownList items?
- How to use Kendo UI Tooltip with DropDownList items?

## Solution

### Adding a Tooltip to the DropDownList

To add a tooltip to the DropDownList when it is used as a Grid popup editor, handle the [`edit`](/api/javascript/ui/grid/events/edit) event of the Grid. Within the event handler, find the element containing the DropDownList and add a `title` attribute or initialize Kendo Tooltip.

```javascript
edit: function(e){              
    $('[data-container-for="Category"] .k-input-inner').attr('title','My Category DropDownList Tooltip');    
    // Additional event handling logic...
},
```

### Initializing Tooltips for DropDownList Items

To add tooltips to the items when the DropDownList is opened, get a reference to the DropDownList component and bind to its [`open`](/api/javascript/ui/dropdownlist/events/open) event. In the open event handler, find the elements with the class 'k-list-item' and initialize the Tooltip:

```javascript
$('input[name="Category"]').data('kendoDropDownList').bind('open', function(){                
    $('.k-list-content').kendoTooltip({
        filter: '.k-list-item',
        content: function(e) {
            var target = e.target; 
            return target.text() + " Tooltip"; 
        }
    });
});
```

These methods allow you to enhance the DropDownList with tooltips for a more informative user interface.

## Notes

- The `title` attribute provides a simple tooltip, but for more complex or styled tooltips, Kendo UI Tooltip widget is recommended.

Below you will find a runnable example:

```dojo
      <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="example">
      <div id="grid"></div>

      <script>

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            edit: function(e){              
              $('[data-container-for="Category"] .k-input-inner').attr('title','My Catgeory DropDownList Tooltip')              
              
              $('input[name="Category"]').data('kendoDropDownList').bind('open', function(){                
                $('.k-list-content').kendoTooltip({
                  filter: '.k-list-item',
                  content: function(e) {
                    var target = e.target; 
                    return target.text() + " Tooltip"; 
                  }
                });
              })
            },
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName",title:"Product Name" },
              { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
              { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "popup"
          });
        });

        function categoryDropDownEditor(container, options) {
          $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
            autoBind: false,
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
              }
            }
          });
        }

      </script>
 </div>
```

## See Also

- [Kendo UI DropDownList Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
- [Kendo UI Tooltip Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
