---
title: Changing the Expand/Collapse SVG Icon in Kendo UI Grid Hierarchy
description: Learn how to change the expand/collapse SVG icon in a hierarchy grid in Kendo UI Grid 
type: how-to
page_title: How to Customize Expand/Collapse SVG Icons in Kendo UI Grid Hierarchy
slug: customize-expand-collapse-icons-kendo-ui-grid
tags: kendo ui, grid, hierarchy, expand, collapse, css, databound, detailexpand, detailcollapse
res_type: kb
components: ["grid"]
ticketid: 1687918
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>
Grid for Progress® Kendo UI®
</td>
</tr>
<tr>
<td>Version</td>
<td>
2025.2.520
</td>
</tr>
</tbody>
</table>

## Description

I want to change the expand/collapse [SVG icon](/styles-and-layout/sass-themes/svg-icons) in a hierarchy Grid in Kendo UI. The default Kendo UI caret icon needs to be replaced with custom SVG icons, such as `plus-outline` for expand and `minus-outline` for collapse. This requires implementing custom logic in the[`dataBound`](/api/javascript/ui/grid/events/databound), [`detailExpand`](/api/javascript/ui/grid/events/detailexpand), and [`detailCollapse`](/api/javascript/ui/grid/events/detailcollapse) event handlers of the Kendo UI Grid.

This knowledge base article also answers the following questions:
- How to replace default icons in Kendo UI Grid hierarchy?
- How to use custom expand/collapse icons in Kendo UI Grid?
- How to modify Kendo UI Grid hierarchy icons using event handlers?

## Solution

To achieve this, follow these steps:

1. Implement the [`dataBound`](/api/javascript/ui/grid/events/databound), [`detailExpand`](/api/javascript/ui/grid/events/detailexpand), and [`detailCollapse`](/api/javascript/ui/grid/events/detailcollapse) event handlers:

### `dataBound` Event Handler

Customize the hierarchy cells to hide the default icons and replace them with custom icons.

```javascript
dataBound: function() {
    // Iterate over each hierarchy cell in the table body
    this.tbody.find('.k-hierarchy-cell').each(function(_, cell) {
        cell = $(cell); // Convert DOM element to jQuery object

        // Prepend a span element with class 'expand' and an onclick handler to expand the row
        cell.prepend("<span class='expand' onclick='expandRow(this)'></span>");

        // Hide the default Kendo UI caret icon
        cell.find(".k-svg-i-caret-alt-right").hide();
    });

    // Replace the default icon with a custom 'plus-outline' icon for all elements with class 'expand'
    kendo.ui.icon($(".expand"), { icon: 'plus-outline' });
}
```

### `detailExpand` Event Handler

Update the expand button to show a collapse icon when the detail row is expanded.

```javascript
detailExpand: function(e) {
    // Update all 'expand' buttons when a detail row is expanded
    this.tbody.find('.expand').each(function(_, button) {
        button = $(button); // Convert DOM element to jQuery object

        // Change the text to "Collapse"
        button.text("Collapse");

        // Switch class from 'expand' to 'collapse'
        button.removeClass("expand").addClass("collapse");

        // Update the onclick handler to collapse the row
        button.attr("onclick", "collapseRow(this)");
    });

    // Replace the icon with a 'minus-outline' for all elements with class 'collapse'
    kendo.ui.icon($(".collapse"), { icon: 'minus-outline' });
}
```

### `detailCollapse` Event Handler

Revert the collapse button to show an expand icon when the detail row is collapsed.

```javascript
detailCollapse: function(e) {
    // Update all 'collapse' buttons when a detail row is collapsed
    this.tbody.find('.collapse').each(function(_, button) {
        button = $(button); // Convert DOM element to jQuery object

        // Change the text to "Expand"
        button.text("Expand");

        // Switch class from 'collapse' to 'expand'
        button.removeClass("collapse").addClass("expand");

        // Update the onclick handler to expand the row
        button.attr("onclick", "expandRow(this)");
    });

    // Replace the icon with a 'plus-outline' for all elements with class 'expand'
    kendo.ui.icon($(".expand"), { icon: 'plus-outline' });
}
```

2. Integrate these event handlers into your Kendo UI Grid initialization.

For a runnable example, please refer to the next demo.

```dojo
<div id="grid"></div>
    <script>
      $(document).ready(function() {
        var element = $("#grid").kendoGrid({
          dataSource: {
            type: "odata-v4",
            transport: {
              read: "https://demos.telerik.com/service/v2/odata/Products"
            },
            pageSize: 6,
            serverPaging: true,
            serverSorting: true
          },
          height: 600,
          sortable: true,
          pageable: true,
          detailInit: detailInit,
          dataBound: function() {
            this.tbody.find('.k-hierarchy-cell').each(function(_,x){
              x= $(x);
              x.prepend("<span class='expand' onclick='expandRow(this)'></span>");
              x.find(".k-svg-i-caret-alt-right").hide();
            });
            kendo.ui.icon($(".expand"), { icon: 'plus-outline' });
          },
          detailExpand: function(e) {
            this.tbody.find('.expand').each(function(_,x){
              x= $(x);
              x.text("Collapse");
              x.removeClass("expand").addClass("collapse");
              x.attr("onclick","collapsdRow(this)");
            });
            kendo.ui.icon($(".collapse"), { icon: 'minus-outline' });
          },
          detailCollapse: function(e) {
            this.tbody.find('.collapse').each(function(_,x){
              x= $(x);
              x.text("Expand");
              x.removeClass("collapse").addClass("expand");
              x.attr("onclick","expandRow(this)");
            });
            kendo.ui.icon($(".expand"), { icon: 'plus-outline' });
          },
          columns: [
            {
              field: "FirstName",
              title: "First Name",
              width: "110px"
            },
            {
              field: "LastName",
              title: "Last Name",
              width: "110px"
            },
            {
              field: "Country",
              width: "110px"
            },
            {
              field: "City",
              width: "110px"
            },
            {
              field: "Title",
              width: "110px",
            }
          ]
        });
      });

      function expandRow(e) {
        let row = $(e).parent().parent();
        var grid = $("#grid").data("kendoGrid");
		grid.expandRow(row);
      }

      function collapsdRow(e) {
        let row = $(e).parent().parent();
        var grid = $("#grid").data("kendoGrid");
		grid.collapseRow(row);
      }

      function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            type: "odata-v4",
            transport: {
              read: "https://demos.telerik.com/service/v2/odata/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10,
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          scrollable: false,
          sortable: true,
          pageable: true,
          columns: [
            { field: "OrderID", width: "110px" },
            { field: "ShipCountry", title:"Ship Country", width: "110px" },
            { field: "ShipAddress", title:"Ship Address", width: "110px" },
            { field: "ShipName", title: "Ship Name", width: "300px" }
          ]
        });
      }
    </script>
```

## See Also

- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/overview)
- [dataBound Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
- [detailExpand Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailexpand)
- [detailCollapse Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailcollapse)
- [Kendo UI SVG Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/svg-icons)
- [Progress® Design System Kit Iconography](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/)
